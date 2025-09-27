// src/hooks/useAppToast.ts
import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "custom" | "warning" | "loading";

interface AppToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useAppToast() {
  function toastShow(type: ToastType, message: string, opts?: AppToastOptions) {
    const options = {
      description: opts?.description,
      duration: opts?.duration,
      action: opts?.action,
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      case "loading":
        toast.loading(message, options);
        break;
      case "info":
        toast(message, options);
        break;
      case "custom":
        toast(message, options);
        break;
      default:
        toast(message, options);
    }
  }

  return { toastShow };
}
