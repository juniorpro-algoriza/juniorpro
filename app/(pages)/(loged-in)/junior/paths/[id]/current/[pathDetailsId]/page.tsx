import { Breadcrumb } from "@components";
import {
  PathDetailsHeader,
  PathDetailsTabs,
  StuckOnAProblem,
} from "../../../_components";
import {
  getJuniorsLearningPathCurrentMissionById,
  getJuniorsLearningPathCurrentById,
} from "../../../../server";

export default async function PathDetailPage({
  params,
}: {
  params: Promise<{ pathDetailsId: string; id: string }>;
}) {
  const { pathDetailsId, id } = await params;
  // Fetch current path and mission data
  const [currentPath, currentMission] = await Promise.all([
    getJuniorsLearningPathCurrentById({ id: parseInt(id) }),
    getJuniorsLearningPathCurrentMissionById({
      id: parseInt(pathDetailsId),
    }),
  ]);
  console.log(currentMission);
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/junior/dashboard",
          },
          {
            title: "Learning Paths",
            href: "/junior/paths",
          },
          {
            title: currentPath?.nameEn || currentPath?.nameAr || "Path",
            href: `/junior/paths/${id}/current`,
          },
          {
            title:
              currentMission?.missionDetails?.nameEn ||
              currentMission?.missionDetails?.nameAr ||
              "Path Detail",
            href: `/junior/paths/${id}/current/${pathDetailsId}`,
          },
        ]}
      />
      <PathDetailsHeader
        nameEn={currentMission?.missionDetails?.nameEn}
        description={currentMission?.missionDetails?.description}
        levelNameEn={currentMission?.missionDetails?.levelNameEn}
        skillNameEn={currentMission?.missionDetails?.skillNameEn}
        xp={currentMission?.missionDetails?.xp}
        points={currentMission?.missionDetails?.points}
        durationNameEn={currentMission?.missionDetails?.durationNameEn}
      />
      <PathDetailsTabs
        steps={currentMission.steps}
        successCriterias={currentMission.successCriterias}
        learningResources={currentMission.learningResources}
        submissionLink={currentMission.missionDetails?.submissionLink}
        referenceAnswer={currentMission.missionDetails?.referenceAnswer}
        missionId={parseInt(pathDetailsId)}
        points={currentMission.missionDetails?.points}
        xp={currentMission.missionDetails?.xp}
        nameEn={currentMission?.missionDetails?.nameEn}
      />
      <StuckOnAProblem />
    </>
  );
}
