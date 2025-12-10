import { useEffect, useRef, useState } from "react";
import { Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const relativeOffset = scrollY - sectionTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setParallaxOffset(relativeOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-12 lg:py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-300 will-change-transform"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl transition-transform duration-300 will-change-transform"
        style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              We're Not Just Another Automation Company
            </h2>
            <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              We build lasting partnerships, not just deliver projects. Your success becomes our shared mission.
            </p>
          </div>

          {/* Main Content - Modern Layout */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Left Column - What Makes Us Different */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">What Makes Us Different</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  While others focus on delivering automation and moving on, we focus on <span className="text-primary font-semibold">building genuine relationships</span>. Every client becomes a long-term partner. We don't just implement solutions—we become an extension of your team.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-card border border-border/60 hover:border-primary/50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Trust Through Transparency</h4>
                  <p className="text-sm text-muted-foreground">
                    No hidden surprises. We communicate openly, share progress regularly, and involve you in every decision. Your trust is earned, not assumed.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border/60 hover:border-primary/50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Partnership, Not Vendorship</h4>
                  <p className="text-sm text-muted-foreground">
                    We're invested in your success. When you grow, we celebrate. When you face challenges, we're there. This is a partnership, not a transaction.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <p className="text-base text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Real talk:</span> Most automation companies deliver your project and disappear. We stick around. We check in. We optimize. We celebrate your wins. Because when you succeed, we've done our job right.
                </p>
              </div>
            </div>
            
            {/* Right Column - Our Promise & Values */}
            <div className={`space-y-6 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="p-6 rounded-xl bg-card border border-border/60">
                <h3 className="text-xl font-bold mb-4 text-foreground">Our Promise</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>We listen first, build second. Your needs drive our solutions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>No jargon, no fluff. Clear communication always.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>Your success metrics become our success metrics.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>We're here for the long haul, not just the launch.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>Clear ownership: one lead contact, transparent timelines, and no handoff lag.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>Quality baked in: staging, test cases, and rollback plans before production changes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold">→</span>
                    <span>Reliability after launch: monitoring, runbooks, and steady iteration to keep automations healthy.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
