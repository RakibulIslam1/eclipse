import { adminProfile } from "@/lib/admin-profile";

export default function Home() {
  return (
    <section className="hero">
      <h1>Welcome to Eclipse Academy</h1>
      <p>
        The logo in the navbar leads to this home page. Use the menu to explore
        courses, mentors, our team, and the study room.
      </p>
      <div className="pill-row">
        <span className="pill">Project: Next.js</span>
        <span className="pill">Admin: {adminProfile.email}</span>
        <span className="pill">Role: {adminProfile.role}</span>
      </div>
    </section>
  );
}
