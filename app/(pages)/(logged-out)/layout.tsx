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
    <>
      <Nav isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </>
  );
};
export default LoggedOutLayout;
