import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, X, ChevronRight, ChevronLeft, Layers, Play } from 'lucide-react';

// Colors retained from original for continuity
const COLORS = {
  accent: '#DAD7CD',
  base: '#1a2e1a',
  tint: '#1c1c1c'
};

// Support GitHub Pages base path
const BASE = import.meta.env.BASE_URL || '/';

// Staff card images reuse logic
const STAFF_CARDS = Array.from({ length: 41 }, (_, i) => {
  const file = i === 0 ? 'Photocard Design.jpg' : `Photocard Design (${i}).jpg`;
  return `${BASE}projects/SSC_Staff_Design/${encodeURI(file)}`;
});

const PROJECTS = [
  {
    id: 1,
    title: 'reDefine Success Conference',
    category: 'Web Design & Branding',
    type: 'web',
    description: 'Conceptualized and designed the entire conference branding focused on inclusivity, including website design and visual identity.',
    link: 'https://www.suss.edu.sg/news-events/happenings/webinars-on-campus-events/detail/2025/09/08/default-calendar/re-define-success-conference',
    image: 'https://www.suss.edu.sg/images/default-source/dept_ssc/redefine_banner_test-tmb-1920_350.png?sfvrsn=fdbb182b_7',
    pdf: `${BASE}projects/reDefine_design_workfile.pdf`
  },
  {
    id: 2,
    title: 'SSC Staff Photocard Design',
    category: 'Graphic Design',
    type: 'gallery',
    description: 'Created 41 unique staff photocard designs for the department, featuring custom layouts and personalized designs for each team member.',
    images: STAFF_CARDS,
    image: STAFF_CARDS[3]
  },
  {
    id: 3,
    title: 'Logo Design',
    category: 'Brand Identity',
    type: 'image',
    description: 'Custom logo design created for client project.',
    image: `${BASE}projects/Logo Design/LogoDesign.png`
  },
  {
    id: 4,
    title: 'Team Charter Design',
    category: 'Graphic Design',
    type: 'image',
    description: 'Team charter design for office use, establishing team values and collaboration guidelines.',
    image: `${BASE}projects/Teamcharter.jpg`
  },
  {
    id: 5,
    title: 'Feature Articles',
    category: 'Web Design',
    type: 'web',
    description: 'Feature article website designed during Mass Communication studies.',
    link: 'https://s10197938.wixsite.com/newsfea-fa3',
    image: `${BASE}projects/T.Lot_NewsFea.png`
  },
  {
    id: 6,
    title: 'Adobe XD Prototype',
    category: 'UI/UX Design',
    type: 'xd',
    description: 'Interactive prototype designed in Adobe XD for Mass Communication project.',
    link: 'https://xd.adobe.com/view/3b7c64f1-03b7-4882-93c2-cbf2c7b1f813-6e2f/screen/7d823ef3-33db-4577-ab42-5a411341134e/?fullscreen&hints=off',
    image: `${BASE}projects/NPal2.png`
  },
  {
    id: 7,
    title: 'Canine Behaviourist Documentary',
    category: 'Video Production',
    type: 'video',
    description: "A documentary following Fraser Noble's journey from dog owner to certified canine behaviourist, exploring science-based training methods for dogs with traumatic pasts.",
    link: 'https://www.youtube.com/watch?v=BaFtWL-9QqU',
    image: 'https://img.youtube.com/vi/BaFtWL-9QqU/hqdefault.jpg'
  }
];

// Modal Components (simplified styling tweaks)
const BaseModal = ({ children, onClose, title, actions }) => (
  <div data-modal-root className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    <div onClick={e => e.stopPropagation()} className="relative w-full max-w-5xl rounded-lg glass border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-5 h-14 border-b border-white/10">
        <h3 className="text-sm font-accent tracking-wide">{title}</h3>
        <div className="flex items-center gap-3">
          {actions}
          <button onClick={onClose} className="text-white/60 hover:text-white"><X size={20} /></button>
        </div>
      </div>
      <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  </div>
);

const GalleryModal = ({ project, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const closeExpanded = () => setExpandedIndex(null);
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') { expandedIndex !== null ? closeExpanded() : onClose(); } };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [expandedIndex]);
  return (
    <BaseModal title={project.title} onClose={onClose} actions={null}>
      <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {project.images.map((img, i) => (
          <button key={i} onClick={() => setExpandedIndex(i)} className="group aspect-[2/3] overflow-hidden rounded bg-black/30 focus:outline-none focus:ring-2 focus:ring-white/30">
            <img src={img} alt={`Card ${i+1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          </button>
        ))}
      </div>
      {expandedIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" onClick={closeExpanded}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div onClick={e => e.stopPropagation()} className="relative w-full max-w-md rounded-lg border border-white/10 bg-black/50 overflow-hidden">
            <button onClick={closeExpanded} className="absolute top-2 right-2 text-white/70 hover:text-white"><X size={20} /></button>
            <img src={project.images[expandedIndex]} alt={`Expanded ${expandedIndex+1}`} className="w-full h-full object-contain" />
            <div className="absolute bottom-2 left-0 w-full text-center text-[10px] font-accent tracking-[0.2em] text-white/50">{expandedIndex+1} / {project.images.length}</div>
          </div>
        </div>
      )}
    </BaseModal>
  );
};

const WebModal = ({ project, onClose }) => {
  const [attempt, setAttempt] = useState(false);
  const [status, setStatus] = useState('idle');
  useEffect(() => { if (attempt) { setStatus('loading'); const t = setTimeout(() => { if (status === 'loading') setStatus('failed'); }, 3000); return () => clearTimeout(t); } }, [attempt, status]);
  return (
    <BaseModal title={project.title} onClose={onClose} actions={<button onClick={() => setAttempt(a => !a)} className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20">{attempt ? 'Hide Embed' : 'Try Live'}</button>}>
      <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-2xl">{project.description}</p>
      {!attempt && (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30">
            <img src={project.image} alt={project.title} className="object-cover w-full h-64" />
          </div>
          <div className="text-xs text-white/60 space-y-4">
            <p>Embedding disabled by default to avoid blank security-restricted iframes. Use the toggle to attempt a live preview; if blocked, open externally.</p>
            <a href={project.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs"><ExternalLink size={14}/> Visit Site</a>
            {project.pdf && <div className="border border-white/10 rounded-lg overflow-hidden h-48"><iframe src={project.pdf} className="w-full h-full" title="Project PDF"/></div>}
          </div>
        </div>
      )}
      {attempt && (
        <div className="relative w-full h-[60vh] border border-white/10 rounded-lg overflow-hidden">
          {status === 'failed' && <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white/60 text-xs gap-4"><p>Embedding blocked. Please open in a new tab.</p><a href={project.link} target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 inline-flex items-center gap-2 text-white text-xs"><ExternalLink size={14}/> Open</a></div>}
          <iframe src={project.link} className={`w-full h-full ${status === 'failed' ? 'opacity-0' : 'opacity-100'}`} title={project.title} onLoad={() => setStatus('loaded')} />
        </div>
      )}
    </BaseModal>
  );
};

const VideoModal = ({ project, onClose }) => {
  const getYouTubeId = url => { const m = url.match(/(?:v=|youtu.be\/)([A-Za-z0-9_-]{11})/); return m ? m[1] : null; };
  const vid = getYouTubeId(project.link);
  return (
    <BaseModal title={project.title} onClose={onClose} actions={<a href={project.link} target="_blank" rel="noopener" className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20"><ExternalLink size={14}/></a>}>
      <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-2xl">{project.description}</p>
      <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black">
        {vid ? <iframe src={`https://www.youtube.com/embed/${vid}`} title={project.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <div className="flex items-center justify-center h-full text-white/40 text-xs">Video unavailable</div>}
      </div>
    </BaseModal>
  );
};

const ImageModal = ({ project, onClose }) => (
  <BaseModal title={project.title} onClose={onClose} actions={null}>
    <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-2xl">{project.description}</p>
    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30">
      <img src={project.image} alt={project.title} className="w-full h-auto object-contain" />
    </div>
  </BaseModal>
);

// Left vertical navigation tracking active section
const SectionsNav = ({ active }) => {
  const items = [ 'home', 'work', 'about', 'contact' ];
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <nav className="fixed left-0 top-0 h-full w-20 flex flex-col items-center pt-10 z-40">
      <div className="flex flex-col gap-6">
        {items.map((id, i) => (
          <button key={id} onClick={() => scrollTo(id)} className="group flex flex-col items-center gap-2">
            <span className={`text-[10px] font-accent tracking-[0.25em] ${active === id ? 'text-white' : 'text-white/40'} transition-colors`}>{id.toUpperCase()}</span>
            <div className={`h-2 w-2 rounded-full transition-all ${active === id ? 'bg-white scale-125' : 'bg-white/30 group-hover:bg-white/60'}`}></div>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Work list redesigned: numbered vertical list with hover preview panel
const WorkSection = ({ setModalProject }) => {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="grid lg:grid-cols-[1fr_540px] gap-10 w-full">
      <div className="space-y-10">
        {PROJECTS.map((p, idx) => (
          <div key={p.id} onMouseEnter={() => setHovered(p)} onMouseLeave={() => setHovered(null)} onClick={() => setModalProject(p)} className="cursor-pointer group">
            <div className="flex items-baseline gap-6">
              <span className="text-white/30 text-3xl tabular-nums font-accent">{String(idx+1).padStart(2,'0')}</span>
              <h3 className="text-2xl md:text-3xl heading-tight font-semibold group-hover:text-white transition-colors">{p.title}</h3>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-xs font-accent tracking-[0.2em] text-white/50">{p.category.toUpperCase()}</span>
              <div className="h-px w-10 bg-white/10 group-hover:bg-white/40 transition-all" />
              <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors max-w-lg leading-relaxed">{p.description.slice(0,90)}...</span>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block sticky top-32 self-start">
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/30 flex items-center justify-center">
          {hovered ? (
            <img src={hovered.image} alt={hovered.title} className="w-full h-full object-cover opacity-80" />
          ) : (
            <div className="text-xs text-white/40 font-accent tracking-[0.3em]">HOVER PROJECT</div>
          )}
        </div>
      </div>
    </div>
  );
};

const AppNew = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState('home');
  const [modalProject, setModalProject] = useState(null);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-section]'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { root: null, threshold: 0.6 });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  const openModal = p => setModalProject(p);
  const closeModal = () => setModalProject(null);
  return (
    <div className="h-full flex">
      <SectionsNav active={active} />
      <main ref={containerRef} className="flex-1 ml-20 h-full overflow-y-auto snap-container">
        {/* Home */}
        <section id="home" data-section className="snap-section min-h-screen flex items-center px-8 md:px-24">
          <div className="max-w-5xl animate-fade-slide-up">
            <div className="meta mb-6 text-white/50">PORTFOLIO 2025</div>
            <h1 className="text-6xl md:text-8xl font-bold heading-tight mb-10 leading-[0.9]">
              ETHAN <span className="block font-accent font-light italic">TOH</span>
            </h1>
            <p className="text-xl md:text-2xl font-accent mb-12 text-white/80">Designer · Developer · Cloud Enthusiast</p>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors">View Projects</button>
              <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full border border-white/30 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors">Get in Touch</button>
            </div>
          </div>
        </section>
        {/* Work */}
        <section id="work" data-section className="snap-section min-h-screen px-8 md:px-24 py-24 flex items-start">
          <div className="w-full max-w-7xl">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold heading-tight mb-4">Selected Work</h2>
              <div className="meta text-white/50">DESIGN · DEVELOPMENT · MEDIA</div>
            </div>
            <WorkSection setModalProject={openModal} />
          </div>
        </section>
        {/* About */}
        <section id="about" data-section className="snap-section min-h-screen px-8 md:px-24 py-24 flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl w-full">
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg border border-white/10 overflow-hidden bg-gradient-to-br from-[#344E41] to-[#4E3441] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl md:text-8xl font-bold mb-4">ET</div>
                  <p className="meta tracking-[0.3em] text-white/70">DESIGN · DEV</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-white/20 hidden md:flex items-center justify-center animate-spin-slow">
                <div className="text-[10px] font-accent tracking-[0.3em] text-white/60 rotate-12">SUSS · 2025</div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold heading-tight">About Me</h2>
              <p className="text-base md:text-lg leading-relaxed text-white/80">I'm studying ICT in SUSS right now, working part time with the Student Success Center department, managing their websites and digital designs.</p>
              <p className="text-base md:text-lg leading-relaxed text-white/80">Throughout my course so far, I've touched on machine learning, network security, even full-stack development. That said, the cloud architecture has truly caught my attention.</p>
              <p className="text-base md:text-lg leading-relaxed text-white/80">I've taken two certificates in the AWS Cloud Practitioner and Solutions Architect Associate, and I'm actively pursuing opportunities in cloud computing and DevOps.</p>
              <div className="grid sm:grid-cols-2 gap-10 text-sm">
                <div>
                  <div className="meta mb-3 text-white/50">DESIGN</div>
                  <ul className="space-y-2 text-white/70">
                    <li>UI/UX Design</li>
                    <li>Brand Identity</li>
                    <li>Video Production</li>
                    <li>Web Design</li>
                  </ul>
                </div>
                <div>
                  <div className="meta mb-3 text-white/50">DEVELOPMENT</div>
                  <ul className="space-y-2 text-white/70">
                    <li>Python Programming</li>
                    <li>Cloud (AWS)</li>
                    <li>Network Security</li>
                    <li>Machine Learning</li>
                  </ul>
                </div>
                <div>
                  <div className="meta mb-3 text-white/50">TOOLS</div>
                  <ul className="space-y-2 text-white/70">
                    <li>Adobe XD / Photoshop</li>
                    <li>Illustrator / Premiere</li>
                    <li>React / Tailwind</li>
                    <li>Git / VS Code</li>
                  </ul>
                </div>
                <div>
                  <div className="meta mb-3 text-white/50">CERTIFICATIONS</div>
                  <ul className="space-y-2 text-white/70">
                    <li>AWS Cloud Practitioner</li>
                    <li>AWS Solutions Architect</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact */}
        <section id="contact" data-section className="snap-section min-h-screen px-8 md:px-24 flex items-center justify-center">
          <div className="max-w-3xl w-full text-center space-y-10">
            <div className="meta text-white/50">LET'S CONNECT</div>
            <h2 className="text-5xl md:text-6xl font-bold heading-tight">Get in Touch</h2>
            <div className="space-y-6">
              <a href="mailto:evitern@outlook.com" className="link-underline text-xl font-accent">evitern@outlook.com</a>
            </div>
            <div className="flex justify-center gap-8 text-white/60">
              <a href="https://www.linkedin.com/in/ethan-toh-513836184/" target="_blank" rel="noopener" className="hover:text-white transition-colors text-sm font-accent link-underline">LinkedIn</a>
              <a href="https://github.com/Evelleity" target="_blank" rel="noopener" className="hover:text-white transition-colors text-sm font-accent link-underline">GitHub</a>
            </div>
            <p className="text-xs text-white/40 font-accent tracking-[0.25em]">OPEN TO CLOUD · DEVOPS · WEB</p>
          </div>
        </section>
      </main>
      {modalProject && (
        modalProject.type === 'gallery' ? <GalleryModal project={modalProject} onClose={closeModal} />
        : modalProject.type === 'web' || modalProject.type === 'xd' ? <WebModal project={modalProject} onClose={closeModal} />
        : modalProject.type === 'video' ? <VideoModal project={modalProject} onClose={closeModal} />
        : <ImageModal project={modalProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default AppNew;