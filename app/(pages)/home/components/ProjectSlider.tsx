import Link from "next/link";
import { Project } from "../types";
import { cx } from "@lib";

interface ProjectsSliderProps {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  pageNum: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const ProjectsSlider = ({
  projects,
  currentPage,
  pageNum,
  hasNextPage,
  hasPrevPage,
  totalPages,
}: ProjectsSliderProps) => {
  return (
    <section>
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
            href={hasPrevPage ? `/home/projects/${pageNum - 1}/all` : ""}
            className={cx(!hasPrevPage && disabledClassName)}
          >
            Previous
          </Link>
          <Link
            href={hasNextPage ? `/home/projects/${pageNum + 1}/all` : ""}
            className={cx(!hasNextPage && disabledClassName)}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
};

const disabledClassName = "cursor-not-allowed";
