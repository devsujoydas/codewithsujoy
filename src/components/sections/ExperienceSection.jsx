import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import experienceData from "../../data/experience";

const ExperienceSection = () => {
  return (
    <SectionWrapper id="experience" aria-labelledby="experience-heading">
      <div className="text-center mb-16">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Experience
        </p>
        <h2 id="experience-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Professional <span className="text-primary-gradient">Journey</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {experienceData.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="mb-12 last:mb-0"
            style={{ willChange: "transform" }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 card-hover relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors" aria-hidden="true">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl mb-1 text-foreground group-hover:text-indigo-400 transition-colors duration-300">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-indigo-400 font-medium">
                      <Building2 size={16} aria-hidden="true" />
                      <span>{item.company}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 md:min-w-[160px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide">
                    <Calendar size={12} aria-hidden="true" />
                    {item.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={12} aria-hidden="true" />
                    {item.location}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pl-0 md:pl-16">
                {item.responsibilities.map((resp, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    style={{ willChange: "transform" }}
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" aria-hidden="true" />
                    <span>{resp}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
