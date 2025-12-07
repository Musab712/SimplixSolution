import { useEffect, useRef, useState } from "react";
import { Mic, Workflow, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Mic,
    title: "AI Voice & Support Agents",
    description:
      "24/7 automated customer support in 50+ languages with instant responses and seamless human handoff.",
    useCases: "Customer support | E-commerce | Service scheduling",
    outcomes: [
      "80% tickets resolved automatically",
      "70% cost reduction",
    ],
    animation: "slideFromLeft",
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    description:
      "Automate end-to-end processes with zero errors, real-time visibility, and complete audit trails.",
    useCases: "Onboarding | Invoicing | Data sync",
    outcomes: [
      "100% error elimination",
      "10x faster execution",
    ],
    animation: "slideFromRight",
  },
  {
    icon: TrendingUp,
    title: "Sales & Lead Automation",
    description:
      "Never miss a lead with instant qualification, automated CRM updates, and personalised follow-ups.",
    useCases: "Lead qualification | CRM automation | Meeting scheduling",
    outcomes: [
      "100% leads contacted in 60 seconds",
      "3x higher conversion rates",
    ],
    animation: "fadeScale",
  },
  {
    icon: FileText,
    title: "Data + Document Intelligence",
    description:
      "Process thousands of documents in minutes with 99.9% accuracy and automatic extraction.",
    useCases: "Invoices | Contracts | Forms | Reports",
    outcomes: [
      "1,000+ docs/hour processed",
      "99.9% accuracy rate",
    ],
    animation: "rotateFade",
  },
];

const Services = () => {
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
    <section id="services" className="py-12 lg:py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Enterprise Automation Solutions
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Transform repetitive work into intelligent automation. Reduce costs by 60%, free your team for strategic work, and scale effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const getAnimationStyle = (animationType: string, isVisible: boolean) => {
              const baseDelay = 300 + index * 150;
              const duration = 0.8;
              
              switch (animationType) {
                case "slideFromLeft":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0) translateY(0)" : "translateX(-100px) translateY(20px)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
                  };
                case "slideFromRight":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0) translateY(0)" : "translateX(100px) translateY(20px)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
                  };
                case "fadeScale":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(30px)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
                  };
                case "rotateFade":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "rotate(0deg) translateY(0)" : "rotate(-5deg) translateY(30px)",
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
              <div
                key={service.title}
                style={getAnimationStyle(service.animation, isVisible)}
              >
                <Card className="service-card bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group cursor-pointer h-full hover:scale-[1.02]">
                  <CardContent className="p-6 space-y-4 h-full flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {service.description}
                        </p>
                        {service.useCases && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-foreground mb-1">Use Cases:</p>
                            <p className="text-xs text-muted-foreground">{service.useCases}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-2">Outcomes:</p>
                          <ul className="space-y-1.5">
                            {service.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="text-primary font-bold mt-0.5">✔</span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
