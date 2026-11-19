import "./app.css";
import { IntroHero } from "./IntroHero.jsx";
import { RecentlyPlayed } from "./RecentlyPlayed.jsx";

function App() {
  const highlights = [
    {
      title: "creativity",
      entries: [
        {
          title: "baskin day media team '25",
          url: "https://drive.google.com/drive/folders/1UdIr8QdMYz7Fr93AX_N0_bXuKAr-nPYp?usp=drive_link",
          description: "a small archive of things i've made for baskin day ’25–26, including the official icon, sticker designs, social posts, and recap videos.",
        },
        {
          title: "big appletunities",
          url: "https://drive.google.com/drive/folders/1ybhClEU6PntYoKn-KqBeUJSErCefB0WX?usp=drive_link",
          description: "my first real excuse to learn video editing. i made 40+ short-form videos ranging from dancing apples to painfully relatable school reels.",
        },
      ],
    },
    {
      title: "coding",
      entries: [
        {
          title: "matcha rag guide",
          url: "https://github.com/tsunderii/matcha-ordering-rag-guide",
          description: "because matcha menus are weirdly intimidating. i turned menus + other matcha resources into a small rag system where beginners can ask what they should actually order.",
        },
        {
          title: "zenfocus",
          url: "https://zenfocusv4.netlify.app/",
          description: "a pomodoro timer for people who don't really like pomodoro timers. built through tech4good as an experiment in making productivity tools respond more flexibly to how people actually study.",
        },
        {
          title: "indesign csv cleaner",
          url: "https://tsunderii.github.io/address-csv-cleaner/",
          description: "a tiny utility made to solve an annoyingly specific problem: cleaning customer address data before importing it into indesign. preview, clean, export, done. in one place.",
        },
      ],
    },
  ];

  const community = [
    {
      title: "tech4good · genai skillbuilding lead",
      description: "i help run a 10-week generative ai program for cohorts of ~15 students, covering everything from prompting and rag to prototyping and evaluation. lately, i've also been helping rethink the curriculum to make it more project-based, collaborative, and actually fun to learn from.",
    },
    {
      title: "chatgpt student lab",
      description: "worked with students across the u.s. + canada to test ideas, experiment with new chatgpt experiences, and share what students actually want from ai tools. i also hosted a campus event at ucsc and brought student feedback back to the openai team.",
    },
    {
      title: "capcut student ambassador",
      description: "my excuse to talk to strangers on campus. helped with student outreach, tabling, and showing people different ways they could use the product.",
    },
  ];

  const projects = [
    {
      title: "Mediator",
      url: "https://github.com/tsunderii/mediator-jc",
      description:
        "An AI Slack teammate that surfaces disagreements and helps teams align on deadlines and responsibilities.",
      tags: ["AI", "FastAPI", "Slack"],
    },
    {
      title: "TakeMeter",
      url: "https://github.com/tsunderii/takemeter",
      description:
        "An NLP project exploring how AI can classify different types of online discussions.",
      tags: ["Python", "Machine Learning", "NLP"],
    },
    {
      title: "Census Income Classification",
      url: "https://github.com/tsunderii/census-income-classification",
      description:
        "A machine learning capstone comparing a traditional classifier with a neural network to predict income brackets from U.S. Census data.",
      tags: ["Python", "scikit-learn", "Keras"],
    },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#about" className="logo">blueprint dev intro!</a>

        <div className="nav-links">
          <a href="#about">about</a>
          <a href="#projects">projects</a>
          <a href="#contact">contact</a>
        </div>
      </nav>

      <main>
        <IntroHero />

        <div className="profile-grid grid grid-cols-1 min-[641px]:grid-cols-2">
          <section className="section">
            <h2>a little about me</h2>

            <p>
              a lot of my projects and endeavors begin with me trying something
              I know almost nothing about and figuring it out as I go...
            </p>

          </section>

          <section className="section">
            <h2>currently, i'm</h2>
            <ul className="current-work">
              <li>researching what a more adaptive + generative study tool could look like</li>
              <li>working on applied machine learning and ai projects through break through tech</li>
              <li>rebuilding a generative ai curriculum for future tech4good research cohorts</li>
              <li>experimenting with agents, rag systems, product ideas, and whatever else gets stuck in my head</li>
            </ul>
          </section>
        </div>

        <section className="section" id="projects">
          <h2>things i've worked on</h2>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <h3>
                  <a href={project.url}>
                    {project.title} <span className="project-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p>{project.description}</p>

                <div className="tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <RecentlyPlayed />

        <div className="profile-grid work-highlights grid grid-cols-1 min-[641px]:grid-cols-2">
          {highlights.map(({ title, entries }) => (
            <section className="section" key={title}>
              <h2>{title}</h2>
              <div className="portfolio-entries">
                {entries.map((entry) => (
                  <article key={entry.title}>
                    <h3><a href={entry.url}>{entry.title} ↗</a></h3>
                    <p>{entry.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="section community">
          <h2>community</h2>
          <div className="portfolio-entries">
            {community.map((entry) => (
              <article key={entry.title}>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div>
            <h2>let's connect!</h2>

            <p>
              feel free to stalk me on github &amp; linkedin
            </p>
          </div>

          <div className="social-links">
            <a href="https://github.com/tsunderii">github ↗</a>
            <a
              href="https://open.spotify.com/user/ldkqlurdeiqdkjoqa3y2ifeqt?si=f34ada56a1ec4fb5"
              target="_blank"
              rel="noopener noreferrer"
            >
              spotify ↗
            </a>
            <a
              href="https://www.linkedin.com/in/jasminchann/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin ↗
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026</p>
      </footer>
    </div>
  );
}

export default App;
