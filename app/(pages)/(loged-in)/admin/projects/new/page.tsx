import { LoggedInPageHeader } from "../../../components/client";
import { CreateForm } from "./components/CreateForm";

const CreateNewProject = () => {
  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <LoggedInPageHeader
        title="Projects"
        breadcrumbs={["Dashboard", "Projects", "New"]}
      />
      <CreateForm />
    </main>
  );
};

export default CreateNewProject;
