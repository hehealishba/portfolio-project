import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SocialMedia } from "@shared/schema";
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch, FormState } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface SocialMediaInputProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  formState: FormState<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  defaultSocialMedia: SocialMedia;
}

export default function SocialMediaInput({
  control,
  register,
  formState,
  setValue,
  watch,
  defaultSocialMedia,
}: SocialMediaInputProps) {
  const socialMedia = watch("socialMedia") || [];

  const addSocialMedia = () => {
    setValue("socialMedia", [...socialMedia, { ...defaultSocialMedia }]);
  };

  const removeSocialMedia = (index: number) => {
    const updated = [...socialMedia];
    updated.splice(index, 1);
    setValue("socialMedia", updated);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Social Media</CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={addSocialMedia}
          className="bg-primary text-white hover:bg-primary/90"
        >
          + Add Social Media
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {socialMedia.map((social: SocialMedia, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3 }}
              className="social-media-item flex items-center space-x-4 bg-accent/10 p-3 rounded-md mb-3"
            >
              <div className="flex-1">
                <Input
                  placeholder="Platform Name (e.g. LinkedIn)"
                  {...register(`socialMedia.${index}.name`)}
                  defaultValue={social.name}
                />
                {formState.errors.socialMedia?.[index]?.name && (
                  <p className="text-sm text-destructive mt-1">
                    {formState.errors.socialMedia[index].name?.message as string}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  placeholder="https://..."
                  {...register(`socialMedia.${index}.url`)}
                  defaultValue={social.url}
                />
                {formState.errors.socialMedia?.[index]?.url && (
                  <p className="text-sm text-destructive mt-1">
                    {formState.errors.socialMedia[index].url?.message as string}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialMedia(index)}
                className="text-gray-500 hover:text-destructive dark:text-gray-400"
                aria-label="Remove social media"
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
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
