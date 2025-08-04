// "use client"

// import { VisuallyHidden } from "@components"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@ui"
// import { cn, sleep } from "@utils"
// import { useRouter } from "next/navigation"
// import { MouseEvent, useState, type ReactNode } from "react"

// interface ModalProps {
//   children?: ReactNode
//   onModalOpen?: () => void
//   onModalClose?: () => Promise<void>
//   handleClickCapture?: (event: MouseEvent<HTMLDivElement>) => void
//   handleClickInternally?: boolean
//   refreshOnClose?: boolean
//   // onOpenChange?: (isOpen: boolean) => void;
//   modalDescription?: string

//   initialOverlayClassName?: string
//   outroOverlayClassName?: string
//   introOverlayClassName?: string

//   initialContentClassName?: string
//   introContentClassName?: string
//   outroContentClassName?: string
// }

// const defaultOverlayClassName =
//   "fixed inset-0 z-40 flex items-center justify-center bg-black/80 overflow-hidden transform duration-500"
// const defaultContentCLassName =
//   "p-5 w-fit h-[95vh] overflow-hidden bg-white rounded-3xl z-50 inset-0 fixed mx-auto my-auto transform duration-500"

// const defaultOverlayIntroClassName = "animate-in fade-in-0"
// const defaultContentIntroClassName = "animate-in fade-in-0"

// const defaultOverlayOutroClassName = "animate-out fade-out-0"
// const defaultContentOutroClassName = "animate-out fade-out-0"

// export const Modal = ({
//   children,
//   modalDescription = "",

//   initialContentClassName,
//   introContentClassName,
//   outroContentClassName,

//   initialOverlayClassName,
//   introOverlayClassName,
//   outroOverlayClassName,
// }: ModalProps) => {
//   const router = useRouter()

//   const contentClassName = cn(
//     defaultContentCLassName,
//     defaultContentIntroClassName,
//     initialContentClassName,
//     introContentClassName,
//   )

//   const overlayClassName = cn(
//     defaultOverlayClassName,
//     defaultOverlayIntroClassName,
//     initialOverlayClassName,
//     introOverlayClassName,
//   )

//   const [currentContentClassName, setCurrentContentClassName] =
//     useState(contentClassName)

//   const [currentOverlayClassName, setCurrentOverlayClassName] =
//     useState(overlayClassName)

//   const closeDialog = async () => {
//     const contentClassName = cn(
//       currentContentClassName,
//       defaultContentOutroClassName,
//       outroContentClassName,
//     )
//     const overlayClassName = cn(
//       currentOverlayClassName,
//       defaultOverlayOutroClassName,
//       outroOverlayClassName,
//     )
//     setCurrentContentClassName(contentClassName)
//     setCurrentOverlayClassName(overlayClassName)

//     await sleep(0.45)

//     router.back()
//   }

//   return (
//     <Dialog open={true}>
//       <VisuallyHidden>
//         <DialogTitle title="User Settings" />
//         <DialogDescription description={modalDescription} />
//       </VisuallyHidden>
//       <DialogContent
//         overlayClassName={currentOverlayClassName}
//         onInteractOutside={closeDialog}
//         onEscapeKeyDown={closeDialog}
//         className={currentContentClassName}
//         // onCloseAunmouutoFocus={closeDialog}
//         // onOpenAutoFocus={onModalOpen}
//         // onPointerDownOutside={closeDialog}
//       >
//         {children}
//       </DialogContent>
//       <DialogClose asChild>Close</DialogClose>
//     </Dialog>
//   )
// }
