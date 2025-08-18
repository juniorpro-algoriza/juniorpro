export const dynamic = "force-dynamic";

import { getJuniorData } from "../server/getJuniorData";
// TODO: having an index.ts file makes for ONLY one import statement
import { JuniorHeader, JuniorsTable, JuniorStats } from "./components";

const AdminJuniors = async () => {
  const juniorsData = await getJuniorData();
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <JuniorHeader />
      <JuniorStats />
      <JuniorsTable juniorsData={juniorsData} />
    </div>
  );
};

export default AdminJuniors;
