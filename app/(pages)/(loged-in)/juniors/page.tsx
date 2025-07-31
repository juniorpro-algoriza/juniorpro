import { getJuniorsAge, getJuniorsData, getJuniorsGrades } from "@server";
import { JuniorsHeader } from "./components";
import { JuniorsTable } from "./components/JuniorsTable";

const JuniorsPage = async () => {
  const juniorsData = await getJuniorsData();
  const juniorsAge = await getJuniorsAge();
  const juniorsGradeLevel = await getJuniorsGrades();
  return (
    <div className="min-h-screen px-6 py-3 bg-stone-50">
      {/* Header */}
      <JuniorsHeader />

      {/* Juniors Table */}
      <JuniorsTable
        juniorsData={juniorsData}
        juniorsAge={juniorsAge}
        juniorsGrade={juniorsGradeLevel}
      />
    </div>
  );
};
export default JuniorsPage;
