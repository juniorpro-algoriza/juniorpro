"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: ReactNode;
  title?: string;
  description?: string;
  containerClassName?: string;
  panelClassName?: string;
}

export const Modal = ({
  children,
  title,
  description,
  containerClassName,
  panelClassName,
}: ModalProps) => {
  const router = useRouter();
  const [containerStyle, setContainerStyle] = useState("");
  const [panelStyle, setPanelStyle] = useState("");
const sleep = (seconds: number) => {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle(true);
    }, seconds * 1000);
  });
};

  const onClose = async () => {
    setContainerStyle("opacity-0");
    setPanelStyle("translate-y-full");
    await sleep(0.5);
    
    // Remove all query parameters when closing modal
    const currentUrl = new URL(window.location.href);
    currentUrl.search = '';
    router.push(currentUrl.pathname + currentUrl.hash);
  };

  useEffect(() => {
    setContainerStyle("opacity-100 ");
    setPanelStyle("translate-y-0");
  }, []);

  return (
    <>
      <Dialog
        open={true}
        autoFocus={false}
        transition={true}
        static={true}
        onClose={onClose}
        className={twMerge(
          "fixed inset-0 transition-all duration-500 z-50 opacity-0",
          containerStyle,
          containerClassName
        )}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className={twMerge(
              "transform transition-all translate-y-full duration-500 max-w-lg space-y-4 bg-white p-12",
              panelStyle,
              panelClassName
            )}
          >
            <div className="absolute top-4 right-4 cursor-pointer text-gray-600">
              <XIcon className="size-5" onClick={onClose} />
            </div>
            {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
            {description && <Description>{description}</Description>}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
