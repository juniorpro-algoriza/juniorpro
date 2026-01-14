import { Footer, Nav } from "@components";
import { cookies } from "next/headers";
import React from "react";

const LoggedOutLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const isAuthenticated = !!token;

  return (
    <div className="relative">
      {/* 
      Global Gradient (Sawiha Tokens) for Marketing pages
      Refined for a seamless "Whitish Baby Blue -> Deep Space" transition.
    */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#FFFFFF_0%,#E0F2FF_5%,#C7E4FF_15%,#80C0FF_30%,#5CA9FF_45%,#3771F2_60%,#1F3D8B_80%,#0C1335_100%)]" />
      </div>
      <Nav isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </div>
  );
};
export default LoggedOutLayout;
