import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ErrorText } from "../errors";

interface BaseFieldProps {
  label?: string;
  error?: string | undefined;
  labelClassName?: string;
  className?: string;
  children: React.ReactNode;
}

const FormField = forwardRef<HTMLDivElement, BaseFieldProps>(
  ({ label, error, labelClassName, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2.5", className)}>
        {label && (
          <label className={cn("text-sm font-medium text-gray-700", labelClassName)}>{label}</label>
        )}
        {children}
        <ErrorText error={error} />
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
