import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

const TypingText = ({
  text,
  speed = 100,
  startDelay = 0,
  className = "",
  showCursor = true,
  cursorChar = "|",
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Start typing after delay
    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
      setDisplayedText("");
    }, startDelay);

    return () => clearTimeout(delayTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        // Typing complete, wait 2 seconds then vanish and retype
        setIsTyping(false);
        clearInterval(typingInterval);
        
        setTimeout(() => {
          // Instantly vanish the text
          setDisplayedText("");
          // Start typing again
          setIsTyping(true);
        }, 2000); // Wait 2 seconds
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [isTyping, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span className="inline-block typing-cursor">
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypingText;

