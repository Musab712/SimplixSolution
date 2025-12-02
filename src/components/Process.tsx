import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Workflow, Wrench, BarChart2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discover",
    description:
      "We audit your current workflows, tools, and bottlenecks to identify high-impact automation opportunities.",
  },
  {
    icon: Workflow,
    title: "2. Design",
    description:
      "We map out your ideal end-to-end flows and AI agents, then validate them with your team before we build.",
  },
  {
    icon: Wrench,
    title: "3. Build & Integrate",
    description:
      "We implement, integrate, and test your automations with your live stack—handling all the technical heavy lifting.",
  },
  {
    icon: BarChart2,
    title: "4. Optimize",
    description:
      "We monitor performance, refine flows, and add new automations as your business evolves.",
  },
];

const Process = () => {
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
    <section
      id="process"
      className="py-12 lg:py-20 bg-background relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-muted/40 to-background/80" />
      <div className="absolute inset-x-0 top-1/3 h-56 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            Process
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            A simple, collaborative path from messy manual work to reliable, AI-powered systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className={`bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary transition-all duration-300">
                  <step.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;


