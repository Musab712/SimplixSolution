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

      // Check if we're scrolling to a specific section via hash
      const hash = window.location.hash.replace('#', '').split('?')[0];
      if (hash && sectionIds.includes(hash)) {
        const hashElement = document.querySelector(`#${hash}`);
        if (hashElement) {
          const hashRect = hashElement.getBoundingClientRect();
          // If hash section is in viewport or very close, prioritize it
          if (hashRect.top < window.innerHeight && hashRect.bottom > 0) {
            setActiveSection(hash);
            return;
          }
        }
      }

      // Check each section to find which one is closest to the top of viewport
      sectionIds.forEach((sectionId) => {
        const element = document.querySelector(`#${sectionId}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          
          // Check if section is in viewport (top of section is above offset, bottom is below)
          // Use stricter criteria: section must have significant portion visible
          const sectionHeight = rect.height;
          const visibleHeight = Math.min(rect.bottom, offset + 100) - Math.max(rect.top, offset);
          const isInViewport = rect.top <= offset + 50 && rect.bottom >= offset && visibleHeight > sectionHeight * 0.3;
          
          if (isInViewport) {
            // If section is in viewport, calculate distance from top
            const distance = Math.abs(rect.top - offset);
            if (distance < minDistance) {
              minDistance = distance;
              activeId = sectionId;
            }
          } else if (rect.top > 0 && rect.top < offset * 2 && rect.top > offset - 100) {
            // Section is approaching viewport from below, but only if it's the closest
            const distance = Math.abs(rect.top - offset);
            if (distance < minDistance) {
              minDistance = distance;
              activeId = sectionId;
            }
          }
        }
      });

      // If we've scrolled past the last tracked section, clear the active state
      const lastId = sectionIds[sectionIds.length - 1];
      if (lastId) {
        const lastEl = document.querySelector<HTMLElement>(`#${lastId}`);
        if (lastEl) {
          const lastRect = lastEl.getBoundingClientRect();
          const lastBottom = window.scrollY + lastRect.bottom;
          const viewportBottom = window.scrollY + window.innerHeight;
          if (viewportBottom > lastBottom + 100) {
            if (activeSection !== "") setActiveSection("");
            return;
          }
        }
      }

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

  // Allow no active section (e.g., after last section)
  return activeSection;
};

