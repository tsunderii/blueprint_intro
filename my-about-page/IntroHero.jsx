export function IntroHero() {
  return (
    <section className="hero" id="about" aria-labelledby="intro-title">
      <div className="hero-copy">
        <h1 id="intro-title">
          hi, i'm <strong>jasmin!</strong>{" "}
          <span className="tea-mark" aria-hidden="true" />
        </h1>
        <p className="hero-description">
          i'm a second year computer science + statistics student at
          uc santa cruz on the dev team at blueprint!
        </p>
        <a href="#projects" className="primary-button">
          explore my work ↗
        </a>
      </div>
    </section>
  );
}
