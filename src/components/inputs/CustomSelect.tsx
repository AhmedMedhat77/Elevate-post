import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { FormField } from "./FormField";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";

interface SelectProps {
  label?: string;
  error?: string;
  labelClassName?: string;
  bgColor?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const CustomSelect = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      labelClassName,
      bgColor = "bg-black/10",
      placeholder,
      value,
      onValueChange,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const selectElement = (
      <Select value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger ref={ref} className={cn("w-full", bgColor, className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    );

    if (label || error) {
      return (
        <FormField label={label} error={error} labelClassName={labelClassName}>
          {selectElement}
        </FormField>
      );
    }

    return selectElement;
  }
);

CustomSelect.displayName = "CustomSelect";

export { CustomSelect };
