import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Braces, Code2, Cloud, GitBranch, GitFork, Link, Mail, MessageCircle, Monitor, Palette, Smartphone } from 'lucide-react'
import { useRef } from 'react'

const portraitUrl = '/images/selfie.jpg'
const fallbackImage = '/images/crypto.jpg'
const skills = [
  { name: 'HTML5', icon: Code2 },
  { name: 'CSS3', icon: Palette },
  { name: 'JavaScript', icon: Braces },
  { name: 'Git', icon: GitBranch },
  { name: 'GitHub', icon: GitFork },
  { name: 'Responsive Design', icon: Smartphone },
  { name: 'Netlify', icon: Cloud },
  { name: 'VS Code', icon: Monitor },
]
const projects = [
  ['MM Stores', 'E-commerce website', 'https://mmstores.com.ng/images/ponmo1.jpg', 'https://images.pexels.com/photos/18404065/pexels-photo-18404065.jpeg?auto=compress&cs=tinysrgb&w=900', 'https://mmstores.com.ng/images/stationary.jpg', 'https://mmstores.com.ng/'],
  ['The Niche Academy', 'Education website', 'https://thenicheacademy.netlify.app/pics/IMG-20251211-WA0005.jpg', 'https://thenicheacademy.netlify.app/pics/IMG-20251211-WA0001.jpg', 'https://thenicheacademy.netlify.app/pics/IMG-20251211-WA0004.jpg', 'https://thenicheacademy.netlify.app/'],
  ['BTC Price Checker', 'React web application', '/images/crypto.jpg', '/images/crypto.jpg', '/images/crypto.jpg', 'https://btcpricechecker.netlify.app/'],
  ['Saphel Couture', 'Fashion website', 'https://images.pexels.com/photos/8526759/pexels-photo-8526759.jpeg?auto=compress&cs=tinysrgb&w=1920', 'https://images.pexels.com/photos/34821107/pexels-photo-34821107.jpeg?auto=compress&cs=tinysrgb&w=1920', 'https://images.pexels.com/photos/35357616/pexels-photo-35357616.jpeg?auto=compress&cs=tinysrgb&w=1920', 'https://saphelcouture.netlify.app/'],
] as const

type Project = typeof projects[number]
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return <motion.div className={className} initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: shouldReduceMotion ? 0 : delay, duration: shouldReduceMotion ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>
}
function ContactButton() { return <a className="contact-button" href="#contact">Contact Me <ArrowUpRight size={18} /></a> }
function handleImageError(event: React.SyntheticEvent<HTMLImageElement>, fallback = fallbackImage) {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallback
}
function SocialLinks({ className = '' }: { className?: string }) {
  return <div className={`social-buttons ${className}`} aria-label="Social links">
    <a href="https://github.com/yusufabdhadeel-bot" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={20} /></a>
    <a href="https://www.linkedin.com/in/yusuf-abdul-hadeel-908aa8365/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Link size={20} /></a>
    <a href="https://wa.me/2348067606279" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a>
    <a href="https://mail.google.com/mail/?view=cm&to=yusufabdhadeel@gmail.com" target="_blank" rel="noreferrer" aria-label="Email Yusuf"><Mail size={20} /></a>
  </div>
}
function FloatingPortrait() {
  const portraitRef = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.7 })
  const y = useSpring(0, { stiffness: 180, damping: 22, mass: 0.7 })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = portraitRef.current?.getBoundingClientRect()
    if (!bounds) return
    x.set(Math.max(-28, Math.min(28, (event.clientX - (bounds.left + bounds.width / 2)) / 3)))
    y.set(Math.max(-20, Math.min(20, (event.clientY - (bounds.top + bounds.height / 2)) / 4)))
  }

  const resetPosition = () => {
    x.set(0)
    y.set(0)
  }

  return <motion.div ref={portraitRef} className="hero-portrait" style={{ x, y }} onPointerMove={handlePointerMove} onPointerLeave={resetPosition} onPointerUp={resetPosition}>
    <img src={portraitUrl} alt="Yusuf Abdhadeel portrait" onError={(event) => handleImageError(event, portraitUrl)} />
  </motion.div>
}
function Skills() {
  const firstRow = skills.slice(0, 4)
  const secondRow = skills.slice(4)

  return <section className="skills-section" id="skills"><div className="skills-heading"><span>Skills &amp; tools</span><h2 className="hero-heading">Technologies I work with</h2></div><div className="skills-grid"><div className="skills-row skills-row--left">{[...firstRow, ...firstRow].map((skill, index) => <article className="skill-card" key={`${skill.name}-${index}`}><span className="skill-number">0{(index % firstRow.length) + 1}</span><skill.icon size={30} strokeWidth={1.5} aria-hidden="true" /><strong>{skill.name}</strong></article>)}</div><div className="skills-row skills-row--right">{[...secondRow, ...secondRow].map((skill, index) => <article className="skill-card" key={`${skill.name}-${index}`}><span className="skill-number">0{(index % secondRow.length) + 5}</span><skill.icon size={30} strokeWidth={1.5} aria-hidden="true" /><strong>{skill.name}</strong></article>)}</div></div></section>
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const isLast = index === projects.length - 1
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], isLast ? [1, 1, 1] : [0.99, 1, 0.97])
  const x = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], isLast ? [0, 0, 0, 0] : [20, 0, 0, -8])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], isLast ? [1, 1, 1, 1] : [0.7, 1, 1, 0.9])
  return <div className={`project-slot ${isLast ? 'project-slot--last' : ''}`} ref={ref}><motion.article className={`project-card ${isLast ? 'project-card--last' : ''}`} style={{ scale, x, opacity }}><div className="project-top"><span className="project-number">0{index + 1}</span><div><span className="project-category">{project[1]}</span><h3>{project[0]}</h3></div><a className="live-button" href={project[5]} target="_blank" rel="noreferrer" aria-label={`View ${project[0]} website`}>View site <ArrowUpRight size={16} /></a></div><div className="project-images"><div><img src={project[2]} alt={`${project[0]} preview`} loading="lazy" decoding="async" onError={handleImageError} /><img src={project[3]} alt={`${project[0]} detail`} loading="lazy" decoding="async" onError={handleImageError} /></div><img src={project[4]} alt={`${project[0]} main view`} loading="lazy" decoding="async" onError={handleImageError} /></div></motion.article></div>
}
function App() {
  return <div className="site-shell"><section className="hero" id="home"><nav className="hero-nav"><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav><FadeIn className="hero-title"><h1 className="hero-heading">This is Yusuf</h1></FadeIn><div className="hero-orbit-label">Frontend developer <span>／</span> Nigeria <span>／</span> 2026</div><div className="hero-bottom"><FadeIn delay={0.35}><p>a frontend developer building polished, responsive websites for ambitious businesses</p></FadeIn><FadeIn delay={0.5}><ContactButton /></FadeIn><SocialLinks className="hero-social" /></div><FloatingPortrait /></section><Skills /><section className="projects-section" id="projects"><FadeIn><h2 className="hero-heading">Selected work</h2></FadeIn><div className="project-stack">{projects.map((project, index) => <ProjectCard key={project[0]} project={project} index={index} />)}</div><section className="contact-placeholder" id="contact"><span>Let&apos;s build a website that works harder for your business.</span><ContactButton /></section></section><footer className="site-footer"><div className="footer-main"><div><strong>Yusuf Abdhadeel</strong><span>Frontend development · UI/UX design · Responsive websites</span></div><SocialLinks /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Yusuf Abdhadeel. Crafted with clarity.</span><div><a href="#home">Home</a><a href="#skills">Skills</a><a href="#projects">Work</a><a href="#contact">Contact</a></div></div></footer></div>
}
export default App
