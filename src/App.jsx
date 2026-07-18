import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from './data/profile.js'

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }



function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl" style={{
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container flex h-20 items-center justify-between">
        <a href="#home" className="font-extrabold tracking-wide text-2xl md:text-3xl" style={{
          background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {PROFILE.site.name.split(' ')[0]}
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[1.06rem] md:text-[1.125rem]" style={{ color: 'var(--text-secondary)' }}>
          {['projects', 'experience', 'education', 'publications', 'certifications', 'clubs', 'volunteering', 'contact'].map(id => (
            <a key={id} href={`#${id}`} className="hover:opacity-70 transition-opacity font-medium" style={{ color: 'var(--text-secondary)' }}>
              {id === 'experience' ? 'Experience' : id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="section">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: .5 }}>
          <h1 className="title-xl">{PROFILE.site.name}</h1>
          <p className="subtitle mt-2">{PROFILE.site.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-ghost" href={PROFILE.site.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a className="btn btn-ghost" href={PROFILE.site.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
          <ul className="mt-4 space-y-2">
            {PROFILE.about.points.map((p, i) => (
              <li key={i} className="muted flex items-start">
                <span className="mr-2" style={{ color: 'var(--accent-1)' }}>▸</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a className="btn btn-primary" href="#projects">View Projects</a>
            <a className="btn" href="#contact">Contact Me</a>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: .6, delay: .1 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              className="w-full object-cover aspect-[4/3]"
              src={PROFILE.site.avatar || '/avatar.jpg'}
              alt="profile"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
              style={{ borderRadius: '1rem' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, idx) => (
        <div key={idx} className="timeline-item">
          <div className="font-bold text-[1.1rem]" style={{ color: 'var(--accent-2)' }}>
            {it.dates || it.years}
          </div>
          <div className="font-bold text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>
            {it.company || it.school}
          </div>
          <div className="font-semibold text-[1.125rem]" style={{ color: 'var(--text-secondary)' }}>
            {it.role || it.degree}
          </div>
          {it.location && <div className="muted text-lg">{it.location}</div>}
          {Array.isArray(it.highlights) && (
            <ul className="list-disc ml-5 mt-2 text-[1.04rem] leading-7">
              {it.highlights.map((h, i) => (<li key={i}>{h}</li>))}
            </ul>
          )}
          {Array.isArray(it.details) && (
            <ul className="list-disc ml-5 mt-2">
              {it.details.map((d, i) => (<li key={i}>{d}</li>))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

function Section({ id, title, alt = false, children, subtitle }) {
  return (
    <section id={id} className={alt ? 'section-alt' : 'section'}>
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
        {subtitle && <p className="muted mt-2">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}

function useGitHubProjects(username) {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    let ignore = false
    async function run() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        if (!res.ok) throw new Error('GitHub API error')
        const repos = await res.json()
        const filtered = repos
          .filter(r => !r.fork && !r.archived)
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
          .slice(0, 6)
          .map(r => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            demo: r.homepage && r.homepage.startsWith('http') ? r.homepage : null,
            image: null,
            tags: [r.language, ...(r.topics || [])].filter(Boolean)
          }))
        if (!ignore) setProjects(filtered)
      } catch (err) { console.warn(err) }
    }
    run();
    return () => { ignore = true }
  }, [username])
  return projects
}

function ProjectCard({ project }) {
  return (
    <article className="card flex flex-col h-full" style={{ padding: 0, overflow: 'hidden' }}>
      {project.image && (
        <div className="relative aspect-video overflow-hidden">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" src={project.image} alt={project.name} />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>
          {project.name}
        </h3>
        <p className="muted mt-3 text-lg leading-relaxed">{project.description}</p>

        <div className="mt-auto">
          {project.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t, i) => (<span key={i} className="badge">{t}</span>))}
            </div>
          ) : null}
          <div className="mt-6 flex gap-3 flex-wrap">
            {project.url && <a className="btn text-base px-5 py-2" href={project.url} target="_blank" rel="noreferrer">Repo</a>}
            {project.demo && <a className="btn btn-primary text-base px-5 py-2" href={project.demo} target="_blank" rel="noreferrer">Demo</a>}
          </div>
        </div>
      </div>
    </article>
  )
}

function CertificationCard({ cert }) {
  return (
    <article className="card flex flex-col h-full" style={{ padding: 0, overflow: 'hidden' }}>
      {cert.image && (
        <div className="relative aspect-video bg-slate-800 flex items-center justify-center p-4">
          <img className="max-h-full max-w-full object-contain" src={cert.image} alt={cert.name} />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-bold text-lg md:text-xl" style={{ color: 'var(--text-primary)' }}>
          {cert.name}
        </h3>
        <p className="subtitle text-base mt-2" style={{ color: 'var(--accent-2)' }}>{cert.issuer || cert.organizer || cert.venue}</p>
        <p className="muted mt-1">{cert.year || cert.years}</p>
        {cert.link && (
          <a className="btn btn-ghost text-sm px-4 py-2 mt-4 inline-flex items-center gap-2" href={cert.link} target="_blank" rel="noreferrer">
            View Publication
          </a>
        )}
      </div>
    </article>
  )
}

function ActivityCard({ item }) {
  return (
    <article className="card flex flex-col h-full" style={{ padding: 0, overflow: 'hidden' }}>
      {item.image && (
        <div className="relative aspect-video overflow-hidden">
          <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" src={item.image} alt={item.org} />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-bold text-lg md:text-xl" style={{ color: 'var(--text-primary)' }}>
          {item.role}
        </h3>
        <p className="subtitle text-base mt-1" style={{ color: 'var(--accent-1)' }}>{item.org}</p>
        <p className="muted mt-1 text-sm">{item.years}</p>
        {item.note && <p className="muted mt-3 text-base">{item.note}</p>}
      </div>
    </article>
  )
}

function Projects() {
  const gh = useGitHubProjects(PROFILE.site.githubUsername)
  const all = useMemo(() => ([...(PROFILE.manualProjects || []), ...gh]), [gh])
  const hackathonProjects = PROFILE.hackathonProjects || []

  return (
    <>
      {/* Main Projects */}
      <div className="mt-6">
        <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Featured Projects
        </h3>
        {all.length === 0 ? (
          <p className="muted">No projects yet — add some in profile.js or make repos public on GitHub.</p>
        ) : (
          <div className="grid-cards">
            {all.map((p, idx) => <ProjectCard key={idx} project={p} />)}
          </div>
        )}
      </div>

      {/* Hackathon Projects */}
      {hackathonProjects.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Hackathon Projects
          </h3>
          <div className="grid-cards">
            {hackathonProjects.map((p, idx) => <ProjectCard key={idx} project={p} />)}
          </div>
        </div>
      )}
    </>
  )
}

function List({ items, render }) {
  return <ul className="mt-4 space-y-3">{items.map(render)}</ul>
}

export default function App() {
  return (
    <div>
      <Header />
      <Hero />

      <Section id="projects" title="Projects" subtitle="Open-source contributions, personal projects, and hackathon wins 🏆">
        <Projects />
      </Section>

      <Section id="experience" title="Work Experience" alt>
        {PROFILE.experience?.length > 0 ? (
          <Timeline items={PROFILE.experience} />
        ) : (
          <p className="muted mt-4">Add your experience in profile.js</p>
        )}
      </Section>

      <Section id="education" title="Education">
        {PROFILE.education?.length > 0 ? (
          <Timeline items={PROFILE.education} />
        ) : (
          <p className="muted mt-4">Add your education in profile.js</p>
        )}
      </Section>

      <Section id="publications" title="Publications" alt>
        {PROFILE.publications?.length > 0 ? (
          <div className="grid-cards">
            {PROFILE.publications.map((p, i) => (
              <CertificationCard key={i} cert={p} />
            ))}
          </div>
        ) : (
          <p className="muted mt-4">No publications yet — add them in profile.js</p>
        )}
      </Section>

      <Section id="certifications" title="Certifications & Workshops">
        {/* Certifications */}
        {(PROFILE.certifications || []).length > 0 && (
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Certifications
            </h3>
            <div className="grid-cards">
              {PROFILE.certifications.map((c, i) => (
                <CertificationCard key={i} cert={c} />
              ))}
            </div>
          </div>
        )}

        {/* Workshops */}
        {(PROFILE.workshops || []).length > 0 && (
          <div className={`${(PROFILE.certifications || []).length > 0 ? 'mt-16' : 'mt-4'}`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Workshops Attended
            </h3>
            <div className="grid-cards">
              {PROFILE.workshops.map((w, i) => (
                <CertificationCard key={i} cert={w} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state if both are empty */}
        {(PROFILE.certifications || []).length === 0 && (PROFILE.workshops || []).length === 0 && (
          <p className="muted mt-4">Add your certifications and workshops in profile.js</p>
        )}
      </Section>

      <Section id="clubs" title="Clubs" alt>
        {(PROFILE.clubs || []).length > 0 ? (
          <div className="grid-cards">
            {PROFILE.clubs.map((c, i) => (
              <ActivityCard key={i} item={c} />
            ))}
          </div>
        ) : (
          <p className="muted mt-4">Add your clubs in profile.js</p>
        )}
      </Section>

      <Section id="volunteering" title="Volunteering">
        {(PROFILE.volunteering || []).length > 0 ? (
          <div className="grid-cards">
            {PROFILE.volunteering.map((v, i) => (
              <ActivityCard key={i} item={v} />
            ))}
          </div>
        ) : (
          <p className="muted mt-4">Add your volunteer work in profile.js</p>
        )}
      </Section>

      <Section id="contact" title="Contact" alt>
        <div className="card max-w-3xl">
          <p className="text-[1.1rem]" style={{ color: 'var(--text-secondary)' }}>
            {PROFILE.contact?.message ||
              "Open to AI/ML Engineering, Software Development, and Automation roles. Please reach out if you'd like to collaborate on projects/research - or are just looking for a hackathon teammate - I'd be happy to connect!"}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {PROFILE.site.email && (
              <p className="flex items-center gap-2">
                <Mail size={18} style={{ color: 'var(--accent-1)' }} />
                <strong style={{ color: 'var(--text-primary)' }}>Email:</strong>{" "}
                <a className="underline hover:opacity-70" href={`mailto:${PROFILE.site.email}`} style={{ color: 'var(--accent-2)' }}>
                  {PROFILE.site.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </Section>

      <footer className="py-8 text-center" style={{
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)'
      }}>
        <div className="container flex flex-col md:flex-row items-center justify-center gap-2 text-lg">
          <span>© {new Date().getFullYear()} {PROFILE.site.name}</span>
          <span>·</span>
          <span>Built with React + Tailwind · Hosted on GitHub Pages</span>
        </div>
      </footer>
    </div>
  )
}