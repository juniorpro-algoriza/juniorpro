interface DocumentIconProps {
  fill?: string;
  width?: string;
  height?: string;
}

export const LeftArrowIcon = ({
  fill = "#202637",
  width,
  height,
}: DocumentIconProps) => {
  return (
    <svg
      style={{ width, height }}
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0L8.73375 1.23375L3.85125 6.125H14.5V7.875H3.85125L8.73375 12.7663L7.5 14L0.5 7L7.5 0Z"
        fill={fill}
      />
    </svg>
  );
};
