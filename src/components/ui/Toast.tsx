import React, { useEffect, useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastListeners: ((toast: ToastData) => void)[] = [];

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast: ToastData = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    message,
    type,
  };
  toastListeners.forEach((listener) => listener(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const listener = (toast: ToastData) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-soft border text-sm font-medium animate-slide-in
            ${toast.type === 'success'
              ? 'bg-success-muted dark:bg-success-muted-dark text-success border-success/20'
              : toast.type === 'error'
              ? 'bg-error-muted dark:bg-error-muted-dark text-error border-error/20'
              : 'bg-white dark:bg-[#1a1a1a] text-foreground dark:text-foreground-dark border-border dark:border-border-dark'
            }`}
        >
          {toast.type === 'success' && <Check size={16} />}
          {toast.type === 'error' && <AlertCircle size={16} />}
          {toast.message}
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="ml-2 opacity-50 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in { animation: slideIn 200ms ease-out; }
      `}</style>
    </div>
  );
}