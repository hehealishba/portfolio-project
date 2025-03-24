import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@shared/schema";
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch, FormState } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectInputProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  formState: FormState<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  defaultProject: Project;
}

export default function ProjectInput({
  control,
  register,
  formState,
  setValue,
  watch,
  defaultProject,
}: ProjectInputProps) {
  const projects = watch("projects") || [];

  const addProject = () => {
    setValue("projects", [...projects, { ...defaultProject }]);
  };

  const removeProject = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setValue("projects", updated);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={addProject}
          className="bg-primary text-white hover:bg-primary/90"
        >
          + Add Project
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {projects.map((project: Project, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3 }}
              className="project-item bg-accent/10 p-4 rounded-md mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Project {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(index)}
                  className="text-gray-500 hover:text-destructive dark:text-gray-400"
                  disabled={projects.length <= 1}
                  aria-label="Remove project"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project Title *
                  </label>
                  <Input
                    {...register(`projects.${index}.title`)}
                    defaultValue={project.title}
                  />
                  {formState.errors.projects?.[index]?.title && (
                    <p className="text-sm text-destructive mt-1">
                      {formState.errors.projects[index].title?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project Image URL
                  </label>
                  <Input
                    placeholder="https://example.com/project.jpg"
                    {...register(`projects.${index}.image`)}
                    defaultValue={project.image}
                  />
                  {formState.errors.projects?.[index]?.image && (
                    <p className="text-sm text-destructive mt-1">
                      {formState.errors.projects[index].image?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    GitHub URL
                  </label>
                  <Input
                    placeholder="https://github.com/yourusername/project"
                    {...register(`projects.${index}.github`)}
                    defaultValue={project.github}
                  />
                  {formState.errors.projects?.[index]?.github && (
                    <p className="text-sm text-destructive mt-1">
                      {formState.errors.projects[index].github?.message as string}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Project Description *
                  </label>
                  <Textarea
                    placeholder="Describe your project..."
                    className="min-h-[100px]"
                    {...register(`projects.${index}.description`)}
                    defaultValue={project.description}
                  />
                  {formState.errors.projects?.[index]?.description && (
                    <p className="text-sm text-destructive mt-1">
                      {formState.errors.projects[index].description?.message as string}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
