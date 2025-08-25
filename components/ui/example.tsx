import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { useToast } from "@/components/ui/toast";

export function ToastDemo() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast("Operation successful!", "success");
  };

  return (
    <div className="p-4 flex items-center gap-4">
      <LoadingSpinner size="md" />
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-coral-red text-white rounded-md hover:bg-coral-dark transition-colors"
      >
        Show Toast
      </button>
    </div>
  );
}
