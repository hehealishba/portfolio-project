import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  name: string;
  shortBio: string;
  profilePicture?: string;
}

export default function HeroSection({ name, shortBio, profilePicture }: HeroSectionProps) {
  // Default placeholder image if none provided
  const profileImage = profilePicture || "https://via.placeholder.com/400";

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {name}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              {shortBio}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative flex-1 max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <img 
                src={profileImage} 
                alt={`${name} profile`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/400";
                }} 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
