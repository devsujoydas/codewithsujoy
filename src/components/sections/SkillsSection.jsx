import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../layout/SectionWrapper";
import skillCategories from "../../data/skills";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const animations = [];

    const cards = el.querySelectorAll(".skill-card");
    cards.forEach((card) => {
      const anim = gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
      animations.push(anim);
    });

    const headers = el.querySelectorAll(".cat-header");
    headers.forEach((header) => {
      const anim = gsap.fromTo(
        header,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      animations.push(anim);
    });

    ScrollTrigger.refresh();

    return () => {
      animations.forEach((anim) => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
    };
  }, []);

  return (
    <SectionWrapper id="skills" aria-labelledby="skills-heading">
      <div className="text-center mb-16">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          My Skills
        </p>
        <h2 id="skills-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Technologies I <span className="text-primary-gradient">Work With</span>
        </h2>
      </div>

      <div ref={sectionRef} className="space-y-14">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="cat-header font-display text-xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <span className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              {category.title}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.skills.map(({ name, image }) => (
                <div
                  key={name}
                  className="skill-card glass rounded-xl p-5 flex flex-col items-center gap-3 group cursor-default transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(99,102,241,0.3)] hover:-translate-y-1 hover:border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <div className="p-3 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors duration-300">
                    <img
                      src={image}
                      alt={name}
                      className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-medium text-center text-foreground group-hover:text-indigo-400 transition-colors duration-300">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
