import { GlobeIcon, LinkedInIcon, LocationIcon, MailIcon } from "@icons";
import { ProfileData } from "@types";
import Link from "next/link";

export const Profile = ({ profile }: { profile: ProfileData }) => {
  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-violet-normal">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-violet-normal h-3 rounded-full transition-all duration-300"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-6 py-6">
      {/* About Section */}
      <div className="bg-white rounded-2xl shadow-xl space-y-3 p-6 h-fit w-1/3">
        <h2 className="text-2xl text-yankees-blue font-medium">About</h2>
        <p className="text-content-secondary font-medium leading-8">
          {profile.about}
        </p>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <GlobeIcon />
            <Link
              href={"#"}
              className="text-violet-normal hover:underline text-xl"
            >
              {profile.profileUrl}
            </Link>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <LinkedInIcon />
            <Link
              href={"#"}
              className="text-violet-normal hover:underline text-xl"
            >
              {profile.linkedInUrl}
            </Link>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MailIcon />
            <span className="text-[#40444C] text-xl">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <LocationIcon />
            <span className="text-[#40444C] text-xl">{profile.location}</span>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="w-2/3 bg-white rounded-2xl shadow-xl p-6 h-fit space-y-4">
        <h2 className="text-2xl font-medium text-yankees-blue">
          Skills & Expertise
        </h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2430]">
              Frontend Development
            </h3>
            <SkillBar name="HTML" level={85} />
            <SkillBar name="CSS" level={80} />
            <SkillBar name="JavaScript" level={85} />
            <SkillBar name="React" level={75} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2430]">Design & UX</h3>
            <SkillBar name="UI Design" level={90} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2430]">
              Backend Development
            </h3>
            <SkillBar name="Python" level={80} />
            <SkillBar name="Node.js" level={85} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2430]">Database</h3>
            <SkillBar name="MongoDB" level={65} />
          </div>
        </div>
      </div>
    </div>
  );
};
