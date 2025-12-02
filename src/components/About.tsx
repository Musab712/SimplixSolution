import { useEffect, useRef, useState } from "react";
import { Target, Rocket, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every solution is crafted with meticulous attention to detail and tailored to your specific needs.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "We stay ahead of the curve, leveraging the latest AI technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Your success is our success. We work closely with you every step of the way.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Our solutions are designed to scale with your business, driving continuous improvement.",
  },
];

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
          <div className="text-center mb-10">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              About Simplix Solution
            </h2>
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Pioneering the future of intelligent automation
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At <span className="text-primary font-semibold">Simplix Solution</span>, we believe the future belongs to those who automate intelligently. We're not just building tools—we're engineering transformation that empowers businesses to reach new heights.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to bring innovation, scalability, and efficiency to businesses through cutting-edge AI automation. From intelligent voice agents that handle customer interactions with human-like precision to seamless workflow integrations that eliminate manual tasks, we turn complex systems into simple, powerful solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We partner with forward-thinking companies ready to embrace the automation revolution, helping them save time, reduce costs, and scale operations with confidence. Every solution we deliver is backed by years of expertise and a commitment to excellence.
              </p>
            </div>
            
            <div className={`space-y-6 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the global leader in AI automation, empowering businesses of all sizes to unlock their full potential through intelligent technology solutions.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Why Choose Us</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Proven track record with 500+ successful deployments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Custom solutions tailored to your unique needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>24/7 support and continuous optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={`bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
