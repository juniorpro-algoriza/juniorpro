export const dynamic = "force-dynamic";

import { getLookup } from "@server";
import { LoggedInPageHeader } from "../../../components/client";
import { CreateForm } from "./components/CreateForm";

const CreateNewProject = async () => {
  const category = await getLookup("Lookup/Category");
  const levels = await getLookup("Lookup/Level");
  const duration = await getLookup("Lookup/Duration");
  const tools = await getLookup("Lookup/Tool");
  const skills = await getLookup("Lookup/Skill");
  const projectMangers = await getLookup("project-manager/look-ups");

  return (
    <main className="min-h-screen px-3 py-2 md:px-6 md:py-3 bg-stone-50">
      <LoggedInPageHeader
        title="Projects"
        breadcrumbs={["Dashboard", "Projects", "New"]}
      />
      <CreateForm
        category={category}
        skills={skills}
        tools={tools}
        duration={duration}
        levels={levels}
        projectMangers={projectMangers}
      />
    </main>
  );
};

export default CreateNewProject;
