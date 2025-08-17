import { LoggedInPageHeader } from "../../../components/client";

export const ProfileHeader = () => {
  return (
    <LoggedInPageHeader
      title="Profile"
      breadcrumbs={["Dashboard", "Profile"]}
    />
  );
};
