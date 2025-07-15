import Image from "next/image";
import logoImage from "../../../../public/images/logo.svg";

// TODO: small image should have the unoptimized prop
// ! see: https://nextjs.org/docs/app/api-reference/components/image#unoptimized

export const Logo = () => (
  <Image
    unoptimized
    className="block"
    src={logoImage}
    alt="Junior Pro Logo"
    width={150}
    height={45}
  />
);
