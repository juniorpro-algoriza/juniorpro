import { Breadcrumb } from "@components";
import { Header } from "@components/client";
import { JuniorsCards } from "./_components";

const JuniorsPage = async () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/contributor/dashboard",
          },
          {
            title: "Juniors",
            href: "/contributor/juniors",
          },
        ]}
      />
      <Header
        title={"My Juniors"}
        description={
          <>
            Manage your team! You have{" "}
            <span className="text-blue-main">3 empty seats</span> remaining
          </>
        }
      />
      <JuniorsCards/>
    </>
  );
};
export default JuniorsPage;
