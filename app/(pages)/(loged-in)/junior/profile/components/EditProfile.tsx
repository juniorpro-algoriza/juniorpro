"use client";
import { userAtom } from "@atoms";
import { Button, Input, Textarea } from "@components";
import { Select } from "@components/client";
import { LocationIcon } from "@icons";
import profileAvatarImage from "@public/images/profile-avartar.svg";
import SaudiFlagIcon from "@public/images/saudi-flag.svg";
import skyBg from "@public/images/sky.svg";
import { getData, getMyProfileData } from "@server";
import { ProfileData } from "@types";
import { useAtom } from "jotai";
import { CameraIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface EditProfileProps {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  setIsOpen: (isOpen: boolean) => void;
  careerTypesData: { label: string; value: string }[];
}

export const EditProfile = ({
  profile,
  setProfile,
  setIsOpen,
  careerTypesData,
}: EditProfileProps) => {
  const initialForm = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    birthDate: profile?.birthDate || "",
    careerType: profile?.career || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    location: profile?.location || "",
    about: profile?.about || "",
    profileUrl: profile?.profileUrl || "",
    linkedInUrl: profile?.linkedInUrl || "",
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [, setUser] = useAtom(userAtom);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await getData({
        url: "User/update-profile",
        method: "PUT",
        body: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          // image: "string",
          // coverImage: "string",
          location: form.location,
          about: form.about,
          birthDate: new Date(form.birthDate).toISOString(),
          phoneNumber: form.phoneNumber,
          careerTypeId: Number(form.careerType) || 0,
          profileUrl: form.profileUrl,
          linkedInUrl: form.linkedInUrl,
        },
      });
      toast.success("Profile updated successfully!");
      setForm(initialForm);
      const newProfile = await getMyProfileData();
      setProfile(newProfile);
      setUser((prev) => ({
        ...prev,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        email: newProfile.email,
      }));
      setIsOpen(false);
    } catch (err) {
      const message = (err as Error).message || "Failed to update your data";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-2xl h-[90vh] overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-storm-200 pb-2">
        <h3 className="text-lg font-medium leading-6 text-midnight">
          Edit Profile
        </h3>
        <Button
          intent="unset"
          className="border border-border-secondary p-1.5 rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          <XIcon size={18} />
        </Button>
      </div>

      <div className="relative h-32 mb-16">
        <Image
          src={skyBg}
          alt="Profile background"
          fill
          className="object-cover rounded-t-xl opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            intent="unset"
            className="bg-transparent text-storm-500 px-4 py-2 rounded-lg border border-storm-300 flex items-center gap-2"
          >
            <UploadIcon className="text-stone-500" size={16} />
            Choose Cover Photo
          </Button>
        </div>
        <div className="absolute left-1/6 -bottom-14 transform -translate-x-1/2">
          <div>
            <Image
              src={profileAvatarImage}
              alt={`profile avatar`}
              className="w-full h-full object-cover relative"
            />
            <Button
              intent="unset"
              className="absolute bottom-2 right-2 bg-violet-normal rounded-full border-2 border-white p-2 focus:outline-none focus:ring-0 focus:ring-violet-normal"
            >
              <CameraIcon className="text-white" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="First Name"
          name="firstName"
          onChange={handleInputChange}
          value={form.firstName}
          placeholder="Write here"
          className="w-full"
        />
        <Input
          label="Last Name"
          name="lastName"
          onChange={handleInputChange}
          value={form.lastName}
          placeholder="Write here"
          className="w-full"
        />
        <Input
          label="Birth date"
          name="birthDate"
          type="date"
          onChange={handleInputChange}
          value={form?.birthDate?.split("T")[0]}
          placeholder="Write here"
          className="w-full"
        />

        <Select
          value={String(form.careerType)}
          onChange={(value) => setForm({ ...form, careerType: value })}
          label="Career Type"
          placeholder="choose"
          options={careerTypesData}
        />
      </div>

      <Input
        label="Email"
        name="email"
        onChange={handleInputChange}
        value={form.email}
        placeholder="Write here"
        className="w-full"
      />
      <Input
        label="Profile Url"
        name="profileUrl"
        onChange={handleInputChange}
        value={form.profileUrl}
        placeholder="Write here"
        className="w-full"
      />
      <Input
        label="LinkedIn Url"
        name="linkedInUrl"
        onChange={handleInputChange}
        value={form.linkedInUrl}
        placeholder="Write here"
        className="w-full"
      />
      <Input
        label="Number"
        name="phoneNumber"
        onChange={handleInputChange}
        value={form.phoneNumber}
        placeholder="05 xxx xxx xxx"
        className="w-full"
        leftIcon={<Image src={SaudiFlagIcon} alt="saudi flag" />}
      />
      <Input
        label="Location"
        name="location"
        onChange={handleInputChange}
        value={form.location}
        placeholder="choose location"
        className="w-full placeholder:text-violet-normal"
        leftIcon={<LocationIcon fill="#5879DC" />}
      />
      <Textarea
        label="About"
        name="about"
        onChange={(e) => handleInputChange(e)}
        value={form.about}
        placeholder="Write here"
        className="w-full"
      />

      <div className="flex gap-3 mt-6">
        <Button
          intent="primary"
          type="button"
          onClick={handleSubmit}
          className="flex-1"
          disabled={loading}
        >
          Save
        </Button>

        <Button
          intent="secondary"
          type="button"
          className="flex-1 text-dark-electric-blue"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
