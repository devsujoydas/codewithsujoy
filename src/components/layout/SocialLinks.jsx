import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

const socials = [
  { Icon: FaGithub, href: "https://github.com/devsujoydas", label: "GitHub" },
  {
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/devsujoydas/",
    label: "LinkedIn",
  },
  {
    Icon: FaWhatsapp,
    href: "https://api.whatsapp.com/send/?phone=%2B8801303436299",
    label: "WhatsApp",
  },
  {
    Icon: FaFacebook,
    href: "https://www.facebook.com/devsujoydas",
    label: "Facebook",
  },
  {
    Icon: FaInstagram,
    href: "https://www.instagram.com/devsujoydas",
    label: "Instagram",
  },
  {
    Icon: FaYoutube,
    href: "https://www.youtube.com/@devsujoydas",
    label: "YouTube",
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0px hsl(var(--primary) / 0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.9)) drop-shadow(0 0 18px hsl(var(--accent) / 0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const SocialLinks = () => {
  return (
    <div>
      <motion.div
        className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        {socials.map(({ Icon, label, href }) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-foreground"
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialLinks;
