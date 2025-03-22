import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  isDragging?: boolean;
}

export default function ProjectCard({ project, isDragging = false }: ProjectCardProps) {
  const { title, description, image, github } = project;
  
  return (
    <Card 
      className={`h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-grab ${isDragging ? 'shadow-xl cursor-grabbing' : ''}`}
    >
      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 dark:text-gray-500"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
        )}
      </div>
      
      <CardHeader className="px-6 py-4">
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      
      <CardContent className="px-6 py-2">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      
      <CardFooter className="px-6 py-4 flex justify-between items-center">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View on GitHub
          </a>
        )}
        <span className="text-xs text-muted-foreground">Drag to reorder</span>
      </CardFooter>
    </Card>
  );
}
