---
title: Building Robust Applications with Rust: Powering Serverless Lambdas with Clean Architecture and Flexible Middleware in Rust.
keywords: 
  - Hexagonal Architecture
  - Ports and Adapters
  - Serverless
  - Lambda
  - Rust
  - Middleware
  - Type-Level Programming
  - Dependency Injection
  - Clean Architecture
  - Adaptability
excerpt: This post explores our approach to building robust serverless Lambdas in Rust using Hexagonal Architecture and a custom, type-safe middleware pattern. By separating core logic from external concerns and leveraging Rust's powerful type system for dependency injection via TupleOfAdapters, we achieve cleaner code, enhanced testability, and greater adaptability to evolving requirements in our serverless platform.
author: davemackintosh
published: Tue April 29 2025 08:55:00 GMT+0000
---

<script>
	import Heading from "$src/components/Heading.svelte"
</script>

Alright, fellow Rustaceans! Let's chat about how we're building our serverless Lambdas. I've landed on a combo that keeps things super clean and makes our lives way easier down the line: Hexagonal Architecture mixed with our own spin on middleware, all powered by the awesome-ness of Rust.

### Embracing the Clarity of Hexagonal Architecture

At the core of our design lies Hexagonal Architecture (also known as Ports and Adapters). This architectural style champions the separation of our core business logic from the volatile external world. By establishing clear boundaries, we gain significant advantages:

* **Isolated Business Logic:** Our domain entities, use cases, and core logic reside within the "Hexagon," blissfully unaware of the specific databases, APIs, or delivery mechanisms we might employ. This isolation makes our business rules easier to understand, test, and evolve independently.
* **Technology Agnosticism:** The Core interacts with the outside world solely through **Ports** – abstract interfaces that define *what* needs to happen, not *how*. This decoupling allows us to swap out underlying technologies (e.g., switching databases from PostgreSQL to DynamoDB) by simply implementing new **Adapters** without touching the Core.
* **Enhanced Testability:** With the Core isolated, we can rigorously test our business logic in complete isolation using mock implementations of our Ports. This leads to more reliable and confident deployments.
* **Actionable Security:** As I'm building a service in the financial industry, it is top of my mind to mitigate any form of future security issues in my code and given most of the middleware I've written so far handles work in multiple threads this is even more important. Having Adapters and middleware that handle specific forms of security and verification, I achieve an architecture that allows me to quickly see, manage and mitigate security features.

### Building Flexible and Type-Safe Middleware

To handle cross-cutting concerns within our Driving Adapters (the entry points for external interactions, such as Lambda handlers or API controllers), we've implemented a custom middleware pattern, leveraging Rust's type system for increased safety and clarity.

Our middleware framework allows us to intercept and process requests at various stages:

* **`BEFORE`:** Executes before the main handler logic. Common uses include authentication, request validation, and input transformation.
* **`NORMAL`:** The core handler logic, typically involving calls to Core Input Ports.
* **`AFTER`:** Executes after the Core has processed the request. Used for response transformation, logging, and error handling.
* **`BEFOREEACH` / `AFTEREACH`:** Provide finer-grained control, executing around each individual operation within a handler.

This pattern provides a structured way to manage concerns that are specific to the external world, without cluttering the Core or the Adapters themselves.

Boiling it down, a `Middleware` is just a struct that implements the `Middleware` trait with a few functions on it specific to it's existence in any "chain". Here's the trait that enables all this flexibility.

```rust
// A Middleware is a function that takes the In and Out generics and operates on them returning
// the modified state of Out passed in the middleware chain constructor. The lifetime of
#[async_trait]
pub trait Middleware<
    In: Debug + DeserializeOwned,
    Out: Default + Debug + Serialize,
    E: Debug + Into<lambda_runtime::Diagnostic>,
>: Send + Sync
{
    // Specify at which stages the middleware should run. You could in theory specify all
    // the stages to mutate the result multiple times. To return multiple stages, specify
    // the bitwise OR of the stages you want to run.
    // @example ```
    // fn run_at() -> MiddlewareStages {
    //     MiddlewareStages::BEFORE | MiddlewareStages::NORMAL
    // }
    // ```
    fn run_at(&self) -> MiddlewareStages {
        MiddlewareStages::NORMAL
    }

    // The middleware function takes the In and Out generics and operates on them returning
    // the modified state of Out passed in the middleware chain constructor. The lifetime of
    // In and Out is the lifetime of the middleware chain constructor.
    async fn run(
        &self,
        invocation: &mut MiddlewareChain<In, Out, E>,
        input: &In,
        ctx: &Context,
    ) -> Result<Arc<Out>, E>;

    // During the creation of a middleware chain, the developer may specify a number of available
    // adapters for this execution unit. Once the orchestrator has created the default implementation
    // of these ports and adapters, it will "ask" the middleware sequentially whether it accepts this
    // adapter.
    fn accepts_adapter<Adapter: ports_adapters::Adapter>(adapter: &Adapter);
}
```

I tried a few different variations of this, including an associated type for Ports to make this actual dependency injection a purely build time feature but this over-complicated the orchestrator's implementation as not all middleware have the same or even a default set of ports so I landed on an "accept pattern" for the dependencies. A middleware is responsible for the storage of these adapter references during it's lifetime.

### Leveraging Rust's Type System for build-time Dependency Injection

A key aspect of our middleware implementation is its tight integration with a type-safe dependency injection (DI) mechanism. We use Rust's powerful type system to declare and inject the necessary Adapters into our middleware components.

The `TupleOfAdapters` trait, defined in our `hex` crate, plays a central role, it gives me the ability to make a simple call with only types and lets the compiler do the heavy lifting.

```rust
// src/hex/src/lib.rs
pub trait TupleOfAdapters {
    fn defaults(collector: &mut Vec<Box<dyn Adapter>>);
}

impl TupleOfAdapters for () {
    fn defaults(_collector: &mut Vec<Box<dyn Adapter>>) {}
}

impl<Head: Adapter, Tail: TupleOfAdapters> TupleOfAdapters for (Head, Tail)
where
    Head: Default + 'static,
    Tail: TupleOfAdapters,
{
    fn defaults(collector: &mut Vec<Box<dyn Adapter>>) {
        collector.push(Box::new(Head::default()));
        Tail::defaults(collector);
    }
}

// A macro to generate implementations for tuples of various lengths.
macro_rules! impl_tuple_of_adapters {
    ($head:ident $(, $tail:ident)*) => {
        impl<$head, $($tail,)*> TupleOfAdapters for ($head, $($tail,)*)
        where
            $head: Adapter + Default + 'static,
            $($tail: Adapter + Default + 'static,)*
        {
            fn defaults(collector: &mut Vec<Box<dyn Adapter>>) {
                collector.push(Box::new($head::default()));
                $(
                    collector.push(Box::new($tail::default()));
                )*
            }
        }

        impl_tuple_of_adapters!($($tail),*);
    };

    () => {};
}

impl_tuple_of_adapters!(A0, A1, A2, A3, A4, A5, A6, A7, A8, A9);
```

There was several iterations on this implementation, I tried a few "clever" ways to achieve this using only the type system but the closest I could get was a recursive tuple structure so I hit the drawing board and realised I could meta-program the implementation of the `TupleOfAdapters`. I've limited the number of registerable adapters (in a single call) to 10 but you can call the `.adapters::<>()` function multiple times to add more which helps me manage the binary size. Without the macro, the syntax for this kind of right-recursive type would have to be `.adapters::<(Adapter1, (Adapter2, (Adapter3, ())>()` which I just couldn't grok.

### Building Adaptable Interactions with Custom Middleware

Now, when our app talks to the outside world (through those Driving Adapters that handle incoming requests), things can get a bit messy. Authentication? Logging? Making sure the data coming in is actually valid? I needed a way to handle all that without cluttering our core logic or our adapters.

Enter our custom middleware framework. Think of it as a series of interceptors that can do stuff before our main code runs and after it's done. We've got these cool `MiddlewareStages` – like `BEFORE` (do this first!), `NORMAL` (the main gig), and `AFTER` (one last touch!). Plus, we've got `BEFOREEACH` and `AFTEREACH` for even finer control.

So, when a request hits our Lambda:

1.  `BEFORE` middleware might check if you're logged in.
2.  `NORMAL` middleware does the actual work – maybe calling our core logic to create a user.
3.  `AFTER` middleware might format the response nicely.

The neat part? These middleware bits are pretty generic. They don't care *too* much about the specific request or the core logic. They just do their thing on the way in and the way out.

### Plugging Things In the Rust Way: Type-Level Magic

Here's where Rust's type system lets us be super clever. Our middleware often needs to talk to those Driven Adapters – like a logger or a config reader. We use this `TupleOfAdapters` thing to declare exactly which adapters a particular Driving Adapter (and its associated middleware) needs.

Then, using some Rust wizardry (including a handy macro we cooked up!), we can make sure those adapters get plugged in automatically. It's all done at compile time, so we catch any missing pieces before our code even runs. This keeps things type-safe and avoids a whole bunch of runtime headaches.

With this approach we achieve a build-time dependency injection, when we call `.adapters::<()>()` in our chain, this runs a bunch of code that creates the default implementation of each of those Adapters and then queries each middleware with an `accept_adapter::<Adapter: ports_adapters::Adapter>(adapter: Adapter)` function so the middleware is configured with it's necessary dependencies at build time.

### The Synergy: Hexagonal Architecture and Flexible Middleware

The combination of Hexagonal Architecture and our custom middleware pattern provides a powerful and elegant solution for building serverless Lambdas in Rust:

* **Clean Code:** Our core logic stays focused on what it does best.
* **Easy Swaps:** Changing out external stuff (like databases or APIs) is way less scary.
* **Super Testable:** We can test our core and our external interactions in isolation.
* **Reusable Goodies:** Our middleware components can be used in lots of different places.

Ultimately, this approach helps me build serverless apps that are not just fast and safe, but also really easy to work with, maintain, and adapt as things change. And that, my friends, makes me a much happier developer in the long run. If you're wrestling with complex serverless apps, give this kind of thinking a shot – it might just make your life a whole lot easier too!
