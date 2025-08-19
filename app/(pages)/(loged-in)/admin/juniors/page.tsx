export const dynamic = "force-dynamic";

import { getJuniorsData } from "@server";
import { JuniorHeader } from "./components/JuniorHeader";
import { JuniorsTable } from "./components/JuniorsTable";
import JuniorStats from "./components/JuniorStats";

const AdminJuniors = async () => {
  const juniorsData = await getJuniorsData();
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <JuniorHeader />
      <JuniorStats />
      <JuniorsTable juniorsData={juniorsData} />
    </div>
  );
};

export default AdminJuniors;
