"use client";

import { useEffect, useRef, type ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="rounded-lg border border-zinc-200 bg-white p-0 shadow-xl backdrop:bg-black/50 dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="flex min-w-80 flex-col">
        {title && (
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              &times;
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </dialog>
  );
}
