"use client";

import { SearchInput } from "@components/client";
import { Button, ModalLink } from "@components";
import { Plus } from "lucide-react";

export const LevelsFilters = () => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className=" min-w-[200px] mt-2">
        <SearchInput placeholder="Search for levels..." />
      </div>
      <ModalLink name="CreateEditLevel">
        <Button intent="main2" size="mainDefault">
          <Plus className="size-4" />
          New Level
        </Button>
      </ModalLink>
    </div>
  );
};
