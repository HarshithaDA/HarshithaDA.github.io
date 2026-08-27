import { useEffect, useState } from 'react'
import { navigationItems, siteContent } from './content'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import {
  BrainCircuit,
  Eye,
  Workflow,
  Code2,
} from 'lucide-react'

type SectionId = (typeof navigationItems)[number]

const sectionLabels: Record<SectionId, string> = {
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  publications: 'Publications',
  certifications: 'Certifications',
  volunteering: 'Volunteering',
  resume: 'Resume',
  contact: 'Contact',
}

function SectionTitle({
  title,
  description,
  className = '',
}: {
  title: string
  description?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
        {description}
      </p>
    </div>
  )
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
    >
      <span className="transition group-hover:scale-110">{children}</span>
    </a>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProjectCategory, setSelectedProjectCategory] = useState('All Projects')
  const [openCoursework, setOpenCoursework] = useState<string | null>(null)
  const [selectedCertificationCategory, setSelectedCertificationCategory] =
  useState('Featured Certifications')

  const projectCategories = ['All Projects', ...siteContent.projects.map((group) => group.category)]
  const visibleProjectItems =
    selectedProjectCategory === 'All Projects'
      ? Array.from(
          new Map(
            siteContent.projects
              .flatMap((group) =>
                group.items.map((project) => ({
                  ...project,
                  category: group.category,
                }))
              )
              .map((project) => [project.title, project])
          ).values()
        ).sort((a, b) => b.year - a.year)
      : siteContent.projects
          .filter((group) => group.category === selectedProjectCategory)
          .flatMap((group) =>
            group.items.map((project) => ({
              ...project,
              category: group.category,
            }))
          )
            const certificationCategories = [
    'Featured Certifications',
    ...siteContent.certifications.map((group) => group.category),
  ]

  const visibleCertifications =
    selectedCertificationCategory === 'Featured Certifications'
        ? siteContent.certifications.flatMap((group) =>
            group.items
            .filter((item) => item.featured)
            .map((item) => ({
                ...item,
                category: group.category,
            })),
        )
        : siteContent.certifications
            .filter((group) => group.category === selectedCertificationCategory)
            .flatMap((group) =>
            group.items.map((item) => ({
                ...item,
                category: group.category,
            })),
            )
            
  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const subject = String(formData.get('subject') ?? 'Portfolio inquiry')
    const message = String(formData.get('message') ?? '')

    const mailSubject = encodeURIComponent(subject)
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${siteContent.email}?subject=${mailSubject}&body=${mailBody}`
  }

  useEffect(() => {
    const handleScroll = () => {
      const navbarOffset = 140

      let currentSection: SectionId = 'about'

      for (const id of navigationItems) {
        const section = document.getElementById(id)

        if (!section) continue

        const top = section.getBoundingClientRect().top

        if (top <= navbarOffset) {
          currentSection = id
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_40%),linear-gradient(180deg,hsl(var(--background)),hsl(210_40%_97%))] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

       <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#about" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-0.5">
              HA
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-950 md:text-lg">Harshitha Devina Anto</p>
            </div>
          </a>

          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => (
              <a key={item} href={`#${item}`} className={`nav-link ${activeSection === item ? 'nav-link-active' : ''}`}>
                {sectionLabels[item]}
              </a>
            ))}
          </nav>
        </div>

        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
            <div className="grid gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${activeSection === item ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-700'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {sectionLabels[item]}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="pb-20 pt-24 md:pt-20">
      <section id="about" className="scroll-mt-28 section-block">
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* Main Introduction */}
              <div className="space-y-6">

                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  Building {' '}
                  <span className="gradient-text">
                    intelligent systems
                  </span>{' '}
                  with AI
                </h1>

            <div className="max-w-3xl space-y-6 text-[1.15rem] leading-[1.9] text-slate-700 md:text-[1.2rem]">

              <p className="text-justify">
                I'm <span className="font-semibold text-slate-950">Harshitha Devina Anto</span>,
                a <span className="font-semibold text-slate-950">Software Developer </span>and Master of Science in Computer Science graduate from{' '}
                  The University of Texas at Dallas.
              </p>

              <p className="text-justify">
                I'm passionate about tackling real-world challenges and building solutions
                at the intersection of{' '}
                <span className="font-semibold text-slate-950">
                  AI, automation, and software engineering
                </span>.
                My experience includes AI-powered browser automation, multi-agent systems,
                computer vision, and data-driven applications.
              </p>

              <p className="text-justify">
                I thrive in collaborative, fast-paced team environments and love the energy
                of hackathons, where I get to{' '}
                  build fast and learn faster.
                I'm continuously learning to strengthen my skills, explore emerging
                technologies, and stay updated with what's next in tech.
              </p>
            </div>
            </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">

                <a href="#projects" className="btn-primary">
                  Explore My Work
                  <span aria-hidden="true">→</span>
                </a>

                <a
                  href={siteContent.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2] hover:shadow-lg"
                >
                  <FaLinkedinIn className="h-5 w-5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={siteContent.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>GitHub</span>
                </a>

              </div>

            </div>

            {/* RIGHT SIDE - PROFILE */}

            <aside className="relative">

              {/* Soft background glow */}
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-cyan-100/60 blur-3xl" />

              <div className="overflow-hidden rounded-[2rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-5 shadow-xl shadow-cyan-100/50 md:p-6">

                {/* Image */}
                <div className="flex justify-center">

                  <div className="rounded-3xl border border-cyan-200 bg-white p-4 shadow-lg shadow-cyan-100/50">

                    <img
                      src="/avatar.png"
                      alt="Harshitha Devina Anto"
                      className="h-64 w-64 rounded-[1.5rem] object-cover md:h-72 md:w-72"
                    />

                  </div>

                </div>

                {/* Profile Information */}
                <div className="mt-6 text-center">

                  <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
                    Harshitha Devina Anto
                  </h2>

                  <p className="mt-4 text-lg font-medium text-cyan-600">
                    Software Developer · AI/ML Engineer
                  </p>

                </div>

                {/* Quick Information */}
                <div className="mt-6 grid gap-3">

                 {/* Availability */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    Open to Full-Time Opportunities
                  </div>
                </div>


                </div>

              </div>

            </aside>

          </div>


          {/* WHAT I WORK WITH */}
          <div className="mt-20">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Areas of Focus
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                What I enjoy building
              </h2>


            </div>



            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              {/* Software Engineering */}
              <div className="section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-100 group-hover:text-blue-700">
                  <Code2 className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  Software Engineering
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Building full-stack applications, APIs, automation workflows,
                  and reliable software systems.
                </p>

              </div>


              {/* AI */}
              <div className="section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/50">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:border-cyan-200 group-hover:bg-cyan-100 group-hover:text-cyan-700">
                  <BrainCircuit className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  AI & Machine Learning
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Developing intelligent applications using machine learning,
                  deep learning, LLMs, and AI agents.
                </p>

              </div>


              {/* Computer Vision */}
              <div className="section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600 transition-all duration-300 group-hover:border-purple-200 group-hover:bg-purple-100 group-hover:text-purple-700">
                  <Eye className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  Computer Vision
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Applying computer vision and deep learning to real-world problems,
                  including healthcare and autonomous systems.
                </p>

              </div>


              {/* Automation */}
              <div className="section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:border-emerald-200 group-hover:bg-emerald-100 group-hover:text-emerald-700">
                  <Workflow className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  Intelligent Automation
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Combining browser automation, LLMs, semantic search, and APIs to
                  create smarter automated workflows.
                </p>

              </div>

            </div>

          </div>


          {/* SELECTED TECHNOLOGIES */}
          <div className="mt-20 border-t border-slate-200 pt-16">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div className="max-w-xl">

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                  Technical Skills
                </h2>



              </div>


              {/* Technical Skills */}
              <div className="space-y-6">

                {/* Programming Languages */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Programming Languages
                  </h3>

                  <div className="flex max-w-3xl flex-wrap gap-2.5">
                    {[
                      'Python',
                      'SQL',
                      'Java',
                      'JavaScript',
                      'React',
                      'R',
                      'MATLAB',
                      'C',
                      'C++',
                      'HTML',
                      'CSS',
                      'PySpark',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-md hover:shadow-cyan-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Software */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Tools & Software
                  </h3>

                  <div className="flex max-w-3xl flex-wrap gap-2.5">
                    {[
                      'Google Cloud Platform (GCP)',
                      'Microsoft Azure',
                      'UiPath',
                      'Microsoft Power BI',
                      'n8n',
                      'Arduino IDE',
                      'Raspberry Pi',
                      'Autodesk Tinkercad',
                      'Databricks',
                      'Apache Hadoop',
                      'MongoDB',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-md hover:shadow-cyan-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

</div>

            </div>

          </div>

        </div>
      </section>

        <section id="experience" className="scroll-mt-28 section-alt">
          <SectionTitle
           className="text-center"
            title="Experience & Education"
          />
          <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mt-10 space-y-8">
            {siteContent.experience.map((item, index) => (
              <article key={item.title} className="experience-card p-6 md:p-7" style={{ animationDelay: `${index * 120}ms` }}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-[2rem]">{item.title}</h3>
                    <p className="text-lg font-medium text-slate-700 md:text-xl">{item.place}</p>
                  </div>
                  <p className="inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {item.period}
                  </p>
                </div>
                <ul className="mt-5 grid gap-3 text-slate-600">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

            </div>
    <div className="mt-16">
      <h3 className="text-center text-4xl font-semibold tracking-tight text-slate-950">
        Education
      </h3>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mt-10 space-y-8">
            {siteContent.education.map((item, index) => {
                const isCourseworkOpen = openCoursework === item.title

                return (
                <article
                    key={item.title}
                    className="section-card p-6 md:p-7"
                    style={{ animationDelay: `${index * 120}ms` }}
                >
                    <div className="flex flex-col gap-6 md:flex-row">

                    {/* School Logo */}
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${item.place}`}
                        className="group flex h-20 w-20 shrink-0 items-center overflow-hidden justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md"
                    >
                        <img
                        src={item.logo}
                        alt={`${item.place} logo`}
                        className="h-full w-full scale-150 object-contain transition duration-300 group-hover:scale-[1.6]"
                        />
                    </a>

                    {/* Education Content */}
                    <div className="min-w-0 flex-1">

                        {/* Header */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                        {/* Degree + University */}
                        <div className="min-w-0">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                            {item.title}
                            </h3>

                            <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-lg font-semibold text-cyan-700 transition hover:text-cyan-900 hover:underline md:text-xl"
                            >
                            {item.place}
                            <span
                                aria-hidden="true"
                                className="ml-1.5 text-sm opacity-70"
                            >
                                
                            </span>
                            </a>
                        </div>

                        {/* Year + CGPA */}
                        <div className="shrink-0 text-left md:text-right">
                            <p className="inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            {item.period}
                            </p>

                            {item.cgpa ? (
                            <p className="mt-2 text-sm font-bold text-slate-800">
                                {item.cgpa}
                            </p>
                            ) : null}
                        </div>
                        </div>

                        {/* Relevant Coursework */}
                        {item.coursework ? (
                        <div className="mt-6 border-t border-slate-200 pt-5">
                            <button
                            type="button"
                            onClick={() =>
                                setOpenCoursework(
                                isCourseworkOpen ? null : item.title
                                )
                            }
                            className="flex w-full items-center justify-between gap-4 text-left"
                            aria-expanded={isCourseworkOpen}
                            >
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                                Coursework
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                {isCourseworkOpen
                                    ? 'Click to collapse'
                                    : 'Click to view courses by semester'}
                                </p>
                            </div>

                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-transform duration-300 ${
                                isCourseworkOpen ? 'rotate-180' : ''
                                }`}
                                aria-hidden="true"
                            >
                                ↓
                            </span>
                            </button>

                            {isCourseworkOpen ? (
                            <div className="mt-6 space-y-6">
                                {item.coursework.map((semester) => (
                                <div key={semester.term}>
                                    <h5 className="text-sm font-semibold text-slate-900">
                                    {semester.term}
                                    </h5>

                                    <ul className="mt-2 space-y-2">
                                    {semester.courses.map((course) => (
                                        <li
                                        key={course}
                                        className="flex gap-3 text-sm leading-6 text-slate-600"
                                        >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                                        <span>{course}</span>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                ))}
                            </div>
                            ) : null}
                        </div>
                        ) : null}

                        {/* Clubs & Societies */}
                        {item.activities?.length ? (
                        <div
                            className={`border-t border-slate-200 pt-5 ${
                            item.coursework ? 'mt-6' : 'mt-5'
                            }`}
                        >
                            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                            Clubs & Societies
                            </h4>

                            <div className="mt-3 flex flex-wrap gap-2">
                            {item.activities.map((activity) => (
                                <a
                                key={activity.name}
                                href={activity.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                                >
                                {activity.name}

                                <span
                                    aria-hidden="true"
                                    className="text-xs opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                >
                                    ↗
                                </span>
                                </a>
                            ))}
                            </div>
                        </div>
                        ) : null}

                    </div>
                    </div>
                </article>
                )
            })}
            </div>
        </div>
        </div>
        </section>

        <section id="projects" className="scroll-mt-28 section-block">
          <SectionTitle
           className="text-center"
            title="Featured Projects"
          />
          <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mt-10 flex flex-wrap gap-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedProjectCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedProjectCategory === category
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'border border-blue-100 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            {selectedProjectCategory !== 'All Projects' ? (
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-slate-950">{selectedProjectCategory}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent" />
              </div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjectItems.map((project) => (
                <article key={`${project.category}-${project.title}`} className="project-card group overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-28px_hsl(220_70%_20%/0.35)]">
                  <div className="project-card-media">
                    <div className="project-card-orb project-card-orb-left" />
                    <div className="project-card-orb project-card-orb-right" />
                    <div className="project-card-bars" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="px-1 pb-1 pt-4">
                    <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-xl font-semibold leading-7 text-slate-950">
                          {project.title}
                        </h4>

                        <span className="shrink-0 pt-1 text-sm font-medium text-slate-400">
                          {project.year}
                        </span>
                      </div>

                      <ul className="mt-4 grid gap-2.5 text-slate-600">
                          {project.description.map((detail) => (
                            <li key={detail} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                              <span className="text-sm leading-6 text-slate-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="project-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    className="btn-primary mt-6 inline-flex w-full rounded-lg px-4 py-3 text-sm shadow-none hover:shadow-none"
                  >
                    View project
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section id="publications" className="scroll-mt-28 section-alt">
        <SectionTitle
            className="text-center"
            title="Research Publications"
        />

        <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mt-10 space-y-8">
            {siteContent.publications.map((publication) => (
                <article
                key={publication.title}
                className="section-card mx-auto w-full max-w-6xl overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-9 lg:p-10"
                >
                {/* Header */}
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    
                    {/* Publication Information */}
                    <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 md:text-sm">
                        {publication.venue}
                    </p>

                    <h3 className="mt-2 max-w-5xl text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                        {publication.title}
                    </h3>
                    </div>

                    {/* Publication Date */}
                    <div className="shrink-0 text-left md:text-right">
                    <p className="inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {publication.period}
                    </p>
                    </div>
                </div>

                {/* View Paper Button */}
                <div className="mt-7 flex ">
                    <a
                    href={publication.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold md:px-7 md:py-3.5 md:text-base"
                    >
                    View Paper
                    <span aria-hidden="true">↗</span>
                    </a>
                </div>
                </article>
            ))}
            </div>
        </div>
        </section>

        <section id="certifications" className="scroll-mt-28 section-block">
        <SectionTitle
            className="text-center"
            title="Certifications"
        />

        <div className="mx-auto max-w-7xl px-5 md:px-8">

            {/* Certification Filters */}
            <div className="mt-10 flex flex-wrap gap-3">
            {certificationCategories.map((category) => (
                <button
                key={category}
                type="button"
                onClick={() => setSelectedCertificationCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCertificationCategory === category
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'border border-blue-100 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700'
                }`}
                >
                {category}
                </button>
            ))}
            </div>

            {/* Certification Cards */}
            <div className="mt-10 space-y-8">

            {selectedCertificationCategory !== 'Featured Certifications' ? (
                <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-slate-950">
                    {selectedCertificationCategory}
                </h3>

                <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent" />
                </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleCertifications.map(({ name, url, category }) => (
                <article
                    key={`${category}-${name}`}
                    className="section-card group p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                    {category}
                    </p>

                    <h3 className="mt-3 text-base font-semibold leading-6 text-slate-950">
                    {name}
                    </h3>

                    <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                    View Certification
                    <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                    >
                        ↗
                    </span>
                    </a>
                </article>
                ))}
            </div>

            </div>
        </div>
        </section>

        <section id="volunteering" className="scroll-mt-28 section-alt">
          <SectionTitle
           className="text-center"
            title="Volunteering"
          />
          <div className="mx-auto max-w-7xl px-5 md:px-8">

            <div className="mt-10 space-y-8">
            {siteContent.volunteering.map((item) => (
                <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                    {/* Image Gallery */}
                    <div className="relative h-72 overflow-hidden bg-slate-100 lg:h-full">
                    <div className="flex h-full gap-2 overflow-x-auto snap-x snap-mandatory">
                        {item.images.map((image, index) => (
                        <img
                            key={image}
                            src={image}
                            alt={`${item.title} - photo ${index + 1}`}
                            className="h-full min-w-full snap-center object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                        ))}
                    </div>

                    {/* Date */}
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur">
                        {item.period}
                    </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-7 md:p-9">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
                        {item.organization}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                        {item.title}
                    </h3>

                    <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                        {item.details}
                    </p>
                    </div>

                </div>
                </article>
            ))}
            </div>
          </div>
        </section>

        <section id="resume" className="scroll-mt-28 section-block">
        <SectionTitle
            className="text-center"
            title="Resume"
        />
        <div className="mx-auto max-w-7xl px-5 md:px-8">

        <div className="mx-auto mt-10 max-w-4xl">
            <div className="section-card overflow-hidden p-6 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                
                {/* Resume Icon */}
                <div className="btn-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl p-0">                <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 2.75h8.5L19 7.25V21a1.25 1.25 0 0 1-1.25 1.25h-10.5A1.25 1.25 0 0 1 6 21V2.75Z"
                    />
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 2.75V7.5h4.75M9 12h6M9 15.5h6M9 9h2.5"
                    />
                </svg>
                </div>

                {/* Resume Information */}
                <div className="min-w-0 flex-1">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Professional Resume
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                    Details on my experience, technical skills, projects, and research.
                </p>
                </div>

                {/* View Resume Button */}
                <a
                href={siteContent.resumeHref}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5"
                >
                View Resume
                <span aria-hidden="true">↗</span>
                </a>
            </div>
            </div>
        </div>
        </div>
        </section>

        <section id="contact" className="scroll-mt-28 section-alt">
            <SectionTitle
                    className="text-center"
                    title="Let’s connect"
                    description={
                        <strong className="font-semibold text-slate-700">
                        <>
                        Open to AI/ML Engineering, Software Development, and Automation roles. 
                        <br />
                        <br />
                        Reach out if you&apos;d like to collaborate on projects/research - or are just looking for a hackathon teammate - I&apos;d be happy to connect!
                        </>   
                        </strong>
                    }
            />
          <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mx-auto mt-10 max-w-4xl space-y-8">
            <div className="section-card overflow-hidden p-6 md:p-8">
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-lg font-bold text-slate-700">Name</span>
                    <input
                      name="name"
                      type="text"
                      placeholder="Full name"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-lg font-bold text-slate-700">Email</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                </div>

                <label className="space-y-2 block">
                  <span className="text-lg font-bold text-slate-700">Subject</span>
                  <input
                    name="subject"
                    type="text"
                    placeholder="What’s this about?"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="space-y-2 block">
                  <span className="text-lg font-bold text-slate-700">Message</span>
                  <textarea
                    name="message"
                    rows={7}
                    placeholder="Tell me about your project or just say hello!"
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <button type="submit" className="btn-primary w-full gap-2 rounded-lg py-3.5 text-base">
                  <span aria-hidden="true">✈</span>
                  Send Message
                </button>
              </form>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pb-2">
              <SocialIcon href={siteContent.github} label="GitHub">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.6-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.03 9.03 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteContent.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.2 8.98h4.6V24H.2V8.98ZM8.22 8.98h4.42v2.05h.06c.62-1.18 2.13-2.42 4.39-2.42 4.69 0 5.56 3.08 5.56 7.08V24h-4.6v-6.73c0-1.6-.03-3.65-2.22-3.65-2.22 0-2.56 1.73-2.56 3.53V24h-4.6V8.98Z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={`mailto:${siteContent.email}`} label="Email">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4.5-8 5-8-5V6l8 5 8-5v2.5Z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteContent.resumeHref} label="Resume">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v1.5H8V12Zm0 3.5h8V17H8v-1.5Zm0-7h4v1.5H8V8.5Z" />
                </svg>
              </SocialIcon>
            </div>

          </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App