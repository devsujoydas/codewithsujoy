import SectionWrapper from "../layout/SectionWrapper";

const AboutSection = () => {
  return (
    <SectionWrapper id="about" aria-labelledby="about-heading">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="reveal relative">
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden glass p-1">
            <div className="w-full h-full rounded-xl bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 flex items-center justify-center">
              <img
                src="/sujoy.png"
                className="h-full w-full rounded-xl"
                alt="Sujoy Das - MERN Stack Developer portrait"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-indigo-500/20 blur-2xl" aria-hidden="true" />
          <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" aria-hidden="true" />
        </div>

        <div>
          <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 id="about-heading" className="reveal font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Crafting Digital Experiences with{" "}
            <span className="text-primary-gradient">Passion</span>
          </h2>
          <p className="reveal text-muted-foreground leading-relaxed mb-4">
            I&apos;m a self-taught developer who learned through YouTube and free
            resources, building real-world projects without formal courses. My
            journey started with curiosity and grew into a deep passion for
            crafting beautiful, functional web applications.
          </p>
          <p className="reveal text-muted-foreground leading-relaxed mb-8">
            I&apos;m confident in the MERN stack — React.js, Node.js, Express,
            MongoDB — along with Tailwind CSS and Firebase. I love turning ideas
            into pixel-perfect, interactive experiences.
          </p>

          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { label: "Projects", value: "7+" },
              { label: "Experience", value: "3+ Years" },
              { label: "Technologies", value: "20+" },
              { label: "Certifications", value: "1+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-5 text-center card-hover"
              >
                <p className="font-display text-2xl font-bold text-indigo-400">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;