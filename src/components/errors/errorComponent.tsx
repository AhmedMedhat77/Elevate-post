import { Info } from "lucide-react";

interface ErrorComponentProps extends React.ComponentProps<"div"> {
  error?: string;
}

const ErrorComponent = ({ error, ...props }: ErrorComponentProps) => {
  if (!error) return null;

  return (
    <div
      className="text-red-500 bg-red-500/10  border border-red-500 p-3 text-sm flex items-center justify-center gap-2 w-full rounded-md"
      {...props}
    >
      <Info size={16} className="text-red-500 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};

export default ErrorComponent;
