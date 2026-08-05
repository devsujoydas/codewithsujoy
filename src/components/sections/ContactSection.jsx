import { useState } from "react";
import SectionWrapper from "../layout/SectionWrapper";
import { Send, Mail, MapPin, Phone, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <SectionWrapper id="contact" aria-labelledby="contact-heading">
      <div className="text-center mb-16">
        <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Get In Touch
        </p>
        <h2 id="contact-heading" className="reveal font-display text-3xl md:text-4xl font-bold text-foreground">
          Let&apos;s Work <span className="text-primary-gradient">Together</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="reveal space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Let&apos;s connect!
          </p>
          {[
            { icon: Mail, label: "Email", value: "devsujoydas@gmail.com" },
            { icon: Phone, label: "Phone", value: "+880 1303 436299" },
            { icon: MapPin, label: "Location", value: "Tongi, Gazipur, Bangladesh" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass">
                <Icon size={20} className="text-indigo-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-medium text-sm text-foreground">{value}</p>
              </div>
            </div>
          ))}
          <a
            href="https://api.whatsapp.com/send/?phone=%2B8801303436299"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/20 text-success font-medium text-sm hover:bg-success/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
          </a>
        </div>

        <form onSubmit={handleSubmit} className="reveal space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300 text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300 text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Your Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300 resize-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary-gradient text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Send Message <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
