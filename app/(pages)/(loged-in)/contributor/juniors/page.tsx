import { getJuniorsData } from "@server";
import { JuniorsHeader, JuniorsTable } from "./components";

interface Props {
  params: { id: string }; // contributor id
  searchParams?: { page?: string };
}
const JuniorsPage = async ({ params, searchParams }: Props) => {
  const contributorId = Number(params.id);
  const pageNumber = Number(searchParams?.page) || 1;  const juniorsData = await getJuniorsData();

  return (
    <div className="min-h-screen px-6 py-3 bg-stone-50">
      {/* Header */}
      <JuniorsHeader />

      {/* Juniors Table */}
      <JuniorsTable contributorId={contributorId} pageNumber={pageNumber} />
    </div>
  );
};
export default JuniorsPage;
