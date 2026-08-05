import { Heart } from "lucide-react";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <span className="font-display text-2xl font-bold text-primary-gradient">
              SD
            </span>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Self-taught MERN Stack Developer passionate about building
              scalable, secure web applications with modern technologies.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4">
              Quick Links
            </h4>
            <nav aria-label="Footer quick links">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 md:gap-x-6">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4">
              Connect
            </h4>
            <SocialLinks />
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sujoy Das. All rights reserved.
          </span>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made by Sujoy Das
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
