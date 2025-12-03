import { Breadcrumb } from "@components";
import { PathHeader, PathTimeline } from "../components";
import Code3d from "@public/images/code-3d.png";

export default async function PathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
        ]}
      />
      <div className="space-y-7 xl:max-w-4/5">
        <PathHeader
          image={Code3d.src}
          title="Web Development Basics"
          description="Learn HTML, CSS, and build your first websites"
          progress={80}
        />
        <PathTimeline pathId={id} />
      </div>
    </>
  );
}
