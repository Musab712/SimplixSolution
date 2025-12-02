import { useEffect, useRef, useState } from "react";

const FitSection = () => {
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
      className="py-16 lg:py-20 bg-background relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`max-w-4xl mx-auto rounded-3xl border border-border bg-card px-6 py-8 sm:px-10 sm:py-10 shadow-sm transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
            We&apos;re a Fit If&hellip;
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            We work best with teams who are already growing and need systems—not more manual work.
          </p>
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>
                You&apos;re doing steady revenue and are bottlenecked by manual support, lead handling,
                or internal operations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>
                Your team is stuck answering repeat questions, updating multiple tools, or moving
                data around by hand.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>
                You want reliable systems and clear processes—not just more headcount and ad‑hoc
                fixes.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FitSection;


