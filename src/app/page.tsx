export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-text-col hero-text-col-with-bg">
        <div className="hero-blob-bg" aria-hidden="true">
          <div className="hero-blob">
            <div className="hero-blob-gloss" />
          </div>
        </div>
        <div className="hero-text-content">
          <h1 className="hero-main-h1">
            <span className="hero-line">Master the Test,</span>
            <span className="hero-line">
              <span className="hero-eclipse-word">Eclipse</span> the Rest
            </span>
          </h1>
          <p className="hero-sub">Your journey to academic excellence starts here.</p>
        </div>
      </div>
      <div className="hero-empty-col" aria-hidden="true" />
    </section>
  );
}
