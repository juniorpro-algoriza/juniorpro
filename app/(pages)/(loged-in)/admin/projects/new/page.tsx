"use server";
import {
  getCategoryLookUp,
  getLevelLookUp,
  getDurationLookUp,
  getToolsLookUp,
  getSkillsLookUp,
} from "@server";
import { LoggedInPageHeader } from "../../../components/client";
import { CreateForm } from "./components/CreateForm";

const CreateNewProject = async () => {
  const category = await getCategoryLookUp();
  const levels = await getLevelLookUp();
  const duration = await getDurationLookUp();
  const tools = await getToolsLookUp();
  const skills = await getSkillsLookUp();
  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
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
      />
    </main>
  );
};

export default CreateNewProject;
