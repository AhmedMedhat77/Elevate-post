import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { FormField } from "./FormField";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  labelClassName?: string;
  bgColor?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, labelClassName, bgColor = "bg-black/10", className, ...props }, ref) => {
    const textareaElement = (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none",
          bgColor,
          className
        )}
        {...props}
      />
    );

    if (label || error) {
      return (
        <FormField label={label} error={error} labelClassName={labelClassName}>
          {textareaElement}
        </FormField>
      );
    }

    return textareaElement;
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
