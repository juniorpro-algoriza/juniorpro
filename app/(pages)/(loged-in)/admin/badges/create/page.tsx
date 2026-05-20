import { Breadcrumb } from "@components";
import { BadgeCreateEdit } from "../_components";

const CreateBadgePage = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Badge Management",
            href: "/admin/badges",
          },
          {
            title: "Create New Badge",
            href: "/admin/badges/create",
          },
        ]}
      />

      <div className="mt-8">
        <h1 className="text-[32px] font-bold text-yankees-blue">
          Create New Badge
        </h1>
        <p className="mt-2 text-base font-medium text-semi-blue">
          Configure badge details and earning conditions
        </p>
      </div>

      <div className="mt-8">
        <BadgeCreateEdit />
      </div>
    </>
  );
};

export default CreateBadgePage;
