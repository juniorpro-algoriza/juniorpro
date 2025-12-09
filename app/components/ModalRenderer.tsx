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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modals: Record<ModalName, LazyExoticComponent<ComponentType<any>>> = {
  AddJuniors: lazy(() =>
    import("./modals/AddJuniors").then((m) => ({ default: m.AddJuniors }))
  ),
  EditProfile: lazy(() =>
    import("./modals/EditProfile").then((m) => ({ default: m.EditProfile }))
  ),
  AddProjectManager: lazy(() =>
    import("./modals/AddProjectManager").then((m) => ({
      default: m.AddProjectManager,
    }))
  ),
  EditProjectManagerProfile: lazy(() =>
    import("./modals/EditProjectManagerProfile").then((m) => ({
      default: m.EditProjectManagerProfile,
    }))
  ),
  AddJuniorForContributor: lazy(() =>
    import("./modals/AddJuniorForContributor").then((m) => ({
      default: m.AddJuniorForContributor,
    }))
  ),
  AddContributor: lazy(() =>
    import("./modals/AddContributor").then((m) => ({
      default: m.AddContributor,
    }))
  ),

  EditContributorProfile: lazy(() =>
    import("./modals/EditContributorProfile").then((m) => ({
      default: m.EditContributorProfile,
    }))
  ),
  AssignPointsForContributors: lazy(() =>
    import("./modals/AssignPointsForContributors").then((m) => ({
      default: m.AssignPointsForContributors,
    }))
  ),
  AssignPointsForJuniors: lazy(() =>
    import("./modals/AssignPointsForJuniors").then((m) => ({
      default: m.AssignPointsForJuniors,
    }))
  ),
  EditJuniorsProfile: lazy(() =>
    import("./modals/EditJuniorsProfile").then((m) => ({
      default: m.EditJuniorsProfile,
    }))
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
  CreateEditFeature: lazy(() =>
    import("./modals/CreateEditFeature").then((m) => ({
      default: m.CreateEditFeature,
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
