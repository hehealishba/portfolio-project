import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  name: string;
  shortBio: string;
  profilePicture?: string;
}

export default function HeroSection({ name, shortBio, profilePicture }: HeroSectionProps) {
  return (
    <section id="hero" className="py-20 md:py-28 px-4 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div 
          className="order-2 md:order-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
            Hi, I'm <span className="text-primary">{name}</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{shortBio}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {profilePicture ? (
            <img 
              src={profilePicture} 
              alt={`${name}'s profile`} 
              className="w-52 h-52 md:w-72 md:h-72 object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg" 
            />
          ) : (
            <div className="w-52 h-52 md:w-72 md:h-72 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 dark:text-gray-500"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
