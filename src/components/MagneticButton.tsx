import { useEffect, useRef, useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode;
  threshold?: number;
  springStrength?: number;
  damping?: number;
  className?: string;
}

const MagneticButton = ({
  children,
  threshold = 100,
  springStrength = 0.15,
  damping = 0.8,
  className,
  ...buttonProps
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Spring physics animation loop
    const animate = () => {
      const currentX = positionRef.current.x;
      const currentY = positionRef.current.y;
      const targetX = targetRef.current.x;
      const targetY = targetRef.current.y;

      // Calculate spring force
      const springX = (targetX - currentX) * springStrength;
      const springY = (targetY - currentY) * springStrength;

      // Apply damping to velocity
      velocityRef.current.x = velocityRef.current.x * damping + springX;
      velocityRef.current.y = velocityRef.current.y * damping + springY;

      // Update position
      const newX = currentX + velocityRef.current.x;
      const newY = currentY + velocityRef.current.y;

      positionRef.current = { x: newX, y: newY };
      setTransform({ x: newX, y: newY });

      // Continue animation if there's still movement or not at target
      const isMoving = Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01;
      const isAtTarget = Math.abs(newX - targetX) < 0.1 && Math.abs(newY - targetY) < 0.1;

      if (isMoving || !isAtTarget) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
      }
    };

    const startAnimation = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Only apply magnetic effect within threshold
      if (distance < threshold) {
        // Calculate force based on distance (closer = stronger)
        const force = 1 - distance / threshold;
        targetRef.current = {
          x: deltaX * force * 0.3, // Scale down for subtle effect
          y: deltaY * force * 0.3,
        };
      } else {
        // Outside threshold, target is center
        targetRef.current = { x: 0, y: 0 };
      }

      startAnimation();
    };

    const handleMouseLeave = () => {
      // Return to center
      targetRef.current = { x: 0, y: 0 };
      startAnimation();
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [threshold, springStrength, damping]);

  return (
    <Button
      ref={buttonRef}
      className={cn("transition-none", className)}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default MagneticButton;

