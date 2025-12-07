import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import ParticleNetwork from "./ParticleNetwork";
import MagneticButton from "./MagneticButton";
import StaggeredText from "./StaggeredText";
import TypingText from "./TypingText";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = (action?: 'call' | 'demo') => {
    const element = document.querySelector("#contact");
    if (element) {
      // Set hash with action parameter to trigger animations
      if (action === 'call') {
        window.location.hash = 'contact?action=call';
      } else if (action === 'demo') {
        window.location.hash = 'contact?action=demo';
      } else {
        window.location.hash = 'contact';
      }
      element.scrollIntoView({ behavior: "smooth" });
      // Clear hash after animation completes
      setTimeout(() => {
        window.history.replaceState(null, '', window.location.pathname);
      }, 6000);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Subtle Mesh Gradient - Soft blues, purples, greys */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.12) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(107, 114, 128, 0.08) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(99, 102, 241, 0.05) 0px, transparent 50%)
            `,
            backgroundSize: '200% 200%',
            animation: 'mesh-gradient 20s ease infinite'
          }}
        />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 30s linear infinite'
          }}
        />

        {/* Subtle accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Particle Network - Neural Network Mesh */}
      <div className="absolute inset-0 z-0">
        <ParticleNetwork
          particleCount={window.innerWidth < 768 ? 30 : 50}
          connectionDistance={150}
          particleSpeed={0.5}
          particleOpacity={0.3}
          lineOpacity={0.15}
        />
      </div>

      {/* AI Neural Pathways & Robotic Enhancement Layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden will-change-transform">
        {/* Neural Pathways & AI Nodes - SVG Layer */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Soft blue glow filter */}
              <filter id="neuralGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                </feMerge>
              </filter>

              {/* Blue gradient for neural pathways */}
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1A73FF" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#1A73FF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1A73FF" stopOpacity="0.12" />
              </linearGradient>

              {/* Gradient for AI nodes */}
              <radialGradient id="nodeGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#1A73FF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1A73FF" stopOpacity="0.05" />
              </radialGradient>
            </defs>

            {/* Neural Pathway 1 - Top Left Diagonal */}
            <g className="neural-pathway-1" opacity="0.7">
              {/* Curved pathway */}
              <path
                d="M 100,150 Q 300,100 500,200 T 700,250"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="2"
                opacity="0.6"
                filter="url(#neuralGlow)"
              />
              <path
                d="M 150,200 Q 350,150 550,250 T 750,300"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="1.5"
                opacity="0.5"
                filter="url(#neuralGlow)"
              />

              {/* AI Nodes along pathway */}
              <circle cx="100" cy="150" r="8" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.8" />
              <circle cx="300" cy="120" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
              <circle cx="500" cy="200" r="7" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.75" />
              <circle cx="700" cy="250" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
            </g>

            {/* Neural Pathway 2 - Top Right Curved */}
            <g className="neural-pathway-2" opacity="0.65">
              <path
                d="M 1400,180 Q 1600,220 1750,280 T 1820,350"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="2"
                opacity="0.6"
                filter="url(#neuralGlow)"
              />
              <path
                d="M 1450,200 Q 1650,240 1800,300"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="1.5"
                opacity="0.5"
                filter="url(#neuralGlow)"
              />

              {/* AI Nodes */}
              <circle cx="1400" cy="180" r="7" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.75" />
              <circle cx="1600" cy="220" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
              <circle cx="1750" cy="280" r="8" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.8" />
              <circle cx="1820" cy="350" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
            </g>

            {/* Neural Pathway 3 - Bottom Left Curved */}
            <g className="neural-pathway-3" opacity="0.6">
              <path
                d="M 150,850 Q 350,900 550,950 T 750,920"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="2"
                opacity="0.6"
                filter="url(#neuralGlow)"
              />
              <path
                d="M 200,880 Q 400,930 600,980"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="1.5"
                opacity="0.5"
                filter="url(#neuralGlow)"
              />

              {/* AI Nodes */}
              <circle cx="150" cy="850" r="7" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.75" />
              <circle cx="350" cy="900" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
              <circle cx="550" cy="950" r="8" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.8" />
              <circle cx="750" cy="920" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
            </g>

            {/* Neural Pathway 4 - Bottom Right Diagonal */}
            <g className="neural-pathway-4" opacity="0.65">
              <path
                d="M 1200,880 Q 1400,920 1600,950 T 1800,900"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="2"
                opacity="0.6"
                filter="url(#neuralGlow)"
              />
              <path
                d="M 1250,900 Q 1450,940 1650,970"
                fill="none"
                stroke="url(#neuralGradient)"
                strokeWidth="1.5"
                opacity="0.5"
                filter="url(#neuralGlow)"
              />

              {/* AI Nodes */}
              <circle cx="1200" cy="880" r="7" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.75" />
              <circle cx="1400" cy="920" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
              <circle cx="1600" cy="950" r="8" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.8" />
              <circle cx="1800" cy="900" r="6" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.7" />
            </g>

            {/* Additional scattered AI nodes */}
            <circle cx="400" cy="400" r="5" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.6" />
            <circle cx="1500" cy="500" r="5" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.6" />
            <circle cx="600" cy="700" r="5" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.6" />
            <circle cx="1300" cy="650" r="5" fill="url(#nodeGradient)" filter="url(#neuralGlow)" opacity="0.6" />
          </svg>
        </div>

        {/* Subtle Robotic Elements Layer */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Robotic element gradient */}
              <linearGradient id="roboticGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1A73FF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#1A73FF" stopOpacity="0.08" />
              </linearGradient>

              {/* Soft glow for robotic elements */}
              <filter id="roboticGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                </feMerge>
              </filter>
            </defs>

            {/* Robotic Joint 1 - Top Left Corner */}
            <g className="robotic-joint-1" transform="translate(120, 120)" opacity="0.7">
              <circle cx="0" cy="0" r="25" fill="url(#roboticGradient)" filter="url(#roboticGlow)" opacity="0.6" />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#1A73FF" strokeWidth="1.5" opacity="0.4" />
              <circle cx="0" cy="0" r="5" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Robotic Joint 2 - Top Right Corner */}
            <g className="robotic-joint-2" transform="translate(1800, 150)" opacity="0.65">
              <circle cx="0" cy="0" r="22" fill="url(#roboticGradient)" filter="url(#roboticGlow)" opacity="0.6" />
              <circle cx="0" cy="0" r="13" fill="none" stroke="#1A73FF" strokeWidth="1.5" opacity="0.4" />
              <circle cx="0" cy="0" r="4" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Robotic Joint 3 - Bottom Left Corner */}
            <g className="robotic-joint-3" transform="translate(100, 960)" opacity="0.7">
              <circle cx="0" cy="0" r="20" fill="url(#roboticGradient)" filter="url(#roboticGlow)" opacity="0.6" />
              <circle cx="0" cy="0" r="12" fill="none" stroke="#1A73FF" strokeWidth="1.5" opacity="0.4" />
              <circle cx="0" cy="0" r="4" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Robotic Joint 4 - Bottom Right Corner */}
            <g className="robotic-joint-4" transform="translate(1820, 930)" opacity="0.65">
              <circle cx="0" cy="0" r="23" fill="url(#roboticGradient)" filter="url(#roboticGlow)" opacity="0.6" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#1A73FF" strokeWidth="1.5" opacity="0.4" />
              <circle cx="0" cy="0" r="5" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Piston-like Mechanical Arc 1 - Top Edge */}
            <g className="robotic-piston-1" transform="translate(800, 100)" opacity="0.6">
              <path
                d="M -40,0 Q 0,-30 40,0"
                fill="none"
                stroke="#1A73FF"
                strokeWidth="2"
                opacity="0.4"
                filter="url(#roboticGlow)"
              />
              <circle cx="-30" cy="5" r="4" fill="#1A73FF" opacity="0.3" />
              <circle cx="30" cy="5" r="4" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Piston-like Mechanical Arc 2 - Right Edge */}
            <g className="robotic-piston-2" transform="translate(1820, 500)" opacity="0.6">
              <path
                d="M 0,-40 Q 30,0 0,40"
                fill="none"
                stroke="#1A73FF"
                strokeWidth="2"
                opacity="0.4"
                filter="url(#roboticGlow)"
              />
              <circle cx="5" cy="-30" r="4" fill="#1A73FF" opacity="0.3" />
              <circle cx="5" cy="30" r="4" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Piston-like Mechanical Arc 3 - Bottom Edge */}
            <g className="robotic-piston-3" transform="translate(1100, 980)" opacity="0.6">
              <path
                d="M -50,0 Q 0,25 50,0"
                fill="none"
                stroke="#1A73FF"
                strokeWidth="2"
                opacity="0.4"
                filter="url(#roboticGlow)"
              />
              <circle cx="-35" cy="3" r="4" fill="#1A73FF" opacity="0.3" />
              <circle cx="35" cy="3" r="4" fill="#1A73FF" opacity="0.3" />
            </g>

            {/* Rounded Mechanical Curve 1 - Left Edge */}
            <g className="robotic-curve-1" transform="translate(50, 500)" opacity="0.65">
              <path
                d="M 0,-60 Q 30,-30 0,0 Q -30,30 0,60"
                fill="none"
                stroke="#1A73FF"
                strokeWidth="2.5"
                opacity="0.4"
                filter="url(#roboticGlow)"
                strokeLinecap="round"
              />
            </g>

            {/* Rounded Mechanical Curve 2 - Right Edge */}
            <g className="robotic-curve-2" transform="translate(1870, 580)" opacity="0.65">
              <path
                d="M 0,-50 Q -25,-25 0,0 Q 25,25 0,50"
                fill="none"
                stroke="#1A73FF"
                strokeWidth="2.5"
                opacity="0.4"
                filter="url(#roboticGlow)"
                strokeLinecap="round"
              />
            </g>

            {/* Additional subtle robotic curves */}
            <g className="robotic-curve-3" transform="translate(200, 300)" opacity="0.55">
              <ellipse cx="0" cy="0" rx="40" ry="20" fill="none" stroke="#1A73FF" strokeWidth="1.5" opacity="0.35" filter="url(#roboticGlow)" />
            </g>

            <g className="robotic-curve-4" transform="translate(1700, 750)" opacity="0.55">
              <ellipse cx="0" cy="0" rx="35" ry="18" fill="none" stroke="#1A73FF" strokeWidth="1.5" opacity="0.35" filter="url(#roboticGlow)" />
            </g>
          </svg>
        </div>

        {/* Soft Blue Glow Accents */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-[#1A73FF]/2 rounded-full blur-3xl"
          style={{
            boxShadow: '0 0 120px 60px rgba(26, 115, 255, 0.03)',
            animation: 'neural-float 25s ease-in-out infinite'
          }} />
        <div className="absolute bottom-1/3 right-1/5 w-56 h-56 bg-[#1A73FF]/2 rounded-full blur-3xl"
          style={{
            boxShadow: '0 0 100px 50px rgba(26, 115, 255, 0.025)',
            animation: 'neural-float 30s ease-in-out infinite reverse',
            animationDelay: '3s'
          }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#1A73FF]/2 rounded-full blur-3xl"
          style={{
            boxShadow: '0 0 90px 45px rgba(26, 115, 255, 0.02)',
            animation: 'neural-float 35s ease-in-out infinite',
            animationDelay: '6s'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="hero-headlines-container mb-6">
            <h1
              className={`hero-line-first transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`}
            >
              AUTONOMOUS AI SYSTEMS FOR
            </h1>
            <h2
              className={`hero-line-second text-shimmer transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`}
            >
              <TypingText
                text="Enterprise Operations, Support & Growth."
                speed={80}
                startDelay={1000}
                showCursor={true}
                cursorChar="|"
              />
            </h2>
          </div>

          <div className="text-xl sm:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            <StaggeredText
              text="Deploy AI workflows, voice agents, and automation infrastructure that scale across your organisation — securely, reliably, and with measurable impact."
              splitBy="words"
              staggerDelay={60}
              animationDuration={600}
              startDelay={300}
              className="block"
            />
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <MagneticButton
              size="lg"
              onClick={() => scrollToContact('call')}
              threshold={120}
              springStrength={0.2}
              damping={0.75}
              className="group bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-lg font-semibold"
            >
              Schedule a Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              size="lg"
              variant="outline"
              onClick={() => scrollToContact('demo')}
              threshold={120}
              springStrength={0.2}
              damping={0.75}
              className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6 rounded-lg font-semibold"
            >
              <Zap className="mr-2 w-5 h-5" />
              Schedule Demo
            </MagneticButton>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground mt-1 font-medium">Automations Deployed</div>
              <div className="text-xs text-muted-foreground/60 mt-0.5">Across 50+ industries</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground mt-1 font-medium">Client Satisfaction</div>
              <div className="text-xs text-muted-foreground/60 mt-0.5">Based on retention</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-1 font-medium">AI Support</div>
              <div className="text-xs text-muted-foreground/60 mt-0.5">Zero downtime</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
