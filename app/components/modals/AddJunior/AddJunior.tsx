/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Input, Modal } from "@components";
import { Select, Tabs } from "@components/client";
import { CloseButton } from "@headlessui/react";
import { getJuniorsAge, getJuniorsGrades } from "@server";
import type { TabData } from "@types";
import { XIcon } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import { InviteExistingTab } from "../../client/InviteExistingJunior";

export const AddJunior = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [juniorsAge, setJuniorsAge] = useState<any[]>([]);
  const [juniorsGrade, setJuniorsGrade] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setJuniorsAge(await getJuniorsAge());
      setJuniorsGrade(await getJuniorsGrades());
    };
    fetchData();
  }, []);

  const tabsData: TabData[] = [
    {
      name: "Create Account",
      content: (
        <div className="space-y-4">
          <Input
            label="Junior's Name"
            placeholder="Write here"
            className="w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-midnight">Age</label>
              <Select description="" label="" options={juniorsAge} />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-midnight">
                Grade Level
              </label>
              <Select description="" label="" options={juniorsGrade} />
            </div>
          </div>
          <Input
            label="Email Address (Optional)"
            placeholder="Write here"
            type="email"
            className="w-full"
          />
        </div>
      ),
    },
    {
      name: "Invite Existing",
      content: <InviteExistingTab />,
    },
    {
      name: "General",
      content: (
        <div className="flex flex-col space-y-2">
          <Input
            label="Contribution Amount (Points)"
            placeholder="Write here"
            type="email"
            className="w-full"
          />
          <p className="text-dark-electric-blue text-[13px] font-light">
            Make a general contribution that can be used by any junior in need.
            These points will go to a community pool to support educational
            projects.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Modal panelClassName="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div className="flex items-center justify-between mb-3 border-b border-storm-200 pb-2">
        <h3 className="text-lg font-medium leading-6 text-midnight">
          Add a Junior
        </h3>
        <CloseButton as={Fragment}>
          <Button
            intent="unset"
            className="border border-border-secondary p-1.5 rounded-lg"
          >
            <XIcon size={18} />
          </Button>
        </CloseButton>
      </div>

      <Tabs
        tabs={tabsData}
        tabListClassName="flex space-x-1 rounded-full bg-gray-100 p-1.5 mb-3 w-full"
        onTabChange={setActiveTab}
      />

      {/* Hide Create/Cancel if on Invite Existing tab */}
      {activeTab !== 1 && (
        <div className="flex gap-3 mt-6">
          <Button intent="primary" className="flex-1">
            Create
          </Button>
          <CloseButton as={Fragment}>
            <Button
              intent="secondary"
              className="flex-1 text-dark-electric-blue"
            >
              Cancel
            </Button>
          </CloseButton>
        </div>
      )}
    </Modal>
  );
};
