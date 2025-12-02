import { useEffect, useRef, useState, ReactNode, Children } from "react";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
}

const StaggerContainer = ({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  threshold = 0.1,
}: StaggerContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold]);

  // Wrap each child in an animated container
  const childrenArray = Children.toArray(children);
  const childrenWithStagger = childrenArray.map((child, index) => {
    const delay = initialDelay + index * staggerDelay;
    // Preserve child key if it exists, otherwise use index
    const key = (child as any)?.key || `stagger-item-${index}`;
    
    return (
      <div
        key={key}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        }}
      >
        {child}
      </div>
    );
  });

  return (
    <div ref={containerRef} className={cn(className)}>
      {childrenWithStagger}
    </div>
  );
};

export default StaggerContainer;

