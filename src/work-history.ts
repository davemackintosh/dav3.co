export interface WorkHistoryEntry {
  dates: Date[]
  company: string
  tags: string[]
  description: string
  feedback?: string
}

const workHistory: WorkHistoryEntry[] = [
  {
    dates: [new Date(2017, 10, 1)],
    company: "Freybors",
    tags: ["react", "multicolour", "flowjs", "tachyons", "postgres"],
    description:
      "A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
    feedback:
      "I've worked with Dave for about 5 months at a London startup and loved every minute. He's one of those rare engineers who's not only fast, but also rigorous with TDD, coverage, types and documentation. He writes beautiful code that's easy to understand and a pleasure to work with; this is what you want in a contractor - someone who leaves a positive legacy and not spaghetti. Recommended! ~ Jof Arnold",
  },
  {
    dates: [new Date(2018, 5, 1), new Date(2018, 6, 1)],
    company: "Leviton feat. Ascender",
    tags: ["react", "multicolour", "flowjs", "lua", "nginx"],
    description:
      "A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
  },
  {
    dates: [new Date(2017, 2, 1), new Date(2017, 10, 1)],
    company: "Verve",
    tags: ["Angular 1", "react"],
    description:
      "I was a general purpose developer in this organisation, mostnof my time was spent working on improvements to their payment path and fixing bugs in their existing software before being put on the React team to work on the rebuild of their platform.",
  },
  {
    dates: [new Date(2017, 1, 1), new Date(2017, 2, 1)],
    company: "National Army Museum feat. Squint Opera",
    tags: ["backbone", "multicolour", "svg"],
    description:
      "Squint Opera and I had worked together previouskynandnwe teamed up again to help the National Army Museum build their new exhibit technology with home baked analytics. I built the exhibit map and analytics API and visualised them on a map of the entire building, per exhibit.",
    feedback:
      "Dave is a great developer. Fun and diligent. His work is top notch. ~ Rob Mason",
  },
  {
    dates: [new Date(2016, 10, 1), new Date(2017, 2, 1)],
    company: "Google/Tishman Speyer feat. Hirsch&Mann",
    tags: ["cordova", "multicolour", "realtime", "cco", "odroid", "android"],
    description:
      "Due to the success of our partnership previously Hirsch&Mann engaged me again to help build the technology to power physical displays used by Google for their pop-up store in New York during the Pixel release. This was a real time synchronised visual dance of varying animations across nearly 300 devices in a sphere. Tishman Speyer used the same technology to synchronise 200 screens playing videos to within a few ms of difference. I built this using Multicolour, Sockets, Cordova/CCA and custom made framework for delivering all tue required code from the primary node in the network.",
    feedback:
      "Dave was a great partner for many months on a challenging project. We're an innovation service provider and build technological solutions that have never been done; pushing our imagination, problem-solving, and endurance. In this context, Dave led coding on an entire ecosystem of servers and clients to help us deliver a new product line to top-shelf clients. Dave is a highly skilled team member, and we recommend him without reservation. ~ Alan Reitsch",
  },
  {
    dates: [new Date(2016, 6, 1), new Date(2016, 7, 1)],
    company: "Tour De France/Skoda feat. Hirsch&Mann",
    tags: ["react", "MySQL", "Neo4j"],
    description:
      "A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
    feedback:
      "Dave was an excellent team lead on a truly challenging sprint. Above and beyond his mandate, and surpassing his peers in capability and efficiency, Dave was able to remain focused and productive on his own tasks while helping to guide other team members. Dave was highly responsive to status requests, and was diligent with code check-ins and documentation. His code reads extremely well. In short, you could not do better than to have Dave on your team, and we are grateful to have had him work hard to make our project a success. ~ Alan Reitsch",
  },
]

export default workHistory
