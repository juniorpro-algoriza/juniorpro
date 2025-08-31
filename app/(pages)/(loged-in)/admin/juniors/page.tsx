import {
  JuniorHeader,
  JuniorStatsContainer,
  JuniorTableContainer,
} from "./components";

const AdminJuniorsPage = async () => {
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <JuniorHeader />
      <JuniorStatsContainer />
      <JuniorTableContainer />
    </div>
  );
};

export default AdminJuniorsPage;
