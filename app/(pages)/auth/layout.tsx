import type { ReactNode } from "react";
import { HeroImage } from "./_components";

interface AuthLayoutProps {
  // * Add children to the return statement if you want to render the page.tsx file for this route.
  children: ReactNode;
  slot: ReactNode;
}

const AuthLayout = ({ slot }: Readonly<AuthLayoutProps>) => {
  return (
    <main className="flex gap-20 items-center justify-center px-4 min-h-screen">
      {slot}
      <HeroImage />
    </main>
  );
};

export default AuthLayout;
