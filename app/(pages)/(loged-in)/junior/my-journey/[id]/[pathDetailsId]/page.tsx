import { Breadcrumb } from "@components";
import { PathDetailsHeader, PathDetailsTabs, StuckOnAProblem } from "../../components";

export default async function PathDetailPage({
  params,
}: {
  params: Promise<{ pathDetailsId: string; id: string }>;
}) {
  const { pathDetailsId, id } = await params;
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/junior",
          },
          {
            title: "My Journey",
            href: "/junior/my-journey",
          },
          {
            title: "Path",
            href: `/junior/my-journey/${id}`,
          },
          {
            title: "Path Detail",
            href: `/junior/my-journey/${id}/${pathDetailsId}`,
          },
        ]}
      />
      <PathDetailsHeader/>
      <PathDetailsTabs/>
      <StuckOnAProblem/>
    </>
  );
}
