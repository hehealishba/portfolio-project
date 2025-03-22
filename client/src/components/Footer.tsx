import { Button } from "@/components/ui/button";
import { type SocialMedia } from "@shared/schema";
import { useLocation } from "wouter";

interface FooterProps {
  name: string;
  shortBio: string;
  socialMedia: SocialMedia[];
}

export default function Footer({ name, shortBio, socialMedia }: FooterProps) {
  const [_, navigate] = useLocation();
  const validSocialMedia = socialMedia.filter(s => s.name && s.url);
  
  const handleEditPortfolio = () => {
    navigate("/");
  };
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-400 text-sm mt-1">{shortBio}</p>
          </div>
          
          <div className="flex space-x-4">
            {validSocialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.name}
              >
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
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          
          <div className="mt-4">
            <Button
              variant="link"
              onClick={handleEditPortfolio} 
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Edit Portfolio
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
