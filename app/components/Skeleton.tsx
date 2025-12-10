import { cx } from "@lib"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cx("bg-gray-50 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
