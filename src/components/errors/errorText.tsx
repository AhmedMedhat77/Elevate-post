import { Info } from "lucide-react";

interface ErrorComponentProps extends React.ComponentProps<"p"> {
  error?: string;
}

const ErrorText = ({ error, ...props }: ErrorComponentProps) => {
  return (
    <>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2" {...props}>
          <Info size={16} />
          {error}
        </p>
      )}
    </>
  );
};

export default ErrorText;
