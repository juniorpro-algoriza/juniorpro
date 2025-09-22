"use client";
import { userAtom } from "@atoms";
import ContributorAvatar from "@public/images/contributor-avatar.svg";
import { useAtom } from "jotai";
import Image from "next/image";

export const SidebarUserInfo = () => {
  const [{ firstName, lastName, email, image }] = useAtom(userAtom);
  return (
    <div className="p-2">
      <div className="flex items-center space-x-3 p-2 border border-bright-gray rounded-2xl transition-all duration-200">
        <Image
          unoptimized
          className="rounded-full w-12 h-12 flex-shrink-0 transition-transform duration-200 hover:scale-105"
          src={image ? image : ContributorAvatar}
          alt="Contributor Avatar"
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-maastricht-blue truncate">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-storm-400 truncate">{email}</p>
        </div>
      </div>
    </div>
  );
};
