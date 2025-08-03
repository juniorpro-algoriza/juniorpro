import { Button } from "@components";
import { BellIcon } from "lucide-react";

export const Notifications = () => {
  return (
    <Button
      intent="unset"
      size="medium"
      className="bg-white shadow rounded-[40px] p-3"
    >
      <BellIcon size={20} className="text-cadetGray" />
    </Button>
  );
};
