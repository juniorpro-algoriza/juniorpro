import { Breadcrumb } from "@components";
import { BadgeCreateEdit } from "../../_components";

const EditBadgePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  const badgeId = Number(resolvedParams.id);

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
            title: "Edit Badge",
            href: `/admin/badges/${badgeId}/edit`,
          },
        ]}
      />

      <div className="mt-8">
        <h1 className="text-[32px] font-bold text-yankees-blue">Edit Badge</h1>
        <p className="mt-2 text-base font-medium text-semi-blue">
          Configure badge details and earning conditions
        </p>
      </div>

      <div className="mt-8">
        <BadgeCreateEdit badgeId={badgeId} />
      </div>
    </>
  );
};

export default EditBadgePage;
