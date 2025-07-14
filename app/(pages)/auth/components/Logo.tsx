import Image from "next/image";

export const Logo = () => (
  <div>
    <Image
      src={"/images/logo.svg"}
      alt="Junior Pro Logo"
      width={150}
      height={45}
    />
  </div>
);
