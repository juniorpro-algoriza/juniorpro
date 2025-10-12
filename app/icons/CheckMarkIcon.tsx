interface GlobeIconProps {
  // fill?: string;
  width?: string;
  height?: string;
}

export const CheckMarkIcon = ({
  // fill = "#40444C",
  width,
  height,
}: GlobeIconProps) => {
  return (
    <svg
      style={{ width, height }}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#41C980" />
      <path
        d="M5 8.94545L7.84444 12L13 6"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
