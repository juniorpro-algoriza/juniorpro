import { Tabs } from "@components/client";
import { TabData } from "@types";
import { Book, FileText, Upload } from "lucide-react";
import React from "react";

export const PathDetailsTabs = () => {
  const tabsData: TabData[] = [
    {
      name: (
        <div className="flex items-center gap-2">
          <Book className="size-4" />
          <span>Step by Step Guide</span>
        </div>
      ),
      content: (
        <>
          <h2 className="text-2xl font-medium text-yankees-blue">
            Step by Step Guide
          </h2>
        </>
      ),
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <FileText className="size-4" />
          <span>Learning Resources</span>
        </div>
      ),
      content: (
        <>
          <h2 className="text-2xl font-medium text-yankees-blue">
            Learning Resources
          </h2>
        </>
      ),
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <Upload className="size-4" />
          <span>Submission</span>
        </div>
      ),
      content: (
        <>
          <h2 className="text-2xl font-medium text-yankees-blue">Submission</h2>
        </>
      ),
    },
  ];
  return (
    <div>
      <Tabs tabs={tabsData} />
    </div>
  );
};
