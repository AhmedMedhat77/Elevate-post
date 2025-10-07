import { Loader2 } from "lucide-react";

const LoaderOverlay = () => {
  return (
    <div className="flex justify-center items-center absolute inset-0 bg-black/10 z-50">
      <Loader2 className="animate-spin" size={20} />
    </div>
  );
};

export default LoaderOverlay;
