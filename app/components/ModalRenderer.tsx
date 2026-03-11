"use client";

import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useMemo,
  lazy,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { modalNameSchema } from "./schemas/modalNameSchema";
import type { ModalName } from "./types/ModalName";

// Map of lazy-loaded modal components
const Modals: Record<
  ModalName,
  LazyExoticComponent<ComponentType<Record<string, string | null>>>
> = {
  AddJuniors: lazy(() =>
    import("./modals/AddJuniors").then((m) => ({ default: m.AddJuniors }))
  ),
  MissionCompleted: lazy(() =>
    import("./modals/MissionCompleted").then((m) => ({
      default: m.MissionCompleted,
    }))
  ),
  CreateEditMission: lazy(() =>
    import("./modals/CreateEditMission").then((m) => ({
      default: m.CreateEditMission,
    }))
  ),
  CreateEditPlan: lazy(() =>
    import("./modals/CreateEditPlan").then((m) => ({
      default: m.CreateEditPlan,
    }))
  ),
  WelcomePopup: lazy(() =>
    import("./modals/WelcomePopup").then((m) => ({
      default: m.WelcomePopup,
    }))
  ),
  PaymentModal: lazy(() =>
    import("./modals/PaymentModal").then((m) => ({
      default: m.PaymentModal,
    }))
  ),
  JoinCollaboration: lazy(() =>
    import("./modals/JoinCollaboration").then((m) => ({
      default: m.JoinCollaboration,
    }))
  ),
  TaskDetails: lazy(() =>
    import("./modals/TaskDetails").then((m) => ({ default: m.TaskDetails }))
  ),
  CreateTask: lazy(() =>
    import("./modals/CreateTask").then((m) => ({ default: m.CreateTask }))
  ),
  JuniorTaskDetails: lazy(() =>
    import("./modals/JuniorTaskDetails").then((m) => ({
      default: m.JuniorTaskDetails,
    }))
  ),
};

export const ModalRenderer = () => {
  const searchParams = useSearchParams();
  const modalName = searchParams.get("modal");

  const ModalComponent = useMemo(() => {
    if (!modalName) return null;

    // Validate modal name
    const parsedName = modalNameSchema.safeParse(modalName);
    if (!parsedName.success) return null;

    return Modals[parsedName.data as ModalName];
  }, [modalName]);

  if (!ModalComponent) return null;

  const props = Object.fromEntries(searchParams.entries());

  return (
    <Suspense fallback={null}>
      <ModalComponent {...props} />
    </Suspense>
  );
};
