import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({ id, children, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".reveal"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      }
    );
  }, []);

  return (
    <section ref={ref} id={id} className={`section-padding max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
