import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { portfolioSchema, type PortfolioData, Project, SocialMedia } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import SocialMediaInput from "@/components/SocialMediaInput";
import ProjectInput from "@/components/ProjectInput";
import { usePortfolio } from "@/context/PortfolioContext";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function DataEntryPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { setPortfolioData } = usePortfolio();
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  // Default empty project and social media templates
  const emptyProject: Project = { title: "", description: "", image: "", github: "" };
  const emptySocialMedia: SocialMedia = { name: "", url: "" };

  // Default form values
  const defaultValues: PortfolioData = {
    name: "",
    shortBio: "",
    fullBio: "",
    profilePicture: "",
    skills: "",
    interests: "",
    projects: [{ ...emptyProject }],
    socialMedia: [{ ...emptySocialMedia }],
    contactEmail: "",
  };

  // Initialize form with react-hook-form
  const form = useForm<PortfolioData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues,
    mode: "onChange",
  });

  const { formState } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const savePortfolioMutation = useMutation({
    mutationFn: async (data: PortfolioData) => {
      const response = await apiRequest("POST", "/api/portfolio", data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Portfolio saved!",
        description: "Your portfolio has been created successfully.",
      });
      setPortfolioData(form.getValues());
      navigate("/portfolio");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save portfolio. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: PortfolioData) => {
    setIsSubmitting(true);
    // For simplicity, we're just setting the data in context directly
    // In a production app, we'd save this to the backend
    setPortfolioData(data);
    savePortfolioMutation.mutate(data);
  };

  const previewPortfolio = () => {
    const currentData = form.getValues();
    if (formState.isValid) {
      setPortfolioData(currentData);
      navigate("/portfolio");
    } else {
      // Trigger validation to show errors
      form.trigger();
      toast({
        title: "Validation Failed",
        description: "Please fix the form errors before previewing your portfolio.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 ${darkMode ? "dark" : ""}`}>
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleDarkMode} 
          className="rounded-full"
          aria-label="Toggle dark mode"
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
      </div>

      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2 font-heading">
            Portfolio Builder
          </h1>
          <p className="text-muted-foreground">
            Enter your information to generate a professional portfolio website
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/profile.jpg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="shortBio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Bio (Tagline) *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Frontend Developer | UI/UX Designer" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="fullBio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Bio (About Me)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write a detailed description about yourself..."
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills (comma separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="React, JavaScript, CSS, HTML" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interests (comma separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Web Development, UI Design, Photography" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <ProjectInput 
              control={form.control} 
              register={form.register} 
              formState={formState}
              setValue={form.setValue}
              watch={form.watch}
              defaultProject={emptyProject}
            />

            {/* Social Media */}
            <SocialMediaInput 
              control={form.control} 
              register={form.register} 
              formState={formState}
              setValue={form.setValue}
              watch={form.watch}
              defaultSocialMedia={emptySocialMedia}
            />

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-8">
              <Button 
                type="button" 
                variant="outline" 
                onClick={previewPortfolio}
                disabled={isSubmitting}
              >
                Preview Portfolio
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? "Generating Portfolio..." : "Generate Portfolio"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
