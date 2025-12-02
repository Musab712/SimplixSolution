import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
        >
            <Button
                onClick={scrollToTop}
                size="icon"
                className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                aria-label="Back to top"
            >
                <ArrowUp className="h-6 w-6 text-primary-foreground" />
            </Button>
        </div>
    );
};

export default BackToTop;
