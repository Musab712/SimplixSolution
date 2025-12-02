const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Premium SVG Logo */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1A73FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Abstract S / Neural Shape */}
          <path
            d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20"
            stroke="url(#logoGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />
          <path
            d="M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20"
            stroke="url(#logoGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Central Node */}
          <circle cx="20" cy="20" r="4" fill="url(#logoGradient)" filter="url(#glow)">
            <animate attributeName="r" values="4;5;4" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Satellite Nodes */}
          <circle cx="10" cy="20" r="2" fill="#1A73FF" className="animate-pulse" />
          <circle cx="30" cy="20" r="2" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: "1s" }} />

          {/* Connecting Lines */}
          <path d="M12 20H16" stroke="#1A73FF" strokeWidth="1.5" opacity="0.5" />
          <path d="M24 20H28" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
      {/* Company Name */}
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold leading-none tracking-tight text-foreground">
          Simplix<span className="text-primary">Solution</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;

