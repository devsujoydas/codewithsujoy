import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "/avator.png";
import ParticleBackground from "../layout/ParticlesBackground";
import SocialLinks from "../layout/SocialLinks";

const HeroSection = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => ["Software Developer", "Web Developer", "Content Creator"],
    [],
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen w-full relative overflow-hidden bg-background"
      aria-label="Hero section introducing Sujoy Das"
    >
      <ParticleBackground aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-125 max-h-125
          rounded-full
          bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/20
          opacity-40 sm:opacity-30 md:opacity-20 
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[500px] max-h-[500px] 
          rounded-full 
          bg-gradient-to-r from-pink-500/25 via-indigo-500/20 to-purple-500/25
          opacity-40 sm:opacity-30 
          blur-[100px] sm:blur-[130px] md:blur-[150px] 
          animate-pulse delay-500"
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left relative"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ willChange: "transform" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-3xl">
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              aria-live="polite"
              aria-atomic="true"
              style={{ willChange: "transform" }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-0.5 ml-1 bg-foreground animate-pulse align-middle"
                style={{ height: "1em" }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-gradient drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ willChange: "transform" }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-foreground font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Sujoy Das
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ willChange: "transform" }}
            >
              Self-taught MERN Stack Developer skilled in React.js, Node.js,
              Express.js, and MongoDB. I build scalable, secure web applications
              with clean, efficient code and modern user experiences.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              style={{ willChange: "transform" }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-primary-foreground bg-primary-gradient shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                View My Work
              </a>
              <a
                href="https://drive.google.com/file/d/1qU_hF80gFOh0uGLnosPEWolUFa7fBvX7/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-lg font-medium text-foreground bg-card border border-border hover:bg-muted shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Download Resume
              </a>
            </motion.div>

            <SocialLinks />
          </div>
        </motion.div>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          aria-hidden="true"
          style={{ willChange: "transform" }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #6366f1, #14b8a6, #22c55e, #6366f1)",
            }}
          />
          <motion.img
            src={avatar}
            alt="Sujoy Das - MERN Stack Developer"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(45vw, 780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{ willChange: "transform" }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default HeroSection;