import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StaggeredTextProps {
  text: string;
  className?: string;
  splitBy?: "words" | "characters";
  staggerDelay?: number;
  animationDuration?: number;
  startDelay?: number;
  onComplete?: () => void;
}

interface TextItem {
  content: string;
  isSpace: boolean;
}

const StaggeredText = ({
  text,
  className,
  splitBy = "words",
  staggerDelay = 50,
  animationDuration = 600,
  startDelay = 0,
  onComplete,
}: StaggeredTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textItems, setTextItems] = useState<TextItem[]>([]);

  useEffect(() => {
    // Split text based on splitBy prop
    let items: TextItem[] = [];

    if (splitBy === "words") {
      // Split by words while preserving spaces
      const parts = text.split(/(\s+)/);
      items = parts.map((part) => ({
        content: part,
        isSpace: /^\s+$/.test(part),
      }));
    } else {
      // Split by characters
      items = text.split("").map((char) => ({
        content: char,
        isSpace: char === " ",
      }));
    }

    setTextItems(items);

    // Start animation after startDelay
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Call onComplete after all animations finish
      if (onComplete) {
        const totalDuration = startDelay + (items.length * staggerDelay) + animationDuration;
        const completeTimer = setTimeout(onComplete, totalDuration);
        return () => clearTimeout(completeTimer);
      }
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, splitBy, staggerDelay, animationDuration, startDelay, onComplete]);

  return (
    <span className={cn("inline-block", className)}>
      {textItems.map((item, index) => {
        const delay = index * staggerDelay;
        const displayContent = item.isSpace ? "\u00A0" : item.content;

        return (
          <span
            key={`${index}-${item.content}`}
            className={cn(
              "inline-block",
              item.isSpace && "w-1 sm:w-1.5"
            )}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: `opacity ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              transitionDelay: `${delay}ms`,
              willChange: isVisible ? "auto" : "opacity, transform",
            }}
          >
            {displayContent}
          </span>
        );
      })}
    </span>
  );
};

export default StaggeredText;

