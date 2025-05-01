---
title: Building Robust Serverless Applications with Rust - A Deep Dive into CQRS and Event Streaming
keywords:
  - Rust
  - CQRS
  - Command Query Responsibility Segregation
  - Event Streaming
  - Asynchronous
  - Framework
  - Architecture
  - Domain-Driven Design
  - Persistence
  - Concurrency
excerpt: This post explores a practical CQRS and Event Streaming framework built in Rust, demonstrating how to separate read and write operations for enhanced performance and maintainability.
author: davemackintosh
published: 2025-05-01 14:23:00
---

<script>
	import Heading from "$src/components/Heading.svelte"
</script>

> All the code in this blog post is for a previous version of this framework, it might be missing some bits but I still feel it's good to share knowledge.

Part 2 in my apparent series of posts "Building Robust Applications with Rust"

In my ongoing quest for building scalable, maintainable, and resilient software, certain architectural patterns stand out to me. Command Query Responsibility Segregation (CQRS) and Event Streaming are two such paradigms that, when combined, offer a brilliant approach to tackling the complexities of modern application development and data systems design.

Over the years, I've built several different types of systems using many different types of approach but the most common; my personal favourite, and easiest to understand has to be CQRS backed by an event stream.

The fundamental idea behind CQRS is the separation of an application's command (write) and query (read) responsibilities. This segregation allows for independent optimization and scaling of each side, acknowledging that the performance and consistency requirements for reading data often differ significantly from those for modifying it. Complementing this, Event Streaming advocates for capturing any significant state change within the application as an immutable, chronological sequence of events. This event log serves not only as an audit trail but also as a mechanism for decoupling services and enabling reactive, event-driven architectures.

I got started on my Rust framework to provide the essential building blocks for implementing the "command" and event persistence aspects of a CQRS/Event Streaming system. It acts as the intermediary between my core business logic, embodied in Aggregates, and the underlying storage mechanism for the generated events. Importantly, the framework deliberately abstains from managing the "query" side or orchestrating side effects resulting from events. This design choice promotes a clean architectural boundary, empowering me to implement view updates and other asynchronous operations using separate, purpose-built components.

### Dissecting the Framework's Architecture

Let's delve into the key components:

**1. The `CQRSFramework`:** This struct acts as the central coordinator, bridging the gap between your application's domain logic and its persistent event store. It holds an instance of an `Aggregate`, along with references to implementations of the `ViewRepository` and `EventRepository` traits. The internal `event_store` acts as a temporary holding place for events before they are durably persisted.

The `new` function provides a simple way to instantiate the framework, requiring concrete implementations of the `EventRepository` and `ViewRepository` traits. The `dispatch` and `dispatch_with_metadata` functions serve as the primary means of processing commands within the system. When a command is successfully handled by an Aggregate, the framework takes the resulting events and orchestrates their persistence:

* It iterates through the generated events, allowing the Aggregate's `handle_event` function to process each one, potentially updating the Aggregate's internal state (though this state isn't directly managed by the framework itself).
* For each event, it constructs a `PersistableDomainEvent`, enriching the raw event data with essential metadata such as a unique identifier for the aggregate instance (`aggregate_id`), the type of the aggregate (`aggregate_type`), a sequential identifier for the event within the aggregate's history (`sequence`), the specific type and version of the event, the event's payload, optional metadata associated with the command, and a timestamp of when the event occurred. The `aggregate_type_id` field serves as a composite key, uniquely identifying the aggregate instance within the event stream.
* It leverages the `EventRepository` to commit this collection of `PersistableDomainEvent`s to the underlying event store.

This meticulous process ensures that every state-changing operation triggered by a command is captured as an immutable event and durably stored. The framework's responsibility ends here, focusing solely on the reliable persistence of the event stream.

```rust
pub struct CQRSFramework<'cqrsf, A, V>
where
    A: Aggregate + Default,
    V: View<A> + Default,
{
    pub aggregate: A,
    pub view_repository: &'cqrsf dyn ViewRepository<A, V>,
    pub event_repository: &'cqrsf dyn EventRepository<A>,
    event_store: Vec<PersistableDomainEvent>,
}

impl<'cqrs, A, V> CQRSFramework<'cqrs, A, V>
where
    A: Aggregate + Default,
    V: View<A> + Default,
{
    pub fn new(
        event_repository: &'cqrs dyn EventRepository<A>,
        view_repository: &'cqrs dyn ViewRepository<A, V>,
    ) -> Self {
        CQRSFramework::<A, V> {
            aggregate: A::default(),
            view_repository,
            event_repository,
            event_store: vec![],
        }
    }

    pub async fn dispatch_with_metadata<T: DeserializeOwned + Serialize>(
        &mut self,
        aggregate_id: Uuid,
        command: A::Commands,
        metadata: &T,
    ) -> Result<Vec<A::Events>, A::Errors> {
        match self.aggregate.handle_command(command).await {
            Ok(events) => {
                let mut state = A::State::default();
                let sequence_start = self
                    .event_repository
                    .event_sequence(&aggregate_id)
                    .await
                    .unwrap_or(0_i64);
                let mut next_sequence = sequence_start;

                for event in &events {
                    self.aggregate
                        .handle_event(event.clone(), &mut state, metadata);

                    self.event_store.push(PersistableDomainEvent {
                        aggregate_type_id: format!("{}:{}", A::NAME, aggregate_id),
                        aggregate_id,
                        aggregate_type: A::NAME.to_string(),
                        sequence: next_sequence,
                        event_type: event.persisted_event_name(),
                        event_version: event.persisted_event_version(),
                        payload: serde_json::to_value(event).unwrap(),
                        metadata: serde_json::to_value(metadata).unwrap(),
                        timestamp: chrono::Utc::now(),
                    });

                    next_sequence += 1;
                }

                match self
                    .event_repository
                    .commit_events(self.event_store.to_vec())
                    .await
                {
                    Ok(_) => Ok(events),
                    Err(e) => Err(A::Errors::from(CQRSError::PersistenceError(e.to_string()))),
                }
            }
            Err(e) => Err(e),
        }
    }

    pub async fn dispatch(
        &mut self,
        aggregate_id: Uuid,
        command: A::Commands,
    ) -> Result<Vec<A::Events>, A::Errors> {
        self.dispatch_with_metadata(aggregate_id, command, &())
            .await
    }
}
```


**2. The `Aggregate` Trait:** This pivotal trait defines the contract for your domain entities. An Aggregate is an entity that encapsulates state and behavior, and it is the primary unit of consistency within a domain. The `Aggregate` trait mandates the following associated types and functions:

* `NAME`: A static string representing the unique identifier for this type of Aggregate. This is crucial for identifying events belonging to specific aggregate types within the event store.
* `Events`: An associated type representing the domain events that this Aggregate can generate. These events must implement the `DomainEvent` trait, be debuggable, serializable, deserializable, cloneable, and thread-safe.
* `Commands`: An associated type representing the commands that can be processed by this Aggregate.
* `Errors`: An associated type for custom error types that can occur during command handling. These errors must implement the standard `Error` trait and be convertible from the framework's `CQRSError`.
* `State`: An associated type representing the internal state of the Aggregate. This state must be serializable, deserializable, and have a default value. While the framework doesn't directly manage the Aggregate's state persistence, it is used within the `handle_event` function.
* `handle_command`: An asynchronous function that takes a command as input and returns a `Result` containing a vector of events that were triggered by the command or an error. This function embodies the business logic of the Aggregate.
* `handle_event`: A function that takes an event, the current state of the Aggregate, and optional metadata as input. This function is responsible for applying the event to the Aggregate's state. Note that the framework passes a mutable reference to the state, allowing the Aggregate to evolve its internal representation in response to events.

The `Aggregate` trait serves as the heart of your domain model within this CQRS framework. It dictates how commands are processed and how state evolves in response to events, while leaving the persistence of these events to the framework.

```rust
#[async_trait]
pub trait Aggregate {
    // What is the name of the aggregate.
    const NAME: &'static str;

    // Associated types for the aggregate.
    type Events: 'static + Debug + DomainEvent + Serialize + DeserializeOwned + Clone + Send + Sync;
    type Commands: 'static + Debug;
    type Errors: Error + From<CQRSError>;

    type State: Serialize + DeserializeOwned + Default;

    // Handling commands for the aggregate returns a list of events
    // which are persisted to the database and are passed through the
    // handle event function and then passed through the sagas event function.
    async fn handle_command(
        &self,
        command: Self::Commands,
    ) -> Result<Vec<Self::Events>, Self::Errors>;

    // Handling events for the aggregate returns no value.
    // Mutate the self and the CQRS framework will update and persist the view.
    fn handle_event<T: Serialize + DeserializeOwned>(
        &mut self,
        event: Self::Events,
        state: &mut Self::State,
        metadata: &T,
    );
}
```


**3. The `DomainEvent` Trait:** This trait defines the requirements for any type that represents a domain event within the system. It mandates the implementation of `From<PersistableDomainEvent>`, allowing for the conversion of persisted event representations back into their domain-specific types. Additionally, it requires the implementation of two functions:

* `persisted_event_name`: Returns a string representing the name of the event as it should be stored in the event store. This provides a stable identifier for event types during persistence.
* `persisted_event_version`: Returns a string representing the version of the event schema. This is crucial for handling event migrations and ensuring compatibility as the system evolves over time.

By enforcing these methods, the `DomainEvent` trait ensures that all domain events have a consistent representation for persistence and retrieval.

```rust
pub trait DomainEvent: From<PersistableDomainEvent> {
    // When persisting events for an aggregate, what is the name of this event.
    fn persisted_event_name(&self) -> String;

    // When persisting events for an aggregate, what is the version of this event.
    fn persisted_event_version(&self) -> String;
}
```


**4. The `View` Trait:** This trait defines the contract for creating read-optimized views of your application's data. Views are projections of the event stream, tailored to specific query requirements. The `View` trait requires the following:

* `TABLE_NAME`: A static string representing the name of the storage mechanism (e.g., a database table) for this view.
* `VERSION`: A static `u64` representing the version of this view schema. This is essential for managing view migrations and supporting multiple versions of the same view over time.
* `handle_event`: An asynchronous function that takes a domain event as input and updates the view accordingly. This function embodies the logic for projecting events into the read model.

It's crucial to note that the framework itself does not invoke the `handle_event` method of the `View`. This responsibility lies with external components that consume the event stream and update the views. The `ViewRepository` trait, discussed next, provides an abstraction for interacting with these read models.

```rust
#[async_trait]
pub trait View<A: Aggregate + Default> {
    const TABLE_NAME: &'static str;
    // What version of the view is this? This is useful for migrations and handling multiple views of the same data over time.
    const VERSION: u64;

    async fn handle_event(&mut self, event: A::Events) -> Result<(), A::Errors>;
}
```


**5. The `EventRepository` Trait:** This trait defines the contract for persisting and retrieving domain events. Implementations of this trait are responsible for the actual interaction with the event store (e.g., a database, an event log). It mandates the following asynchronous functions:

* `commit_events`: Takes a vector of `PersistableDomainEvent`s and persists them to the event store.
* `event_sequence`: Takes an aggregate ID and returns the current sequence number of the last event for that aggregate. This is used to ensure that new events are appended in the correct order.

The `EventRepository` provides an abstraction over the underlying event storage mechanism, allowing the framework to remain independent of the specific database or event log being used.

```rust
#[async_trait]
pub trait EventRepository<A: Aggregate> {
    async fn commit_events(&self, events: Vec<PersistableDomainEvent>) -> Result<(), CQRSError>;
    async fn event_sequence(&self, aggregate_id: &Uuid) -> Result<i64, A::Errors>;
}
```


**6. The `ViewRepository` Trait:** This trait defines the contract for interacting with the read-optimized views. Implementations of this trait handle the storage and retrieval of these views. It mandates the following asynchronous functions:

* `handle_event`: Takes a domain event and updates the corresponding view. Again, the framework itself doesn't call this; it's the responsibility of a separate event consumer.
* `commit`: Persists any changes made to the view. This might be relevant depending on the underlying view storage mechanism.
* `load`: Takes an aggregate ID (or some other relevant identifier) and attempts to load the corresponding view.

Similar to the `EventRepository`, the `ViewRepository` provides an abstraction over the read model storage, allowing for flexibility in how views are implemented and stored.

```
#[async_trait]
pub trait ViewRepository<A: Aggregate + Default, V: View<A> + Default> {
    async fn handle_event(&mut self, event: A::Events) -> Result<(), A::Errors>;
    async fn commit(&self) -> Result<(), A::Errors>;
    async fn load(&self, aggregate_id: &str) -> Result<Option<V>, A::Errors>;
}
```


**7. The `Query` Trait:** This trait defines the contract for querying the read-optimized views. It provides a single asynchronous function:

* `query`: Takes an aggregate ID and a reference to a `ViewRepository` and attempts to retrieve the corresponding view.

This trait encapsulates the logic for retrieving read-optimized data, further separating the read and write concerns of the application.

```rust
#[async_trait]
pub trait Query<
    VR: ViewRepository<A, V> + Send + Sync,
    V: View<A> + Default + Clone,
    A: Aggregate + Default + Clone,
>: Send + Sync
{
    async fn query(aggregate_id: &Uuid, view_repo: &VR) -> Result<Option<V>, CQRSError>;
}
```


### Benefits and Considerations

* **Clear Separation of Concerns:** The framework enforces a distinct separation between command handling, event persistence, and view management, leading to a more organized and maintainable codebase.
* **Asynchronous Operations:** The extensive use of `async` and `await` promotes non-blocking I/O, crucial for building performant and responsive applications.
* **Extensibility:** The use of traits for `EventRepository` and `ViewRepository` allows developers to easily integrate with various data storage technologies.
* **Testability:** The well-defined boundaries and the ability to mock repository implementations (as demonstrated in the tests) enhance the testability of the application's core logic.

This Rust framework provides a solid foundation for my latest project and any project I choose to do in the future and hopefully it helps yours to

However, it's important to consider the following:

* **Complexity:** While CQRS and Event Streaming offer significant benefits, they can introduce additional complexity compared to traditional CRUD-based architectures. A trade off I'm happy with personally.
* **Eventual Consistency:** The separation of read and write models often leads to eventual consistency, where there might be a delay between a command being processed and the changes being reflected in the read views. Developers need to design their systems to handle this.
* **Infrastructure:** Implementing a full CQRS/Event Streaming system requires careful consideration of the event store, message brokers (if used for distributing events), and view update mechanisms. My project makes extensive use of the AWS services SQS, DynamoDB streaming and SNS topics.

### Getting Started

To leverage this framework, you would typically:

1.  **Define your Aggregates:** Implement the `Aggregate` trait for each core entity in your domain, defining its commands, events, state, and the logic for handling them.
2.  **Define your Events:** Implement the `DomainEvent` trait for all events that your Aggregates can generate, ensuring they can be serialized, deserialized, and provide their name and version.
3.  **Define your Views:** Implement the `View` trait for each read-optimized projection of your data, specifying how they are updated in response to events.
4.  **Implement `EventRepository`:** Create a concrete implementation of the `EventRepository` trait to interact with your chosen event store (e.g., a PostgreSQL database using a library like `sqlx`, or a dedicated event store like EventStoreDB).
5.  **Implement `ViewRepository`:** Create a concrete implementation of the `ViewRepository` trait to manage the storage and retrieval of your read views. This might involve interacting with a different database optimized for querying.
6.  **Integrate with an Event Stream:** Implement a mechanism to consume the persisted events (e.g., using database triggers, stream processing libraries, or message queues) and update your read views by calling the `handle_event` methods of your `ViewRepository` implementations.
7.  **Use the `CQRSFramework`:** Instantiate the `CQRSFramework` with your Aggregate and the concrete repository implementations to handle command dispatch and event persistence.
8.  **Implement Queries:** Use the `Query` trait and your `ViewRepository` to retrieve data from your read views.

