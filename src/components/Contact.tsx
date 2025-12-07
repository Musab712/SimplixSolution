import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, Twitter, Loader2, MapPin } from "lucide-react";
import { submitContactForm } from "@/lib/api";
import { sanitizeName, sanitizeEmail, sanitizePhone, sanitizeMessage } from "@/lib/sanitize";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [animatePhone, setAnimatePhone] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Check for hash parameters on mount and when hash changes
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.includes('contact?action=call') && !hasAnimatedRef.current) {
        // Delay to ensure we're scrolled to contact section
        setTimeout(() => {
          setAnimatePhone(true);
          hasAnimatedRef.current = true;
          setTimeout(() => {
            setAnimatePhone(false);
            hasAnimatedRef.current = false;
          }, 5000);
        }, 500);
      } else if (hash.includes('contact?action=demo') && !hasAnimatedRef.current) {
        // Delay to ensure we're scrolled to contact section
        setTimeout(() => {
          setAnimateForm(true);
          hasAnimatedRef.current = true;
          setTimeout(() => {
            setAnimateForm(false);
            hasAnimatedRef.current = false;
          }, 5000);
        }, 500);
      }
    };

    // Check on mount
    checkHash();

    // Poll for hash changes (more reliable than hashchange event)
    const hashCheckInterval = setInterval(() => {
      if (!hasAnimatedRef.current) {
        checkHash();
      }
    }, 150);

    // Listen for hash changes
    const handleHashChange = () => {
      // Reset flag when hash changes to allow new animation
      hasAnimatedRef.current = false;
      setTimeout(() => {
        checkHash();
      }, 200);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Also check periodically in case hashchange doesn't fire
    const periodicCheck = setInterval(() => {
      if (!hasAnimatedRef.current) {
        checkHash();
      }
    }, 300);
    
    return () => {
      clearInterval(hashCheckInterval);
      clearInterval(periodicCheck);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      newErrors.name = "Name is required";
    } else if (nameTrimmed.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (nameTrimmed.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Email validation
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = "Please enter a valid email address";
    } else if (emailTrimmed.length > 255) {
      newErrors.email = "Email must be less than 255 characters";
    }

    // Phone validation (optional but validate format if provided)
    if (formData.phone && formData.phone.trim()) {
      const phoneTrimmed = formData.phone.trim();
      if (phoneTrimmed.length > 20) {
        newErrors.phone = "Phone number must be less than 20 characters";
      } else {
        // International phone format validation
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        const cleanedPhone = phoneTrimmed.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
          newErrors.phone = "Please enter a valid phone number";
        }
      }
    }

    // Message validation
    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      newErrors.message = "Message is required";
    } else if (messageTrimmed.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (messageTrimmed.length > 5000) {
      newErrors.message = "Message must be less than 5000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please check your input",
        description: "There are errors in the form that need to be fixed.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
      });

      toast({
        title: "Message sent!",
        description: response.message || "We'll get back to you as soon as possible.",
      });

      // Reset form on success
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again later.";

      // Check if error has validation errors from backend
      if (error instanceof Error && error.message.includes("Validation failed")) {
        // Backend validation errors would be in the response, but we handle client-side validation
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply sanitization based on field type
    let sanitizedValue = value;
    switch (name) {
      case 'name':
        sanitizedValue = sanitizeName(value);
        break;
      case 'email':
        sanitizedValue = sanitizeEmail(value);
        break;
      case 'phone':
        sanitizedValue = sanitizePhone(value);
        break;
      case 'message':
        // For message, we sanitize but preserve user input more
        sanitizedValue = sanitizeMessage(value);
        break;
      default:
        sanitizedValue = value;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-20 bg-background relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              Book Your Automation Strategy Call
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In 20–30 minutes, we'll review your workflows, identify quick‑win automations, and outline a custom action plan for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div 
                ref={formRef}
                className={`p-8 rounded-lg bg-card border border-border ${
                  animateForm ? 'animate-form-highlight' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">Tell us about your workflows</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  What you&apos;ll get from the call:
                  <br />
                  – A clear view of what can be automated in your business
                  <br />
                  – Specific ideas for chatbots, voice agents, and workflows
                  <br />
                  – Estimated impact on time saved and response times
                </p>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      className={`bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 placeholder:text-muted-foreground/70 ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive animate-fade-in-up">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={255}
                      className={`bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 placeholder:text-muted-foreground/70 ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive animate-fade-in-up">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={20}
                      className={`bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 placeholder:text-muted-foreground/70 ${errors.phone ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-destructive animate-fade-in-up">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      How can we help? <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your automation goals..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      maxLength={5000}
                      className={`bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-300 placeholder:text-muted-foreground/70 ${errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive animate-fade-in-up">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all duration-300 hover:scale-[1.02] h-12 text-base font-semibold rounded-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    size="lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground/80 text-center">
                    We typically reply within 24 hours.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="p-8 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
                <div className="space-y-6">
                  <a
                    href="mailto:hello@neuronex.ai"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-all duration-300 group p-4 rounded-lg hover:bg-primary/5"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground/70">Email</div>
                      <div className="font-semibold text-foreground">hello@neuronex.ai</div>
                    </div>
                  </a>
                  <a
                    ref={phoneRef}
                    href="tel:+61452231101"
                    className={`flex items-center gap-4 text-muted-foreground hover:text-primary transition-all duration-300 group p-4 rounded-lg hover:bg-primary/5 ${
                      animatePhone ? 'animate-phone-highlight' : ''
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0 ${
                      animatePhone ? 'animate-phone-icon' : ''
                    }`}>
                      <Phone className={`w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 ${
                        animatePhone ? 'animate-phone-pulse' : ''
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground/70">Phone</div>
                      <div className={`font-semibold text-foreground ${
                        animatePhone ? 'animate-phone-text' : ''
                      }`}>+61 452231101</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 text-muted-foreground group p-4 rounded-lg">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground/70">Address</div>
                      <div className="font-semibold text-foreground">48 Greenlink Boulevard, Harrisdale 6110</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Follow Us</h3>
                <p className="text-muted-foreground mb-4">Stay connected and get the latest updates</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-14 h-14 rounded-xl bg-card/50 border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="w-14 h-14 rounded-xl bg-card/50 border border-border hover:border-primary flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style>{`
        @keyframes phone-highlight {
          0%, 100% { 
            background-color: transparent;
            transform: scale(1);
          }
          10%, 90% { 
            background-color: hsl(var(--primary) / 0.1);
            transform: scale(1.02);
          }
          50% { 
            background-color: hsl(var(--primary) / 0.15);
            transform: scale(1.05);
          }
        }
        
        @keyframes phone-icon {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            background-color: hsl(var(--primary) / 0.1);
          }
          25% { 
            transform: scale(1.2) rotate(5deg);
            background-color: hsl(var(--primary));
          }
          50% { 
            transform: scale(1.3) rotate(-5deg);
            background-color: hsl(var(--primary));
          }
          75% { 
            transform: scale(1.2) rotate(5deg);
            background-color: hsl(var(--primary));
          }
        }
        
        @keyframes phone-pulse {
          0%, 100% { 
            transform: scale(1);
            color: hsl(var(--primary));
          }
          25%, 75% { 
            transform: scale(1.2);
            color: hsl(var(--primary-foreground));
          }
          50% { 
            transform: scale(1.3);
            color: hsl(var(--primary-foreground));
          }
        }
        
        @keyframes phone-text {
          0%, 100% { 
            transform: scale(1);
            color: hsl(var(--foreground));
          }
          25%, 75% { 
            transform: scale(1.1);
            color: hsl(var(--primary));
          }
          50% { 
            transform: scale(1.15);
            color: hsl(var(--primary));
          }
        }
        
        @keyframes form-highlight {
          0%, 100% { 
            background-color: hsl(var(--card));
            border-color: hsl(var(--border));
            transform: scale(1);
            box-shadow: none;
          }
          10%, 90% { 
            background-color: hsl(var(--primary) / 0.05);
            border-color: hsl(var(--primary) / 0.3);
            transform: scale(1.01);
            box-shadow: 0 0 20px hsl(var(--primary) / 0.1);
          }
          50% { 
            background-color: hsl(var(--primary) / 0.08);
            border-color: hsl(var(--primary) / 0.5);
            transform: scale(1.02);
            box-shadow: 0 0 30px hsl(var(--primary) / 0.2);
          }
        }
        
        .animate-phone-highlight {
          animation: phone-highlight 5s ease-in-out;
        }
        
        .animate-phone-icon {
          animation: phone-icon 5s ease-in-out;
        }
        
        .animate-phone-pulse {
          animation: phone-pulse 5s ease-in-out;
        }
        
        .animate-phone-text {
          animation: phone-text 5s ease-in-out;
        }
        
        .animate-form-highlight {
          animation: form-highlight 5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;
