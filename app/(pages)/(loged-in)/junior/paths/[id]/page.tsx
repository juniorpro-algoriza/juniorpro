import { Breadcrumb, PATH_ICON } from "@components";
import { PathHeader } from "../_components";
import { PathTimeline } from "@components/client";
import { getJuniorsLearningPathById, getJuniorsLearningPathMission } from "../../server";

export default async function PathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pathId = parseInt(id);
  
  const [Path, Mission] = await Promise.all([
    getJuniorsLearningPathById({ id: pathId }),
    getJuniorsLearningPathMission({ Id: pathId })
  ]);
console.warn("Mission:",Mission?.data)
  // Map API response to PathTimeline format
  const missions = Mission?.data?.map((mission,index) => {    

    return {
      id: mission.id,
      status: "Pending",
      title: mission.nameEn || mission.nameAr || "Mission",
      level: mission.levelNameEn || mission.levelNameAr || "beginner",
      description: mission.description || "Complete this mission to progress",
      duration: mission.durationNameEn || mission.durationNameAr || "30 min",
      xp: mission.xp || 0,
      diamonds: mission.points || 0,
      requires: index!==0?Mission?.data?.[index-1].nameEn:undefined,
      href: `/junior/paths/${id}/${mission.id}`,
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
            title: Path?.nameEn || Path?.nameAr || "Path",
            href: `/junior/paths/${id}/`,
          },
        ]}
      />
      <div className="space-y-7 xl:max-w-4/5">
        <PathHeader
          image={PATH_ICON[String(pathId) as keyof typeof PATH_ICON]}
          title={Path?.nameEn || Path?.nameAr || "Web Development Basics"}
          description={Path?.description || "Learn HTML, CSS, and build your first websites"}
          pathId={pathId}
        />
        <PathTimeline module="junior" missions={missions} />
      </div>
    </>
  );
}
