import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Workflow, Wrench, BarChart2, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    shortDesc: "Find automation opportunities",
    highlights: ["Workflow audit", "Bottleneck analysis", "Impact assessment"],
    color: "from-blue-800 to-green-200",
    animation: "slideFromLeft",
  },
  {
    icon: Workflow,
    title: "Design",
    shortDesc: "Map your ideal flows",
    highlights: ["Flow mapping", "Team validation", "Blueprint creation"],
    color: "from-blue-800 to-green-200",
    animation: "slideFromBottom",
  },
  {
    icon: Wrench,
    title: "Build",
    shortDesc: "Implement & integrate",
    highlights: ["Live integration", "Testing & QA", "Technical setup"],
    color: "from-blue-800 to-green-200",
    animation: "slideFromRight",
  },
  {
    icon: BarChart2,
    title: "Optimize",
    shortDesc: "Monitor & refine",
    highlights: ["Performance tracking", "Continuous improvement", "Scale up"],
    color: "from-blue-800 to-green-200",
    animation: "fadeScale",
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

  const getAnimationStyle = (animationType: string, isVisible: boolean, index: number) => {
    const baseDelay = 200 + index * 150;
    const duration = 0.8;
    
    switch (animationType) {
      case "slideFromLeft":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0) translateY(0) scale(1)" : "translateX(-80px) translateY(20px) scale(0.9)",
          transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
        };
      case "slideFromBottom":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
          transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
        };
      case "slideFromRight":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0) translateY(0) scale(1)" : "translateX(80px) translateY(20px) scale(0.9)",
          transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
        };
      case "fadeScale":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)",
          transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
        };
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
        };
    }
  };

  return (
    <section
      id="process"
      className="py-12 lg:py-20 bg-background relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-muted/40 to-background/80" />
      <div className="absolute inset-x-0 top-1/3 h-56 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            How We Work
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            From discovery to optimization—a streamlined path to automation success
          </p>
        </div>

        {/* Process Steps with Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" 
               style={{ 
                 opacity: isVisible ? 1 : 0,
                 transition: `opacity 1s ease-in-out ${600}ms`
               }} 
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                style={getAnimationStyle(step.animation, isVisible, index)}
                className="relative"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-background`}>
                    {index + 1}
                  </div>
                </div>

                {/* Arrow between steps (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-2 z-10"
                       style={{
                         opacity: isVisible ? 1 : 0,
                         transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                         transition: `opacity 0.6s ease-in-out ${600 + index * 150}ms, transform 0.6s ease-in-out ${600 + index * 150}ms`
                       }}
                  >
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}

                <Card className="bg-card border-2 border-border/60 hover:border-primary/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group cursor-pointer h-full hover:-translate-y-2">
                  <CardContent className="p-6 space-y-4 h-full flex flex-col">
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Step Number (Mobile) */}
                    <div className="md:hidden flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {index + 1}
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-primary/80 mb-3">
                      {step.shortDesc}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 flex-grow">
                      {step.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;


