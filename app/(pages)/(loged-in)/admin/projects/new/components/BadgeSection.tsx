import { Badge } from "@components";
import { Skill } from "../../../types";

export const BadgesSection = ({ skills }: { skills: Skill[] }) => {
  const totalPoints = skills.reduce((sum, s) => sum + s.points, 0);

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold">Badges</h2>

      {/* Badge List */}
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <>
            <Badge key={skill.id} label={skill.name} variant="blue" />
            <Badge key={skill.id} label={skill.points} variant="green" />
          </>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="text-center bg-[#EEF2FF] border rounded-lg py-4">
          <p className="text-[#5879DC] font-bold text-xl">{skills.length}</p>
          <p className="text-black">Number of badges</p>
        </div>
        <div className="text-center  bg-[#EEF2FF] border rounded-lg py-4">
          <p className="text-[#5879DC] font-bold text-xl">{totalPoints}</p>
          <p className="text-black">Total points</p>
        </div>
      </div>
    </div>
  );
};
