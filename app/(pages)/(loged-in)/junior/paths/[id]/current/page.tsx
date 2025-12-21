import { Breadcrumb, PATH_ICON } from "@components";
import { PathHeader } from "../../_components";
import { PathTimeline } from "@components/client";
import { getJuniorsLearningPathCurrentById, getJuniorsLearningPathCurrentMission } from "../../../server";
import { MISSION_STATUS } from "../../../../../../components/lib/constants";

export default async function PathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pathId = parseInt(id);
  
  const [currentPath, currentMission] = await Promise.all([
    getJuniorsLearningPathCurrentById({ id: pathId }),
    getJuniorsLearningPathCurrentMission({ Id: pathId })
  ]);
console.warn("currentMission:",currentMission?.data)
  // Map API response to PathTimeline format
  const missions = currentMission?.data?.map((mission,index) => {    

    return {
      id: mission.id,
      status: MISSION_STATUS[mission.status as keyof typeof MISSION_STATUS],
      title: mission.nameEn || mission.nameAr || "Mission",
      level: mission.levelNameEn || mission.levelNameAr || "beginner",
      description: mission.description || "Complete this mission to progress",
      duration: mission.durationNameEn || mission.durationNameAr || "30 min",
      xp: mission.xp || 0,
      diamonds: mission.points || 0,
      requires: index!==0?currentMission?.data?.[index-1].nameEn:undefined,
      href: `/junior/paths/${id}/current/${mission.id}`,
    };
  }) || [];


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
        ]}
      />
      <div className="space-y-7 xl:max-w-4/5">
        <PathHeader
          image={PATH_ICON[String(pathId) as keyof typeof PATH_ICON]}
          title={currentPath?.nameEn || currentPath?.nameAr || "Web Development Basics"}
          description={currentPath?.description || "Learn HTML, CSS, and build your first websites"}
          progress={currentPath?.progressPercentage || 0}
        />
        <PathTimeline module="junior" missions={missions} />
      </div>
    </>
  );
}
