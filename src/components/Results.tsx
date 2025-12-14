import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const stats = [
  {
    label: "Automations deployed",
    value: "500+",
    description: "Automations delivered across support, sales, and operations use cases.",
  },
  {
    label: "Faster lead response",
    value: "2.3x",
    description: "Speed-to-lead gains with automated qualification and routing.",
  },
  {
    label: "Ticket deflection",
    value: "38%",
    description: "Repetitive inquiries handled by AI agents; humans focus on edge cases.",
  },
];

const testimonials = [
  {
    quote:
      "They mapped our workflows, automated the repetitive steps, and freed our team to focus on higher-value work.",
    name: "Head of Operations",
    company: "Mid-market B2B SaaS",
  },
  {
    quote:
      "We respond to leads much faster now. Routing and qualification are automated, so reps get only the right conversations.",
    name: "VP Sales",
    company: "Online Services",
  },
  {
    quote:
      "Support volume dropped for repetitive questions while response quality went up. The handoff to humans is seamless.",
    name: "Head of Support",
    company: "Enterprise SaaS",
  },
];

const tools = ["HubSpot", "Salesforce", "Intercom", "Slack", "Notion", "Zendesk"];

const Results = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const automationCount = useAnimatedCounter({
    target: 500,
    duration: 2500,
    startDelay: 300, // Match the delay of the stats section
    enabled: isVisible,
    precision: 0,
  });
  const leadResponseCount = useAnimatedCounter({
    target: 2.3,
    duration: 2500,
    startDelay: 300,
    enabled: isVisible,
    precision: 1,
  });
  const ticketDeflectionCount = useAnimatedCounter({
    target: 38,
    duration: 2500,
    startDelay: 300,
    enabled: isVisible,
    precision: 0,
  });

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
      id="results"
      className="py-12 lg:py-20 relative overflow-hidden border-y border-border/40"
      style={{ backgroundColor: '#F8F9FA' }}
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      <div className="absolute inset-x-0 top-1/4 h-64 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            Automation Results Clients See
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            Metrics from projects delivered by our team across support, sales, and ops.
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tabular-nums">
                {index === 0
                  ? `${automationCount}+`
                  : index === 1
                    ? `${leadResponseCount.toFixed(1)}x`
                    : index === 2
                      ? `${ticketDeflectionCount}%`
                      : stat.value}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, index) => (
            <Card
              key={t.name + index}
              className={`bg-card border-2 border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-border/60 text-sm">
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-muted-foreground/80">{t.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Works With strip */}
        <div
          className={`border border-border/50 rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <p className="text-sm font-medium text-muted-foreground mb-1 md:mb-0">
            We specialize in SaaS and online service businesses with complex, repetitive workflows.
            Works with:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full bg-card/70 border border-border text-xs font-medium text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;


