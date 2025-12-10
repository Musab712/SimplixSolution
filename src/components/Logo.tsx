import logoImage from "@/assets/cropped_withoutbg.png";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <img 
        src={logoImage} 
        alt="Logo" 
        className="h-10 w-auto object-contain"
        style={{
          mixBlendMode: 'multiply',
        }}
      />
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-bold leading-none tracking-tight">
          <span style={{ color: '#003366' }}>Simplix</span>
          <span style={{ color: '#20B2AA' }}>Solution</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;

