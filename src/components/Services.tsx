import { useEffect, useRef, useState } from "react";
import { Mic, Workflow, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StaggerContainer from "./StaggerContainer";

const services = [
  {
    icon: Mic,
    title: "AI Voice & Support Agents",
    description:
      "Handle 80% of customer inquiries automatically. 24/7 support in 50+ languages, instant responses, seamless human handoff when needed.",
    useCases: "Customer support | Global SaaS | E-commerce | Service scheduling",
    outcomes: [
      "80% of tickets resolved automatically",
      "2-second response time, 24/7",
      "70% cost reduction",
    ],
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    description:
      "Automate end-to-end processes. Zero manual errors, real-time visibility, complete audit trails. Your workflows run flawlessly 24/7.",
    useCases: "Onboarding | Invoicing | Reporting | Data sync",
    outcomes: [
      "100% error elimination",
      "10x faster execution",
      "Real-time monitoring dashboard",
    ],
  },
  {
    icon: TrendingUp,
    title: "Sales & Lead Automation",
    description:
      "Never miss a lead. Instant qualification, automated CRM updates, personalized follow-ups, and meeting scheduling — so your team can focus on closing.",
    useCases: "Lead qualification | CRM automation | Meeting scheduling | Pipeline management",
    outcomes: [
      "100% leads contacted in 60 seconds",
      "3x higher conversion rates",
      "5+ hours saved per rep weekly",
    ],
  },
  {
    icon: FileText,
    title: "Data + Document Intelligence",
    description:
      "Process thousands of documents in minutes. 99.9% accuracy, automatic extraction, compliance-ready audit trails, instant BI integration.",
    useCases: "Invoices | Contracts | Forms | Reports | Compliance docs",
    outcomes: [
      "1,000+ docs/hour processed",
      "90% time reduction",
      "99.9% accuracy rate",
    ],
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

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          staggerDelay={100}
          initialDelay={300}
          threshold={0.1}
        >
          {services.map((service) => (
            <Card
              key={service.title}
              className="service-card bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group cursor-pointer h-full"
            >
              <CardContent className="p-8 space-y-6 h-full flex flex-col">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    {service.useCases && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-foreground mb-2">Use Cases:</p>
                        <p className="text-sm text-muted-foreground">{service.useCases}</p>
                      </div>
                    )}
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-foreground mb-3">Outcomes:</p>
                      <ul className="space-y-2">
                        {service.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
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
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
