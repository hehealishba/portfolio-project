import { Project } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  isDragging?: boolean;
}

export default function ProjectCard({ project, isDragging = false }: ProjectCardProps) {
  // Default placeholder image if none provided
  const projectImage = project.image || "https://via.placeholder.com/800x450?text=No+Image";

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      className="h-full"
    >
      <Card className={`overflow-hidden h-full transition-all ${
        isDragging ? "ring-2 ring-primary shadow-lg" : ""
      }`}>
        <div className="relative aspect-video overflow-hidden bg-accent/10">
          <img
            src={projectImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
          {isDragging && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <div className="text-primary/80 font-semibold">Dragging...</div>
            </div>
          )}
        </div>
        
        <CardHeader className="p-4">
          <CardTitle className="line-clamp-1 text-xl">{project.title || "Untitled Project"}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-3">
            {project.description || "No description provided."}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex gap-2">
          {project.github && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(project.github, '_blank')}
              className="inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </Button>
          )}
          {project.image && (
            <Button 
              size="sm"
              onClick={() => window.open(project.image, '_blank')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              View Full
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}