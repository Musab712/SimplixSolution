import { useEffect, useState, useRef } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  threshold?: number;
  rootMargin?: string;
  offset?: number;
}

export const useScrollSpy = ({ 
  sectionIds, 
  threshold = 0.1, 
  rootMargin = "-10% 0px -80% 0px",
  offset = 150 
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionVisibilityRef = useRef<Map<string, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize visibility map
    sectionIds.forEach((id) => {
      sectionVisibilityRef.current.set(id, 0);
    });

    // Function to determine active section based on scroll position
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      let activeId = "";
      let minDistance = Infinity;

      // If at the very top, use first section (home)
      if (window.scrollY < 100 && sectionIds[0]) {
        setActiveSection((prev) => {
          if (prev !== sectionIds[0]) {
            return sectionIds[0];
          }
          return prev;
        });
        return;
      }

      // Check each section to find which one is closest to the top of viewport
      sectionIds.forEach((sectionId) => {
        const element = document.querySelector(`#${sectionId}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          
          // Check if section is in viewport (top of section is above offset, bottom is below)
          const isInViewport = rect.top <= offset && rect.bottom >= offset;
          
          if (isInViewport) {
            // If section is in viewport, calculate distance from top
            const distance = Math.abs(rect.top - offset);
            if (distance < minDistance) {
              minDistance = distance;
              activeId = sectionId;
            }
          } else if (rect.top > 0 && rect.top < offset * 2) {
            // Section is approaching viewport from below
            const distance = Math.abs(rect.top - offset);
            if (distance < minDistance) {
              minDistance = distance;
              activeId = sectionId;
            }
          }
        }
      });

      // Update active section if we found one
      if (activeId) {
        setActiveSection((prev) => {
          if (prev !== activeId) {
            return activeId;
          }
          return prev;
        });
      }
    };

    // Initial check
    updateActiveSection();

    // Create intersection observer for additional precision
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const visibility = entry.intersectionRatio;
          sectionVisibilityRef.current.set(sectionId, visibility);
        });

        // Use scroll position as primary method, intersection as secondary
        updateActiveSection();
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
        rootMargin,
      }
    );

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.querySelector(`#${sectionId}`);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Add scroll listener for more responsive updates
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, threshold, rootMargin, offset]);

  // Return home as default if no active section is set yet
  return activeSection || sectionIds[0] || "";
};

