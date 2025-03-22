import { useEffect } from "react";
import { useLocation } from "wouter";
import { usePortfolio } from "@/context/PortfolioContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function PortfolioPage() {
  const [_, navigate] = useLocation();
  const { portfolioData } = usePortfolio();
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Fetch projects data for dynamic loading demo
  const { isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    // Error handling and retry logic is handled by the default configuration
  });

  // Redirect to data entry if no portfolio data
  useEffect(() => {
    if (!portfolioData || !portfolioData.name) {
      navigate("/");
    }
  }, [portfolioData, navigate]);

  // If no data, show loading state
  if (!portfolioData || !portfolioData.name) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Button 
        onClick={toggleDarkMode} 
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg text-gray-800 dark:text-white transition-colors"
        variant="outline"
        size="icon"
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </Button>

      <Navbar name={portfolioData.name} />
      
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection 
          name={portfolioData.name}
          shortBio={portfolioData.shortBio}
          profilePicture={portfolioData.profilePicture}
        />
        
        <AboutSection 
          fullBio={portfolioData.fullBio}
          skills={portfolioData.skills}
          interests={portfolioData.interests}
          socialMedia={portfolioData.socialMedia}
        />
        
        <ProjectsSection 
          projects={portfolioData.projects}
          isLoading={projectsLoading}
        />
        
        <ContactSection 
          email={portfolioData.contactEmail}
          socialMedia={portfolioData.socialMedia}
        />
      </main>
      
      <Footer 
        name={portfolioData.name}
        shortBio={portfolioData.shortBio}
        socialMedia={portfolioData.socialMedia}
      />
    </div>
  );
}
