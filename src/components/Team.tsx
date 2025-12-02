import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Marcus Chen",
    role: "AI Engineer & Co-Founder",
    bio: "Former ML engineer at Google with 10+ years of experience in building scalable AI systems. Marcus specializes in natural language processing, voice automation, and machine learning infrastructure. He holds a Ph.D. in Computer Science from Stanford and has published over 50 research papers in top-tier AI conferences.",
    image: teamMember1,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sarah Martinez",
    role: "Automation Strategist & Co-Founder",
    bio: "Expert in process optimization and workflow design with a proven track record of transforming Fortune 500 operations. Sarah combines deep business acumen with technical expertise to create automation solutions that deliver measurable ROI. Previously led automation initiatives at Microsoft and Amazon.",
    image: teamMember2,
    linkedin: "#",
    twitter: "#",
  },
];

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="team" className="py-20 lg:py-32 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-block mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Meet The Experts</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Our Team
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            The brilliant minds behind your automation transformation. We combine deep technical expertise with business acumen to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className={`bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group overflow-hidden ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-[4/3] group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-8 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-border">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 rounded-lg bg-card/50 border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group/link"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-10 h-10 rounded-lg bg-card/50 border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group/link"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
