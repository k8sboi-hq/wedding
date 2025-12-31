"use client";

import { useState, useEffect } from "react";
import HeartIcon from "./HeartIcon";

const navLinks = [
  { href: "#home", label: "Home", icon: "🏠" },
  { href: "#photos", label: "Photos", icon: "📸" },
  { href: "#countdown", label: "Countdown", icon: "⏰" },
  { href: "#details", label: "Details", icon: "📅" },
  { href: "#location", label: "Location", icon: "📍" },
  { href: "#rsvp", label: "RSVP", icon: "💌" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Increase threshold from 50 to 100 for more deliberate transition
      setIsScrolled(window.scrollY > 100);

      // Track active section
      const sections = ["home", "photos", "countdown", "details", "location", "rsvp"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#fef9f3]/98 backdrop-blur-lg shadow-[0_4px_20px_rgba(220,20,60,0.15)]"
          : "bg-gradient-to-b from-[#fef9f3]/95 via-[#fff5eb]/90 to-transparent backdrop-blur-sm"
      }`}
      aria-label="Wedding website navigation"
    >
      <div className="container mx-auto px-4 relative">
        {/* Decorative corner lotus - only visible when scrolled */}
        {isScrolled && (
          <>
            <div className="absolute top-2 left-2 text-accent/20 text-lg animate-[fadeIn_0.5s_ease-out]" aria-hidden="true">
              🪷
            </div>
            <div className="absolute top-2 right-2 text-accent/20 text-lg animate-[fadeIn_0.5s_ease-out]" aria-hidden="true">
              🪷
            </div>
          </>
        )}

        <div className="flex items-center justify-between h-16">
          {/* Elevated Monogram Logo */}
          <a
            href="#home"
            className="flex items-center space-x-3 group relative z-10"
            onClick={handleLinkClick}
          >
            <div className="relative">
              {/* Pulsing heart background */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md scale-150 group-hover:scale-175 transition-transform duration-500" />
              <HeartIcon className="w-7 h-7 text-primary relative z-10 transition-all duration-300" />
            </div>
            <span className="font-serif text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent group-hover:from-secondary group-hover:via-primary group-hover:to-secondary transition-all duration-500">
              K & S
            </span>
            {/* Vietnamese double happiness */}
            <span className="hidden lg:inline text-accent text-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
              囍
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative group font-serif text-base font-medium transition-colors duration-300 ${
                  activeSection === link.href.slice(1) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {/* Decorative flourish on hover - left */}
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-accent opacity-0 group-hover:opacity-100 group-hover:-left-5 transition-all duration-300" aria-hidden="true">
                  ❦
                </span>

                <span className="relative">
                  {link.label}
                  {/* Elegant dual underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary group-hover:w-full transition-all duration-500" />
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent/50 group-hover:w-full transition-all duration-500 delay-75" />
                </span>

                {/* Decorative flourish on hover - right */}
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-accent opacity-0 group-hover:opacity-100 group-hover:-right-5 transition-all duration-300" aria-hidden="true">
                  ❦
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors relative z-10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-primary transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-primary transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-primary transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-6 pt-4 px-4">
            {/* Decorative divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-4" />

            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-primary/10 p-3 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-serif text-base font-medium hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary hover:shadow-md transition-all duration-300 group ${
                    activeSection === link.href.slice(1) ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-accent text-sm opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />

      {/* Accessibility: improved focus indicators */}
      <style jsx>{`
        a:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </nav>
  );
}
