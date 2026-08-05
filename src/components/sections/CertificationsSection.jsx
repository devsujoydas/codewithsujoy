import { motion } from "framer-motion";
import { ExternalLink, Award, MapPin, Calendar } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";
import certificationsData from "../../data/certifications";

const CertificationsSection = () => {
  return (
    <SectionWrapper id="certifications" aria-labelledby="certifications-heading">
      <div className="text-center mb-16">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Certifications
        </p>
        <h2 id="certifications-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Credentials & <span className="text-primary-gradient">Achievements</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        {certificationsData.map((cert, i) => (
          <motion.article
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{ willChange: "transform" }}
          >
            <div className="glass rounded-2xl overflow-hidden card-hover">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 xl:w-1/2 relative overflow-hidden bg-card flex items-center justify-center min-h-[240px]">
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate issued by ${cert.issuer}`}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
                </div>

                <div className="p-6 md:p-8 lg:w-3/5 xl:w-1/2 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400" aria-hidden="true">
                      <Award size={20} />
                    </div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-indigo-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                  </div>

                  <p className="text-sm text-indigo-400 font-medium mb-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <MapPin size={12} aria-hidden="true" />
                    {cert.location}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                    <Calendar size={12} aria-hidden="true" />
                    Issued: {cert.issuedDate}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {cert.description}
                  </p>

                  <a
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring w-fit"
                  >
                    View Certificate <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default CertificationsSection;
