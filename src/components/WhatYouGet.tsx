import { useEffect, useRef, useState } from "react";
import { Clock, DollarSign, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const whatYouGet = [
  {
    icon: Clock,
    title: "Time Savings",
    description: "Save 20+ hours weekly",
    detail: "Automate repetitive tasks and free your team for strategic work",
    animation: "flip3D",
    illustration: "clock",
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description: "Reduce costs by 60%",
    detail: "Eliminate manual errors and optimize resource allocation",
    animation: "morph",
    illustration: "money",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "Scale without limits",
    detail: "Grow your operations without proportional cost increases",
    animation: "slideRotate",
    illustration: "growth",
  },
  {
    icon: Shield,
    title: "Zero Errors",
    description: "99.9% accuracy rate",
    detail: "Automated processes eliminate human error completely",
    animation: "pulseGlow",
    illustration: "shield",
  },
  {
    icon: Zap,
    title: "Instant Response",
    description: "24/7 availability",
    detail: "AI agents handle inquiries instantly, any time of day",
    animation: "bounce",
    illustration: "lightning",
  },
  {
    icon: BarChart3,
    title: "Real-time Insights",
    description: "Live analytics dashboard",
    detail: "Monitor performance and make data-driven decisions instantly",
    animation: "wave",
    illustration: "chart",
  },
];

// SVG Illustrations Component
const AnimatedIllustration = ({ type, className }: { type: string; className?: string }) => {
  const primaryColor = "hsl(var(--primary))";
  const accentColor = "hsl(var(--accent))";
  
  switch (type) {
    case "clock":
      return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
            <radialGradient id="clockGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="55" fill="url(#clockGlow)" opacity="0.5">
            <animate attributeName="r" values="55;60;55" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="48" fill="none" stroke="url(#clockGrad)" strokeWidth="3" opacity="0.4" />
          <circle cx="60" cy="60" r="42" fill="none" stroke={primaryColor} strokeWidth="2" opacity="0.3" />
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1="60"
              y1={i % 3 === 0 ? "12" : "15"}
              x2="60"
              y2={i % 3 === 0 ? "18" : "20"}
              stroke={primaryColor}
              strokeWidth={i % 3 === 0 ? "2.5" : "1.5"}
              opacity="0.6"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
          <line x1="60" y1="60" x2="60" y2="40" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="12s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="60" x2="60" y2="25" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="1s" repeatCount="indefinite" />
          </line>
          <circle cx="60" cy="60" r="5" fill={primaryColor}>
            <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="3" fill={accentColor} />
        </svg>
      );
    
    case "money":
      return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          <path d="M60 20 L60 100" stroke="url(#moneyGrad)" strokeWidth="5" strokeLinecap="round" opacity="0.9">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M45 35 Q45 25 60 25 Q75 25 75 35 Q75 45 60 45 Q45 45 45 55" stroke={primaryColor} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M45 65 Q45 55 60 55 Q75 55 75 65 Q75 75 60 75 Q45 75 45 85" stroke={accentColor} strokeWidth="4.5" fill="none" strokeLinecap="round">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </path>
          {[
            { cx: 25, cy: 25, r: 10, delay: 0 },
            { cx: 95, cy: 30, r: 8, delay: 0.5 },
            { cx: 30, cy: 95, r: 9, delay: 1 },
            { cx: 95, cy: 95, r: 7, delay: 1.5 },
          ].map((coin, i) => (
            <g key={i}>
              <circle cx={coin.cx} cy={coin.cy} r={coin.r} fill="none" stroke={primaryColor} strokeWidth="2" opacity="0.5">
                <animateTransform attributeName="transform" type="translate" values="0,0; 3,3; 0,0" dur="3s" begin={`${coin.delay}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={coin.cx} cy={coin.cy} r={coin.r - 3} fill="none" stroke={accentColor} strokeWidth="1" opacity="0.4">
                <animateTransform attributeName="transform" type="translate" values="0,0; -2,-2; 0,0" dur="2.5s" begin={`${coin.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          <text x="85" y="50" fontSize="14" fill={accentColor} opacity="0.6" fontWeight="bold">%</text>
        </svg>
      );
    
    case "growth":
      return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="growthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          <g opacity="0.2">
            {[20, 40, 60, 80, 100].map((x) => (
              <line key={`v-${x}`} x1={x} y1="10" x2={x} y2="110" stroke={primaryColor} strokeWidth="1" />
            ))}
            {[20, 40, 60, 80, 100].map((y) => (
              <line key={`h-${y}`} x1="10" y1={y} x2="110" y2={y} stroke={primaryColor} strokeWidth="1" />
            ))}
          </g>
          <path d="M20 100 L40 80 L60 60 L80 40 L100 20" stroke="url(#growthGrad)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2s" repeatCount="indefinite" />
          </path>
          {[
            { x: 40, y: 80 },
            { x: 60, y: 60 },
            { x: 80, y: 40 },
            { x: 100, y: 20 },
          ].map((point, i) => (
            <g key={i}>
              <circle cx={point.x} cy={point.y} r="7" fill={primaryColor} opacity="0.3">
                <animate attributeName="r" values="7;10;7" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={point.x} cy={point.y} r="5" fill={primaryColor}>
                <animate attributeName="r" values="5;7;5" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          <path d="M95 25 L100 20 L105 25 M100 20 L100 10" stroke={accentColor} strokeWidth="4" fill="none" strokeLinecap="round">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="2s" repeatCount="indefinite" />
          </path>
          <text x="15" y="105" fontSize="10" fill={primaryColor} opacity="0.5">0</text>
          <text x="105" y="15" fontSize="10" fill={accentColor} opacity="0.7">100%</text>
        </svg>
      );
    
    case "shield":
      return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          <path d="M60 20 L85 30 L85 60 Q85 80 60 95 Q35 80 35 60 L35 30 Z" fill="none" stroke="url(#shieldGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M50 60 L55 65 L70 50" stroke={primaryColor} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          </path>
          <circle cx="60" cy="60" r="25" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.3">
            <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    
    case "lightning":
      return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          <path d="M60 20 L45 50 L55 50 L50 100 L75 70 L65 70 L80 40 Z" fill="url(#lightningGrad)" opacity="0.8">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
          </path>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="60" cy="60" r={20 + i * 15} fill="none" stroke={accentColor} strokeWidth="2" opacity={0.3 - i * 0.1}>
              <animate attributeName="r" values={`${20 + i * 15};${30 + i * 15};${20 + i * 15}`} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values={`${0.3 - i * 0.1};${0.5 - i * 0.1};${0.3 - i * 0.1}`} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );
    
    case "chart":
      return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="chartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="growthGradChart" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          <g opacity="0.15">
            {[20, 40, 60, 80, 100].map((x) => (
              <line key={`v-${x}`} x1={x} y1="15" x2={x} y2="105" stroke={primaryColor} strokeWidth="1" />
            ))}
            {[30, 50, 70, 90].map((y) => (
              <line key={`h-${y}`} x1="15" y1={y} x2="105" y2={y} stroke={primaryColor} strokeWidth="1" />
            ))}
          </g>
          {[20, 35, 50, 65, 80, 95].map((x, i) => {
            const height = 30 + i * 8;
            return (
              <g key={i}>
                <rect
                  x={x - 6}
                  y={100 - height}
                  width="12"
                  height={height}
                  fill="url(#chartGrad)"
                  rx="3"
                >
                  <animate attributeName="height" values={`0;${height};${height}`} dur="1.5s" begin={`${i * 0.2}s`} fill="freeze" />
                  <animate attributeName="y" values={`100;${100 - height};${100 - height}`} dur="1.5s" begin={`${i * 0.2}s`} fill="freeze" />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin={`${i * 0.2 + 1.5}s`} repeatCount="indefinite" />
                </rect>
                <rect
                  x={x - 4}
                  y={100 - height}
                  width="8"
                  height="8"
                  fill={accentColor}
                  opacity="0.6"
                  rx="2"
                >
                  <animate attributeName="y" values={`100;${100 - height};${100 - height}`} dur="1.5s" begin={`${i * 0.2}s`} fill="freeze" />
                </rect>
              </g>
            );
          })}
          <path d="M25 90 L45 75 L65 60 L85 45 L95 35" stroke="url(#growthGradChart)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200">
            <animate attributeName="stroke-dashoffset" values="200;0" dur="2s" begin="1s" fill="freeze" />
          </path>
          {[25, 45, 65, 85, 95].map((x, i) => {
            const y = 90 - i * 11;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill={accentColor} opacity="0.3">
                  <animate attributeName="r" values="6;8;6" dur="1.5s" begin={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r="4" fill={accentColor}>
                  <animate attributeName="r" values="4;6;4" dur="1.5s" begin={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </svg>
      );
    
    default:
      return null;
  }
};

const WhatYouGet = () => {
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
    <section id="benefits" className="py-12 lg:py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-muted/40 to-background/80" />
      <div className="absolute inset-x-0 top-1/3 h-56 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            What You Get
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            Real benefits that transform how you work and grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {whatYouGet.map((item, index) => {
            const getAnimationStyle = (animationType: string, isVisible: boolean, index: number) => {
              const baseDelay = 300 + index * 100;
              const duration = 0.8;
              
              switch (animationType) {
                case "flip3D":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible 
                      ? "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)" 
                      : "perspective(1000px) rotateY(-90deg) rotateX(20deg) translateZ(-100px)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
                  };
                case "morph":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible 
                      ? "scale(1) rotate(0deg)" 
                      : "scale(0.3) rotate(180deg)",
                    borderRadius: isVisible ? "12px" : "50%",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, border-radius ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
                  };
                case "slideRotate":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible 
                      ? "translateX(0) translateY(0) rotate(0deg)" 
                      : "translateX(-100px) translateY(50px) rotate(-45deg)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms`,
                  };
                case "pulseGlow":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${baseDelay}ms`,
                  };
                case "bounce":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(200px)",
                    transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay}ms, transform ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${baseDelay}ms`,
                  };
                case "wave":
                  return {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible 
                      ? "translateX(0) translateY(0) rotate(0deg)" 
                      : "translateX(100px) translateY(50px) rotate(45deg)",
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
                key={item.title}
                style={getAnimationStyle(item.animation, isVisible, index)}
                className="relative group"
              >
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500"
                  style={{
                    backgroundSize: '200% 200%',
                    animation: isVisible ? `gradientShift 3s ease infinite ${index * 0.2}s, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite ${index * 0.2}s` : 'none',
                  }}
                />

                <Card className="bg-card border-2 border-border/60 hover:border-primary/50 transition-all duration-500 h-full overflow-hidden relative group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="2" fill="hsl(var(--primary))" opacity="0.3">
                            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
                          </circle>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                      <path d="M0 100 Q50 50 100 100 T200 100" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.2">
                        <animate attributeName="d" values="M0 100 Q50 50 100 100 T200 100;M0 100 Q50 150 100 100 T200 100;M0 100 Q50 50 100 100 T200 100" dur="4s" repeatCount="indefinite" />
                      </path>
                    </svg>
                  </div>

                  <CardContent className="p-4 space-y-3 h-full flex flex-col relative z-10">
                    <div className="relative h-24 flex items-center justify-center mb-2">
                      <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                      <div 
                        className="relative group-hover:scale-110 transition-transform duration-500"
                        style={{
                          animation: isVisible ? `float 3s ease-in-out infinite ${index * 0.3}s` : 'none',
                        }}
                      >
                        <AnimatedIllustration type={item.illustration} className="w-20 h-20" />
                      </div>
                    </div>

                    <div className="text-center space-y-1.5 flex-grow">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {item.title}
                      </h3>
                      <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-md shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                        {item.description}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                        {item.detail}
                      </p>
                    </div>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-primary"
                          style={{
                            animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`,
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-8px) rotate(2deg) scale(1.05); }
          50% { transform: translateY(-12px) rotate(5deg) scale(1.1); }
          75% { transform: translateY(-8px) rotate(-2deg) scale(1.05); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default WhatYouGet;

