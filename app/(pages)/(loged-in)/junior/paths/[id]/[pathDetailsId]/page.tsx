import { Breadcrumb } from "@components";
import {
  PathDetailsHeader,
  PathDetailsTabs,
  StuckOnAProblem,
} from "../../components";

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
            href: "/junior/paths",
          },
          {
            title: "Path",
            href: `/junior/paths/${id}`,
          },
          {
            title: "Path Detail",
            href: `/junior/paths/${id}/${pathDetailsId}`,
          },
        ]}
      />
      <PathDetailsHeader />
      <PathDetailsTabs />
      <StuckOnAProblem />
    </>
  );
}
