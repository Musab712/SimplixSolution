import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetPortal,
} from "@/components/ui/sheet";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Solutions", href: "#services", id: "services" },
    { label: "Results", href: "#results", id: "results" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Benefits", href: "#benefits", id: "benefits" },
    { label: "About", href: "#about", id: "about" },
  ];

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useScrollSpy({
    sectionIds,
    threshold: 0.3,
    rootMargin: "-20% 0px -70% 0px",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Set hash to prevent scroll spy from incorrectly highlighting sections
      window.location.hash = href.replace('#', '');
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      // Clear hash after scroll completes to allow normal scroll spy behavior
      setTimeout(() => {
        if (window.location.hash === href.replace('#', '')) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }, 1000);
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-500",
        "bg-gradient-to-b from-background/80 via-background/70 to-background/60",
        "backdrop-blur-xl backdrop-saturate-150",
        "border-b border-border/50",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
        isScrolled && "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border-border/80"
      )}
    >
      {/* Animated gradient border effect */}
      <div 
        className={cn(
          "absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r transition-opacity duration-500",
          "from-transparent via-primary/50 to-transparent",
          isScrolled ? "opacity-100" : "opacity-60"
        )}
        style={{
          backgroundImage: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          backgroundSize: "200% 100%",
          animation: "gradient-shift 3s ease infinite"
        }}
      />
      
      {/* Subtle animated background gradient */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `
            radial-gradient(at 0% 0%, hsl(var(--primary)) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsl(var(--accent)) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsl(var(--primary)) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsl(var(--accent)) 0px, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          animation: 'mesh-gradient 15s ease infinite'
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="relative group hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-lg transition-all duration-300 font-medium",
                    "group overflow-hidden",
                    isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {/* Hover background effect */}
                  <span
                    className={cn(
                      "absolute inset-0 bg-primary/5 rounded-lg transition-all duration-300",
                      "transform scale-0 group-hover:scale-100",
                      isActive && "scale-100 bg-primary/10"
                    )}
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg" />
                  )}
                  
                  {/* Text with shimmer effect on active */}
                  <span className={cn(
                    "relative z-10 block",
                    isActive && "text-shimmer"
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Bottom indicator line */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full",
                      isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* CTA Button in corner */}
          <div className="hidden md:block ml-4 relative group">
            <div className="absolute inset-0 bg-primary rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
            <Button
              onClick={() => {
                // Set hash first to trigger animation
                window.location.hash = 'contact?action=call';
                // Small delay to ensure hash is set before scroll
                setTimeout(() => {
                  scrollToSection("#contact");
                }, 100);
                // Clear hash after animation completes
                setTimeout(() => {
                  if (window.location.hash.includes('contact?action=call')) {
                    window.history.replaceState(null, '', window.location.pathname);
                  }
                }, 6000);
              }}
              className={cn(
                "relative bg-gradient-to-r from-primary to-accent text-primary-foreground",
                "hover:from-primary/90 hover:to-accent/90",
                "hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
                "transition-all duration-300 rounded-lg font-semibold",
                "px-6 py-2.5",
                "border border-primary/20",
                "hover:scale-105 active:scale-95"
              )}
            >
              <span className="relative z-10">Schedule a Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative p-2 rounded-lg text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/10 group"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu 
              size={24} 
              className={cn(
                "transition-all duration-300",
                "group-hover:rotate-90"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Portal/Modal Overlay */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetPortal>
          <SheetOverlay className="bg-black/60 backdrop-blur-md" />
          <SheetContent
            side="right"
            className="w-full sm:w-80 p-0 bg-background/95 backdrop-blur-xl border-l border-border/50"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="flex flex-col h-full relative overflow-hidden">
              {/* Animated background gradient */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background: `
                    radial-gradient(at 0% 0%, hsl(var(--primary)) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, hsl(var(--accent)) 0px, transparent 50%)
                  `,
                }}
              />
              
              {/* Header */}
              <div className="px-6 py-8 border-b border-border/50 relative z-10">
                <div className="flex items-center justify-between">
                  <Logo />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Navigation Items with Staggered Animation */}
              <nav className="flex-1 px-6 py-8 relative z-10 overflow-y-auto">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }}
                        className={cn(
                          "relative font-medium px-4 py-3.5 rounded-lg transition-all duration-300",
                          "group overflow-hidden",
                          isActive
                            ? "text-primary bg-gradient-to-r from-primary/10 to-primary/5"
                            : "text-foreground hover:text-primary hover:bg-primary/5"
                        )}
                        style={{
                          animation: `fade-in-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms forwards`,
                          opacity: 0,
                        }}
                      >
                        {/* Hover gradient effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center">
                          {item.label}
                          {isActive && (
                            <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </span>
                        {/* Active indicator line */}
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </nav>

              {/* CTA Button */}
              <div className="px-6 py-6 border-t border-border/50 relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
                  <Button
                    onClick={() => {
                      // Set hash first to trigger animation
                      window.location.hash = 'contact?action=call';
                      // Small delay to ensure hash is set before scroll
                      setTimeout(() => {
                        scrollToSection("#contact");
                      }, 100);
                      // Clear hash after animation completes
                      setTimeout(() => {
                        if (window.location.hash.includes('contact?action=call')) {
                          window.history.replaceState(null, '', window.location.pathname);
                        }
                      }, 6000);
                    }}
                    className={cn(
                      "w-full relative bg-gradient-to-r from-primary to-accent text-primary-foreground",
                      "hover:from-primary/90 hover:to-accent/90",
                      "hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
                      "transition-all duration-300 rounded-lg font-semibold py-6",
                      "border border-primary/20",
                      "active:scale-95"
                    )}
                    style={{
                      animation: `fade-in-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${navItems.length * 50}ms forwards`,
                      opacity: 0,
                    }}
                  >
                    <span className="relative z-10">Schedule a Call</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    </nav>
  );
};

export default Navigation;
