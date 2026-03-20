import { adminProfile } from "@/lib/admin-profile";

export default function Home() {
  return (
    <div className="home-flow">
      <section>
        <h1 className="hero-title">Eclipse Learners</h1>
        <p className="hero-copy">
          A teal-led learning platform for students and mentors with guided study
          rooms, in-house meetings, AI assistance, workflow automation, and a
          collaborative editor experience.
        </p>
        <div className="pill-row">
          <span className="pill">Admin: {adminProfile.email}</span>
          <span className="pill">Role: {adminProfile.role}</span>
          <span className="pill">Backend: Supabase-ready</span>
        </div>
      </section>

      <section className="trans-strip">
        <h2>Platform Flow</h2>
        <div className="flow-grid">
          <article>
            <h3>Mentor Matching</h3>
            <p>
              Match learners with mentors, track availability, and manage session
              readiness from a shared realtime backend.
            </p>
          </article>
          <article>
            <h3>Automation Workspace</h3>
            <p>
              Connect onboarding, reminders, progress checkpoints, and admin flows
              with a single data layer that is ready for product automation.
            </p>
          </article>
          <article>
            <h3>Creator Tools</h3>
            <p>
              Support live collaboration, in-house calls, AI support, and visual
              template editing with a product structure built to scale.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
