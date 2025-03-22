import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type SocialMedia } from "@shared/schema";
import { motion } from "framer-motion";

interface AboutSectionProps {
  fullBio?: string;
  skills?: string;
  interests?: string;
  socialMedia: SocialMedia[];
}

export default function AboutSection({
  fullBio,
  skills,
  interests,
  socialMedia,
}: AboutSectionProps) {
  // Filter out social media entries with empty fields
  const validSocialMedia = socialMedia.filter(
    (social) => social.name && social.url
  );

  // Split skills and interests into arrays
  const skillsArray = skills
    ? skills.split(",").map((skill) => skill.trim())
    : [];
  const interestsArray = interests
    ? interests.split(",").map((interest) => interest.trim())
    : [];

  return (
    <section id="about" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">My Background</h3>
            <div className="text-muted-foreground space-y-4">
              {fullBio ? (
                <p>{fullBio}</p>
              ) : (
                <p>No bio information provided</p>
              )}
            </div>

            {skillsArray.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {interestsArray.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interestsArray.map((interest, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Connect With Me
                </h3>
                <Separator className="my-4" />
                <div className="space-y-3">
                  {validSocialMedia.length > 0 ? (
                    validSocialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center py-2 px-4 bg-accent/10 rounded-md hover:bg-accent/20 transition-colors"
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
                          className="mr-3 text-primary"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <span>{social.name}</span>
                      </a>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">
                      No social media links provided
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
