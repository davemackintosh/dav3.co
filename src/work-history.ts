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
      "A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
  },
  {
    dates: [new Date(2017, 1, 1), new Date(2017, 2, 1)],
    company: "National Army Museum feat. Squint Opera",
    tags: ["backbone", "svg"],
    description:
      "A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
    feedback:
      "Dave is a great developer. Fun and diligent. His work is top notch. ~ Rob Mason",
  },
  {
    dates: [new Date(2016, 10, 1), new Date(2017, 2, 1)],
    company: "Google/Tishman Speyer feat. Hirsch&Mann",
    tags: ["cordova", "multicolour", "realtime", "cco", "odroid", "android"],
    description:
      "A React and NodeJS developer rebuilding an existing product from architecture, development practices, scrum mentoring, team support and mentoring to building an incredibly complex, cofiguration based system where half of the interface is generated entirely from Multicolour models.",
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
