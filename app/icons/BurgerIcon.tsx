interface BurgerIconProps {
  fill?: string;
  width?: string;
  height?: string;
}

export const BurgerIcon = ({
  fill = "#96A0B6",
  width,
  height,
}: BurgerIconProps) => {
  return (
    <svg
      style={{ width, height }}
      viewBox="0 0 24 24"
      width="21"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g clipPath="url(#clip0_429_11066)">
          <path
            d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
            stroke="#292929"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={fill}
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_429_11066">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.000915527)"
            ></rect>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};
