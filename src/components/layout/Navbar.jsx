import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import navLinks from "../../data/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      const sections = navLinks.filter((l) => !l.external).map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) {
        navRef.current.style.transform = "translateY(0)";
        navRef.current.style.opacity = "1";
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (link) => {
    setIsOpen(false);
    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
      return;
    }
    const el = document.querySelector(link.href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display text-2xl font-bold text-primary-gradient">
            SD
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link)}
                className={`text-sm font-medium transition-colors cursor-pointer duration-300 relative py-1 ${
                  link.external
                    ? "text-primary hover:text-primary/80"
                    : activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {link.external && <span className="ml-1 text-[10px] align-super">↗</span>}
                {!link.external && activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
              }}
              className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              <Sun size={18} className="dark:hidden" />
              <Moon size={18} className="hidden dark:block" />
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
              }}
              className="p-2 rounded-full bg-card border border-border"
              aria-label="Toggle theme"
            >
              <Sun size={16} className="dark:hidden" />
              <Moon size={16} className="hidden dark:block" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground" aria-label="Toggle menu" aria-expanded={isOpen}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-background/90 backdrop-blur-md border-t border-border px-4 pb-6 pt-2">
            <nav aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link)}
                  className={`block w-full text-left py-3 text-sm font-medium transition-colors relative ${
                    link.external
                      ? "text-primary"
                      : activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {link.external && <span className="ml-1 text-[10px]">↗</span>}
                  {!link.external && activeSection === link.href.slice(1) && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
