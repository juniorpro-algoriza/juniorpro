import { Breadcrumb } from "@components";
import { PathHeader, PathTimeline } from "../components";
import StarImage from "@public/images/shooting-star.png";

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
            href: "/junior/my-journey",
          },
          {
            title: "Path",
            href: `/junior/my-journey/${id}`,
          },
        ]}
      />
      <div className="space-y-7 max-w-[700px] mx-auto">
        <PathHeader
          image={StarImage.src}
          title="Web Development Basics"
          description="Learn HTML, CSS, and build your first websites"
        />
        <PathTimeline />
      </div>
    </>
  );
}
