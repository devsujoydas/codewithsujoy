import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import educationData from "../../data/education";

const EducationSection = () => {
  return (
    <SectionWrapper id="education" aria-labelledby="education-heading">
      <div className="text-center mb-16">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Education
        </p>
        <h2 id="education-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Academic <span className="text-primary-gradient">Background</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {educationData.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="h-full"
            style={{ willChange: "transform" }}
          >
            <div className="glass rounded-2xl p-6 card-hover h-full flex flex-col relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors" aria-hidden="true">
                  <GraduationCap size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base md:text-lg leading-tight text-foreground group-hover:text-indigo-400 transition-colors duration-300">
                    {item.degree}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-foreground font-medium mb-1">{item.institution}</p>
              <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                <MapPin size={12} aria-hidden="true" />
                {item.location}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2">
                {item.period && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card text-xs text-muted-foreground border border-border">
                    <Calendar size={12} aria-hidden="true" />
                    {item.period}
                  </span>
                )}
                {item.gpa && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">
                    GPA: {item.gpa}
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default EducationSection;
