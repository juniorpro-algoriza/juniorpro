import Link from "next/link";
import { Project, ProjectType } from "../types";
import { cx } from "@lib";

interface ProjectsSliderProps {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  pageNum: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  projectType: ProjectType;
}

export const ProjectsSlider = ({
  projects,
  currentPage,
  pageNum,
  hasNextPage,
  hasPrevPage,
  totalPages,
  projectType,
}: ProjectsSliderProps) => {
  return (
    <section className="p-4">
      <div>
        {projects.map(({ id, title }) => {
          return <h1 key={id}>{id + "-" + title}</h1>;
        })}
      </div>
      <div>
        <p>
          Current Page: {currentPage}/{totalPages}
        </p>
        <div className="flex gap-2">
          <Link
            href={
              hasPrevPage ? `/home/projects/${pageNum - 1}/${projectType}` : ""
            }
            className={cx(linkClassName, !hasPrevPage && disabledClassName)}
          >
            Previous
          </Link>
          <Link
            href={
              hasNextPage ? `/home/projects/${pageNum + 1}/${projectType}` : ""
            }
            className={cx(linkClassName, !hasNextPage && disabledClassName)}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
};

const disabledClassName = "cursor-not-allowed";
const linkClassName = "underline text-blue-500";
