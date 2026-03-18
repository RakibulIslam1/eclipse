import { adminProfile } from "@/lib/admin-profile";
import ThemePalette from "@/components/ThemePalette";

export default function Home() {
  return (
    <div className="home-flow">
      <section>
        <h1 className="hero-title">Eclipse Academy</h1>
        <p className="hero-copy">
          A dynamic learning space with a simple 3-color identity. The navbar logo
          always returns to this homepage while the sections flow instead of rigid
          card boxes.
        </p>
        <div className="pill-row">
          <span className="pill">Admin: {adminProfile.email}</span>
          <span className="pill">Role: {adminProfile.role}</span>
          <span className="pill">Theme: 3 editable colors</span>
        </div>
      </section>

      <ThemePalette />

      <section className="trans-strip">
        <h2>Demo Sections</h2>
        <div className="flow-grid">
          <article>
            <h3>Live Learning Pulse</h3>
            <p>
              Watch trending lesson topics, active learners, and mentor hours in a
              constantly moving stream.
            </p>
          </article>
          <article>
            <h3>Skill Roadmaps</h3>
            <p>
              Pick a skill path and immediately see milestones, weekly targets, and
              peer groups matched to your level.
            </p>
          </article>
          <article>
            <h3>Community Spotlight</h3>
            <p>
              Dynamic highlights from mentors and top students appear here to keep
              motivation visible every day.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
