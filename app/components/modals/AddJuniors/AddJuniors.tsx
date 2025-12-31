"use client";

import { useState } from "react";
import { Button, DatePicker, Input, Modal, Select } from "@components";
import { Tabs, Tip } from "@components/client";
import { toast } from "sonner";
import { useAddJunior } from "../../../(pages)/(loged-in)/contributor/tanstack/useAddJunior";
import { useInviteJunior } from "../../../(pages)/(loged-in)/contributor/tanstack/useInviteJunior";
import { z } from "zod";
import { Info } from "lucide-react";

// Define Zod schema for form validation
const addJuniorSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string().min(1, "Gender is required"),
  birthDate: z.string().min(1, "Birth Date is required"),
});

// Define Zod schema for invite form validation
const inviteJuniorSchema = z.object({
  email: z.email("Invalid email address"),
});

export const AddJuniors = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
  });

  const [inviteEmail, setInviteEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inviteErrors, setInviteErrors] = useState<Record<string, string>>({});
  const addJuniorMutation = useAddJunior();
  const inviteJuniorMutation = useInviteJunior();
  const saving = addJuniorMutation.isPending;
  const inviting = inviteJuniorMutation.isPending;
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field when changed
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInviteEmailChange = (value: string) => {
    setInviteEmail(value);
    // Clear error for field when changed
    if (inviteErrors.email) {
      setInviteErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    setErrors({});
    setGlobalError(null);
    try {
      // Validate form data
      const validatedData = addJuniorSchema.parse(formData);

      const names = validatedData.username.trim().split(" ");
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || firstName;

      const body = {
        firstName: firstName,
        lastName: lastName,
        email: validatedData.email,
        password: validatedData.password,
        birthDate: validatedData.birthDate
          ? new Date(validatedData.birthDate).toISOString()
          : new Date().toISOString(),
        gender: parseInt(validatedData.gender) as 1 | 2,
      };

      await addJuniorMutation.mutateAsync(body);

      toast.success("Junior added successfully!");

      // Close modal by removing query param
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("modal");
      window.history.pushState({}, "", currentUrl.toString());

      setFormData({
        username: "",
        email: "",
        password: "",
        birthDate: "",
        gender: "",
      });
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const message =
          err instanceof Error
            ? JSON.parse(err.message).errorMessage === "EmailAlreadyExist"
              ? "Email already exists"
              : "Failed to add junior"
            : "Failed to add junior";
        toast.error(message);
      }
    }
  };

  const handleInvite = async () => {
    setInviteErrors({});
    try {
      // Validate invite form data
      const validatedData = inviteJuniorSchema.parse({ email: inviteEmail });

      await inviteJuniorMutation.mutateAsync(validatedData.email);

      toast.success("Invitation sent successfully!");

      // Close modal by removing query param
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("modal");
      window.history.pushState({}, "", currentUrl.toString());

      setInviteEmail("");
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setInviteErrors(fieldErrors);
      } else {
        const message =
          err instanceof Error
            ? JSON.parse(err.message).code === "EMAIL_ALREADY_EXIST"
              ? "Email already exists"
              : "Failed to send invitation"
            : "Failed to send invitation";
        toast.error(message);
      }
    }
  };

  const genderOptions = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];

  return (
    <Modal panelClassName="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold my-2">Add New Junior</h2>
        <p className="text-gray-500 text-sm">
          create a profile for junior to continue see progress
        </p>
      </div>

      <Tabs
        tabListClassName="mb-6 w-full"
        tabs={[
          {
            name: "Invite by Email",
            content: (
              <div className="space-y-4">
                <Input
                  label="Junior's Email Address"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => handleInviteEmailChange(e.target.value)}
                  placeholder="e.g. junior@example.com"
                  helperText="We'll send an invitation email with instructions to set up their account"
                  error={inviteErrors.email}
                />
                <Tip
                  title="What happens next?"
                  description="The junior will receive an email to create their password and complete their profile."
                  icon={<Info />}
                  className="my-4"
                />
                <div className="mt-8">
                  <Button
                    intent="main2"
                    size="mainDefault"
                    onClick={handleInvite}
                    disabled={inviting}
                    className="w-full"
                  >
                    {inviting ? "Sending..." : "Send Invitation"}
                  </Button>
                </div>
              </div>
            ),
          },
          {
            name: "Add Junior",
            content: (
              <div className="space-y-2">
                <Input
                  label="Username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  placeholder="e.g. Ali Ahmed"
                  error={errors.username}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="e.g. ali.ahmed@example.com"
                  error={errors.email}
                />
                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter password"
                  error={errors.password}
                />

                <Select
                  label="Gender"
                  options={genderOptions}
                  value={formData.gender}
                  onChange={(val) => handleChange("gender", val)}
                  placeholder="Gender"
                  error={errors.gender}
                />

                <DatePicker
                  label="Birth Date"
                  value={
                    formData.birthDate
                      ? new Date(formData.birthDate)
                      : undefined
                  }
                  onChange={(date) =>
                    handleChange("birthDate", date ? date.toISOString() : "")
                  }
                  error={errors.birthDate}
                />
                {globalError && (
                  <p className="text-red-500 text-sm text-center">
                    {globalError}
                  </p>
                )}
                <div className="mt-8">
                  <Button
                    intent="main2"
                    size="mainDefault"
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full"
                  >
                    {saving ? "Creating..." : "Create Junior Profile"}
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
        defaultIndex={0}
      />
    </Modal>
  );
};
