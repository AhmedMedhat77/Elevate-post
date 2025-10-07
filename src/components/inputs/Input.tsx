import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { FormField } from "./FormField";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  labelClassName?: string;
  bgColor?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, labelClassName, bgColor = "bg-black/10", className, ...props }, ref) => {
    const inputElement = (
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
          bgColor,
          className
        )}
        {...props}
      />
    );

    if (label || error) {
      return (
        <FormField label={label} error={error} labelClassName={labelClassName}>
          {inputElement}
        </FormField>
      );
    }

    return inputElement;
  }
);

Input.displayName = "Input";

export { Input };
