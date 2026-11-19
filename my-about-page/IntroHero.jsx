export function IntroHero() {
  return (
    <section className="hero" id="about" aria-labelledby="intro-title">
      <div className="hero-copy">
        <h1 id="intro-title">
          hi i'm <strong>jasmin!</strong> ˚. ᵎᵎ{" "}
          <span className="tea-mark" aria-hidden="true" />
        </h1>
        <p className="hero-description">
          i'm a sophomore computer science + statistics student at uc santa cruz,
          based in the bay area. i like making things somewhere between ai,
          people, design, and the internet.
        </p>
        <a href="#projects" className="primary-button">
          explore my work ↗
        </a>
      </div>
    </section>
  );
}
