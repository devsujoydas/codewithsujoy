import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.to({}, { duration: 1.8 });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-container">
      <div className="text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-4">
          SD
        </h2>
        <span ref={textRef} className="font-display text-2xl text-muted-foreground">
          {count}%
        </span>
        <div className="mt-4 w-48 h-1 rounded-full bg-muted mx-auto overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;