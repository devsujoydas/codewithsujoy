import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";
import projectsData from "../../data/projects";
import { ExternalLink, Code2, Server } from "lucide-react";

const categories = ["All", "Fullstack", "React"];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const ActionButton = ({ href, label, icon: Icon, variant = "primary" }) => {
  if (!href || href === "#") return null;

  const variants = {
    primary: "bg-primary-gradient text-primary-foreground hover:opacity-90 shadow-lg",
    client: "bg-card text-foreground hover:bg-muted border border-border",
    server: "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/20",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring ${variants[variant]}`}
    >
      <Icon size={14} />
      {label}
    </a>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? projectsData : projectsData.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <SectionWrapper id="projects" aria-labelledby="projects-heading">
      <div className="text-center mb-12">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          My Work
        </p>
        <h2 id="projects-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Featured <span className="text-primary-gradient">Projects</span>
        </h2>
      </div>

      <div className="reveal flex justify-center gap-3 mb-12 flex-wrap" role="tablist" aria-label="Project categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            role="tab"
            aria-selected={filter === cat}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring ${
              filter === cat
                ? "bg-primary-gradient text-primary-foreground shadow-lg"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
        role="tabpanel"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              exit="exit"
              className="glass rounded-2xl overflow-hidden card-hover group relative"
              style={{ willChange: "transform" }}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gradient-to-br from-primary/20 via-card to-primary/20">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />

                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-wrap items-center justify-center gap-3 px-4">
                    <ActionButton
                      href={project.live}
                      label="Live Demo"
                      icon={ExternalLink}
                      variant="primary"
                    />
                    <ActionButton
                      href={project.client}
                      label="Client"
                      icon={Code2}
                      variant="client"
                    />
                    <ActionButton
                      href={project.server}
                      label="Server"
                      icon={Server}
                      variant="server"
                    />
                  </div>
                </div>

                {project.featured && (
                  <span className="absolute top-3 right-3 text-xs font-bold bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20">
                    Featured
                  </span>
                )}

                <span className="absolute top-3 left-3 text-xs font-medium bg-card/80 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full border border-border">
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 md:hidden">
                  <ActionButton
                    href={project.live}
                    label="Live Demo"
                    icon={ExternalLink}
                    variant="primary"
                  />
                  <ActionButton
                    href={project.client}
                    label="Client"
                    icon={Code2}
                    variant="client"
                  />
                  <ActionButton
                    href={project.server}
                    label="Server"
                    icon={Server}
                    variant="server"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
