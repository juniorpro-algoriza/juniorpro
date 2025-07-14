import Image from "next/image";

export const HeroSection = () => (
  <div className="w-1/2 overflow-hidden">
    <Image
      src={"/left-login-section.svg"}
      alt=""
      width={100}
      height={100}
      className="w-fit h-fit object-cover p-6"
    />
  </div>
);
