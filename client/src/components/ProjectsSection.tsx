import { useState } from "react";
import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import ProjectCard from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectsSectionProps {
  projects: Project[];
  isLoading?: boolean;
}

export default function ProjectsSection({ projects, isLoading = false }: ProjectsSectionProps) {
  const [orderedProjects, setOrderedProjects] = useState<Project[]>(projects);

  // Handle drag and drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(orderedProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setOrderedProjects(items);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary">My Projects</h2>
          <div className="mt-2 h-1 w-20 bg-primary/30 mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Drag and drop to reorder projects.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Skeleton className="w-full aspect-video bg-accent/10" />
                <div className="p-6">
                  <Skeleton className="h-6 w-2/3 bg-accent/10 mb-4" />
                  <Skeleton className="h-4 w-full bg-accent/10 mb-2" />
                  <Skeleton className="h-4 w-full bg-accent/10 mb-2" />
                  <Skeleton className="h-4 w-3/4 bg-accent/10 mb-6" />
                  <div className="flex justify-between">
                    <Skeleton className="h-10 w-24 bg-accent/10" />
                    <Skeleton className="h-10 w-24 bg-accent/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="projects" direction="horizontal">
              {(provided) => (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {orderedProjects.length > 0 ? (
                    orderedProjects.map((project, index) => (
                      <Draggable key={index} draggableId={`project-${index}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              zIndex: snapshot.isDragging ? 10 : 0,
                            }}
                          >
                            <ProjectCard 
                              project={project} 
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-muted-foreground">No projects added yet.</p>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </section>
  );
}