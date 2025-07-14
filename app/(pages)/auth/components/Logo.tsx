import Image from "next/image";

export const Logo = () => (
  <div className="mb-10">
    <Image
      src={"/Juniorpro.svg"}
      alt="Junior Pro Logo"
      width={150}
      height={45}
    />
  </div>
);
