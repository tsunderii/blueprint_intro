import "./app.css";
import { IntroHero } from "./IntroHero.jsx";
import { RecentlyPlayed } from "./RecentlyPlayed.jsx";

function App() {
  const interests = [
    "Artificial Intelligence",
    "Machine Learning",
    "UI/UX Design",
    "Product Development",
    "Concerts",
    "Manga",
    "Video Editing",
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
              in my free time, i like playing badminton and going to concerts!
              lately, i've been trying to learn how to video edit and cook.
              one day, i want to open a matcha popup from my apartment!
            </p>

          </section>

          <section className="section">
            <h2>things i'm interested in</h2>

            <div className="tags">
              {interests.map((interest) => (
                <span className="tag" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
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

        <section className="section contact" id="contact">
          <div>
            <h2>let's connect!</h2>

            <p>
             please add me and give me clout esp on spotify
            </p>
          </div>

          <div className="social-links">
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
