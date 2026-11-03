
import { useEffect, useState } from "react";
import "./App.css";

const initialEvents = [
  { id: 1, name: "Navrang Nights", type: "Dance", date: "20 Nov 2026", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700", description: "Garba Celebration" },
  { id: 2, name: "Battle of Bands", type: "Music", date: "28 Nov 2026", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700", description: "Inter-Department Music Fest" },
  { id: 3, name: "Canvas Unplugged", type: "Art", date: "05 Dec 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700", description: "Art & Design Showcase" },
];

const initialStudents = [
  { name: "Riya Kulkarni", points: 3820, initials: "RK", color: "#ad7770" },
  { name: "Aditya Patil", points: 3540, initials: "AP", color: "#647c91" },
  { name: "Megha Desai", points: 3210, initials: "MD", color: "#947caa" },
  { name: "Prathamesh Anvekar", points: 2980, initials: "PA", color: "#a18b70" },
  { name: "Varun Joshi", points: 2760, initials: "VJ", color: "#698c79" },
];

const initialShowcase = [
  { id: 1, title: "Live Music Performance", category: "Music", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700" },
  { id: 2, title: "Photography Collection", category: "Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700" },
  { id: 3, title: "Digital Artwork", category: "Art", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=700" },
  { id: 4, title: "Dance Performance", category: "Dance", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700" },
  { id: 5, title: "Creative Engineering", category: "Projects", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700" },
];

const menu = [
  ["⌂", "Home"],
  ["♙", "My Profile"],
  ["▧", "Showcase"],
  ["▦", "Events"],
  ["♜", "Leaderboard"],
  ["♧", "Communities"],
];

function Registration({ onComplete }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    bio: "",
    interests: [],
    photo: "",
  });

  const interests = [
    "Dance", "Music", "Photography", "Art",
    "Sports", "Theatre", "Event Management",
    "Technology", "Writing", "Fashion"
  ];

  const [error, setError] = useState("");

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleInterest(item) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter(x => x !== item)
        : [...prev.interests, item]
    }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile image must be below 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result);
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() ||
        !form.branch || !form.year) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.interests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }

    onComplete({
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      points: 0,
      events: 0,
    });
  }

  return (
    <div className="registration-page">
      <div className="registration-brand">
        <div className="registration-logo">SVM</div>
        <div>
          <strong>Sangeeta Vrinda Madhyam</strong>
          <span>THE CAMPUS CULTURAL ECOSYSTEM</span>
        </div>
      </div>

      <div className="registration-layout">
        <div className="registration-intro">
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h1>Your talent deserves<br />a <span>stage.</span></h1>
          <p>
            Discover your interests, showcase your creativity,
            connect with talented students and make your mark
            on campus.
          </p>

          <div className="registration-benefits">
            <div><span>✦</span> Showcase your talent and creative work</div>
            <div><span>♛</span> Earn recognition and achievement points</div>
            <div><span>♧</span> Connect with campus communities</div>
          </div>
        </div>

        <form className="registration-form" onSubmit={submit}>
          <div className="form-heading">
            <span className="eyebrow">JOIN THE COMMUNITY</span>
            <h2>Create your profile</h2>
            <p>Tell us a little about yourself.</p>
          </div>

          <div className="photo-upload">
            <label className="photo-preview">
              {form.photo
                ? <img src={form.photo} alt="Profile preview" />
                : <span>+</span>}
              <input type="file" accept="image/*" hidden onChange={handlePhoto} />
            </label>
            <div>
              <strong>Profile photograph</strong>
              <p>Upload a picture (optional, max 2 MB)</p>
            </div>
          </div>

          <label>Full name *</label>
          <input
            value={form.name}
            onChange={e => update("name", e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label>College email *</label>
          <input
            type="email"
            value={form.email}
            onChange={e => update("email", e.target.value)}
            placeholder="you@college.edu"
            required
          />

          <div className="form-row">
            <div>
              <label>Department *</label>
              <select required value={form.branch}
                onChange={e => update("branch", e.target.value)}>
                <option value="">Select department</option>
                <option>Mechanical Engineering</option>
                <option>Computer Science</option>
                <option>Information Science</option>
                <option>Electronics and Communication</option>
                <option>Civil Engineering</option>
                <option>Electrical Engineering</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Current year *</label>
              <select required value={form.year}
                onChange={e => update("year", e.target.value)}>
                <option value="">Select year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          <label>About yourself</label>
          <textarea
            value={form.bio}
            onChange={e => update("bio", e.target.value)}
            placeholder="Tell us about your passions, talents and interests..."
            rows="3"
          />

          <label>What are you interested in? *</label>
          <p className="interest-description">Select all that apply.</p>

          <div className="interest-options">
            {interests.map(item => (
              <button
                type="button"
                key={item}
                className={form.interests.includes(item) ? "interest-selected" : ""}
                onClick={() => toggleInterest(item)}
              >
                {form.interests.includes(item) ? "✓ " : "+ "}
                {item}
              </button>
            ))}
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="create-account-button" type="submit">
            Create My SVM Profile →
          </button>

          <p className="form-terms">
            By creating a profile, you agree to participate
            respectfully in the SVM community.
          </p>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("Home");
  const [registered, setRegistered] = useState(
  localStorage.getItem("svm-registered") === "true"
);
  const [student, setStudent] = useState({
    name: "Prathamesh Anvekar",
    branch: "Mechanical Engineering",
    year: "7th Semester",
    bio: "Creative mind. Mechanical engineer. Passionate about dance, technology and event management.",
    interests: ["Dance", "Event Management", "Photography"],
    points: 1240,
    events: 8,
  });

  const [students, setStudents] = useState(initialStudents);
  const [showcase, setShowcase] = useState(initialShowcase);
  const [events, setEvents] = useState(initialEvents);
  const [joined, setJoined] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("svm-student");
    if (saved) setStudent(JSON.parse(saved));

    const savedWork = localStorage.getItem("svm-showcase");
    if (savedWork) setShowcase(JSON.parse(savedWork));

    const savedStudents = localStorage.getItem("svm-leaderboard");
    if (savedStudents) setStudents(JSON.parse(savedStudents));

    const savedJoined = localStorage.getItem("svm-joined");
    if (savedJoined) setJoined(JSON.parse(savedJoined));
  }, []);

  useEffect(() => {
    localStorage.setItem("svm-student", JSON.stringify(student));
    localStorage.setItem("svm-showcase", JSON.stringify(showcase));
    localStorage.setItem("svm-leaderboard", JSON.stringify(students));
    localStorage.setItem("svm-joined", JSON.stringify(joined));
  }, [student, showcase, students, joined]);

  function earnPoints(amount, reason) {
    setStudent(prev => ({ ...prev, points: prev.points + amount }));

    setStudents(prev => {
      const updated = prev.map(s =>
        s.name === student.name
          ? { ...s, points: s.points + amount }
          : s
      );

      if (!updated.some(s => s.name === student.name)) {
        updated.push({
          name: student.name,
          points: student.points + amount,
          initials: student.name.split(" ").map(n => n[0]).join("").slice(0, 2),
          color: "#a12b31",
        });
      }
      return updated;
    });

    setNotice(`+${amount} points earned: ${reason}`);
    setTimeout(() => setNotice(""), 3000);
  }

  function uploadWork(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setNotice("Please select an image or video.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setNotice("File size must be below 10 MB.");
      return;
    }

    const url = URL.createObjectURL(file);

    setShowcase(prev => [
      { id: Date.now(), title: file.name, category: "My Work", image: url },
      ...prev,
    ]);

    earnPoints(50, "Showcase contribution");
    e.target.value = "";
  }

  function joinEvent(event) {
    if (joined.includes(event.id)) {
      setNotice("You have already registered for this event.");
      return;
    }

    setJoined(prev => [...prev, event.id]);
    setStudent(prev => ({ ...prev, events: prev.events + 1 }));
    earnPoints(100, `Registered for ${event.name}`);
  }

  const sortedStudents = [...students].sort((a, b) => b.points - a.points);
  const myRank = sortedStudents.findIndex(s => s.name === student.name) + 1;
  function completeRegistration(profile) {
  setStudent(profile);
  localStorage.setItem("svm-student", JSON.stringify(profile));
  localStorage.setItem("svm-registered", "true");

  setStudents(prev => [
    ...prev.filter(s => s.name !== profile.name),
    {
      name: profile.name,
      points: 0,
      initials: profile.name.split(" ").map(n => n[0]).join("").slice(0, 2),
      color: "#a12b31",
    }
  ]);

  setRegistered(true);
  setPage("Home");
}

  function Avatar({ name, color, size = "normal" }) {
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
    return (
      <div className={`avatar ${size}`} style={{ background: color || "#8b343a" }}>
        {initials}
      </div>
    );
  }

  function Header() {
    return (
      <header className="topbar">
        <div className="search">
          <span>⌕</span>
          <input placeholder="Search events, artists, projects..." />
        </div>
        <div className="top-user">
          <button className="notification" onClick={() => setNotice("You're all caught up!")}>♧</button>
          <Avatar name={student.name} />
          <span className="user-name">{student.name}</span>
        </div>
      </header>
    );
  }

  function Sidebar() {
    return (
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">SVM</div>
          <div className="logo-name">Sangeeta<br />Vrinda<br />Madhyam</div>
        </div>

        <nav className="navigation">
          {menu.map(([icon, label]) => (
            <button
              key={label}
              className={`nav-link ${page === label ? "selected" : ""}`}
              onClick={() => setPage(label)}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-mark">SVM</div>
          <h3>SVM</h3>
          <p>The Cultural Ecosystem<br />of Our Campus</p>
        </div>
      </aside>
    );
  }

  function Leaderboard({ full = false }) {
    return (
      <section className={`panel leaderboard ${full ? "full-panel" : ""}`}>
        <div className="panel-heading">
          <h2>Leaderboard</h2>
          {!full && <button onClick={() => setPage("Leaderboard")}>View Full →</button>}
        </div>

        {sortedStudents.map((s, i) => (
          <div className="leader-row" key={s.name}>
            <span className={`rank rank-${i + 1}`}>{i < 3 ? ["♛", "♜", "♜"][i] : i + 1}</span>
            <Avatar name={s.name} color={s.color} />
            <div className="leader-name">
              <strong>{s.name}</strong>
              {s.name === student.name && <small>YOU</small>}
            </div>
            <strong className="leader-points">{s.points.toLocaleString("en-IN")} pts</strong>
          </div>
        ))}
        {full && <p className="muted">Rankings are based on accumulated verified participation points.</p>}
      </section>
    );
  }

  function Showcase({ compact = false }) {
    return (
      <section className="showcase-section">
        <div className="section-heading">
          <h2>{compact ? "My Showcase" : "Creative Showcase"}</h2>
          <div className="showcase-actions">
            <label className="upload-button">
              + Add Work
              <input type="file" accept="image/*,video/*" onChange={uploadWork} hidden />
            </label>
            {compact && <button onClick={() => setPage("Showcase")}>View All →</button>}
          </div>
        </div>

        <div className="showcase-grid">
          {(compact ? showcase.slice(0, 5) : showcase).map(item => (
            <article className="work-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="work-overlay">
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </div>
            </article>
          ))}
        </div>
        {!showcase.length && <p className="muted">Your creative journey starts here. Upload your first work!</p>}
      </section>
    );
  }

  function EventCards({ compact = false }) {
    return (
      <section className="events-section">
        <div className="section-heading">
          <h2>Upcoming Events</h2>
          {compact && <button onClick={() => setPage("Events")}>View Calendar →</button>}
        </div>
        <div className="event-grid">
          {(compact ? events.slice(0, 3) : events).map(event => (
            <article className="event-card" key={event.id}>
              <img src={event.image} alt={event.name} />
              <div className="event-content">
                <span className="event-type">{event.type}</span>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <div className="event-bottom">
                  <span>▦ {event.date}</span>
                  <button
                    className={joined.includes(event.id) ? "joined" : ""}
                    onClick={() => joinEvent(event)}
                  >
                    {joined.includes(event.id) ? "Registered ✓" : "Join →"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function Home() {
    return (
      <>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">YOUR TALENT. YOUR STAGE. YOUR COMMUNITY.</span>
            <h1>Sangeeta <span>Vrinda</span> Madhyam</h1>
            <p>The Creative & Cultural Ecosystem<br />for Our Campus</p>
            <button className="primary-button" onClick={() => setPage("Events")}>
              Explore Events <span>→</span>
            </button>
          </div>
          <div className="hero-art">
            <div className="hero-decoration">SVM</div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-box"><span className="stat-icon red">☆</span><div><strong>{student.points.toLocaleString("en-IN")}</strong><p>My Points</p></div></div>
          <div className="stat-box"><span className="stat-icon purple">▥</span><div><strong>#{myRank || "—"}</strong><p>My Rank</p></div></div>
          <div className="stat-box"><span className="stat-icon gold">♜</span><div><strong>{student.events}</strong><p>Events Participated</p></div></div>
          <div className="stat-box"><span className="stat-icon grey">▧</span><div><strong>{showcase.length}</strong><p>Showcase Items</p></div></div>
        </section>

        <div className="main-columns">
          <div className="primary-column">
            <Showcase compact />
            <EventCards compact />
          </div>
          <div className="secondary-column">
            <Leaderboard />
            <section className="earn-card">
              <span>♙</span>
              <div><h3>Earn Points</h3><p>Participate, perform, collaborate and climb the leaderboard!</p></div>
              <button onClick={() => setPage("Events")}>→</button>
            </section>
            <section className="panel badges-panel">
              <div className="panel-heading"><h2>My Badges</h2><button onClick={() => setPage("My Profile")}>View All →</button></div>
              <div className="badges-grid">
                <div><span className="badge-icon">♩</span><strong>Performer</strong><small>Events</small></div>
                <div><span className="badge-icon purple">♧</span><strong>Collaborator</strong><small>Teamwork</small></div>
                <div><span className="badge-icon gold">✿</span><strong>Creative</strong><small>Showcase</small></div>
                <div><span className="badge-icon green">♛</span><strong>Achiever</strong><small>Top 20</small></div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  function Profile() {
    return (
      <div className="page-content">
        <div className="page-title"><span className="eyebrow">YOUR IDENTITY</span><h1>My Profile</h1><p>Your interests, your achievements, your story.</p></div>
        <section className="panel profile-card">
          <Avatar name={student.name} size="large" />
          <div className="profile-details">
            <h2>{student.name}</h2>
            <p>{student.branch} · {student.year}</p>
            <p>{student.bio}</p>
            <div className="interest-tags">{student.interests.map(x => <span key={x}>{x}</span>)}</div>
          </div>
          <button className="upload-button" onClick={() => {
            const name = prompt("Enter your full name", student.name);
            if (name) setStudent(prev => ({ ...prev, name }));
          }}>Edit Name</button>
        </section>
        <div className="stats-grid">
          <div className="stat-box"><div><strong>{student.points}</strong><p>Total Points</p></div></div>
          <div className="stat-box"><div><strong>#{myRank}</strong><p>Leaderboard Rank</p></div></div>
          <div className="stat-box"><div><strong>{student.events}</strong><p>Events Joined</p></div></div>
          <div className="stat-box"><div><strong>{showcase.length}</strong><p>Portfolio Items</p></div></div>
        </div>
        <Showcase />
      </div>
    );
  }

  function Communities() {
    const groups = [
      ["Dance Collective", "Dance", "Share choreography, practice and performances.", "♬"],
      ["Music Society", "Music", "Find musicians, singers and performers.", "♫"],
      ["Lens & Frames", "Photography", "Photography, videography and visual storytelling.", "▧"],
      ["Creative Canvas", "Art", "Illustration, design, painting and crafts.", "✿"],
      ["Stage & Spotlight", "Theatre", "Acting, anchoring, writing and public speaking.", "✦"],
      ["Innovation Circle", "Projects", "Build interdisciplinary creative projects.", "⚙"],
    ];
    return <div className="page-content"><div className="page-title"><span className="eyebrow">FIND YOUR PEOPLE</span><h1>Communities</h1><p>Meet students who share your interests.</p></div><div className="community-grid">{groups.map(g => <article className="panel community-card" key={g[0]}><span>{g[3]}</span><small>{g[1]}</small><h2>{g[0]}</h2><p>{g[2]}</p><button onClick={() => setNotice(`Community request sent to ${g[0]}.`)}>Explore Community →</button></article>)}</div></div>;
  }


if (!registered) {
  return <Registration onComplete={completeRegistration} />;
}

return (
  <div className="app-shell">
    <Sidebar />

    <main className="main-area">
      <Header />

      {notice && <div className="toast">{notice}</div>}

      <div className="page-body">
        {page === "Home" && <Home />}

        {page === "My Profile" && <Profile />}

        {page === "Showcase" && (
          <div className="page-content">
            <div className="page-title">
              <span className="eyebrow">CREATIVITY HAS NO LIMITS</span>
              <h1>Student Showcase</h1>
              <p>Discover and share the work of our campus creators.</p>
            </div>
            <Showcase />
          </div>
        )}

        {page === "Events" && (
          <div className="page-content">
            <div className="page-title">
              <span className="eyebrow">BE PART OF THE EXPERIENCE</span>
              <h1>Campus Events</h1>
              <p>Discover events, register and earn participation points.</p>
            </div>
            <EventCards />
          </div>
        )}

        {page === "Leaderboard" && (
          <div className="page-content">
            <div className="page-title">
              <span className="eyebrow">CELEBRATING CONTRIBUTIONS</span>
              <h1>Leaderboard</h1>
              <p>Recognizing creativity, participation and collaboration.</p>
            </div>
            <Leaderboard full />
          </div>
        )}

        {page === "Communities" && <Communities />}
      </div>
    </main>
  </div>
);
}

export default App;




