import { Linkedin, Instagram, MapPin, Facebook } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo className="text-3xl" />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Transforming businesses through intelligent automation and AI solutions. We help companies unlock their full potential with cutting-edge technology.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/simplixsolution/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/share/1BA6U3rZ9Q/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/simplixsolution_/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "Solutions", href: "#services" },
                { label: "Benefits", href: "#benefits" },
                { label: "Results", href: "#results" },
                { label: "Process", href: "#process" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="mailto:info@simplixsolution.com"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                info@simplixsolution.com
              </a>
              <a
                href="tel:+61452231101"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                +61 452231101
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Perth, Western Australia, Australia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} Simplix Solution. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            Built with innovation and powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
