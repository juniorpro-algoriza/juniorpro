// import { getJuniorsData } from "@server";
import { JuniorsHeader, JuniorsTable } from "./components";

const JuniorsPage = async () => {
  return (
    <div className="min-h-screen px-6 py-3 bg-stone-50">
      {/* Header */}
      <JuniorsHeader />

      {/* Juniors Table */}
      <JuniorsTable />
    </div>
  );
};
export default JuniorsPage;
