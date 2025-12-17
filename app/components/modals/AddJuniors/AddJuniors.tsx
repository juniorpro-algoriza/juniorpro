"use client";

import { useState } from "react";
import { Button, DatePicker, Input, Modal } from "@components";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postAddJuniorToContributer } from "../../../(pages)/(loged-in)/contributor/server";
import { z } from "zod";

// Define Zod schema for form validation
const addJuniorSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // gender: z.string().min(1, "Gender is required"), // Not in API schema
  birthDate: z.string().min(1, "Birth Date is required"),
});

export const AddJuniors = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // gender: "", // Unused
    birthDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const router = useRouter();

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

  const handleSave = async () => {
    setSaving(true);
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
      };

      await postAddJuniorToContributer(body);

      toast.success("Junior added successfully!");
      router.refresh();

      // Close modal by removing query param
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("modal");
      window.history.pushState({}, "", currentUrl.toString());

      setFormData({
        username: "",
        email: "",
        password: "",
        birthDate: "",
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
          err instanceof Error ? err.message : "Failed to add junior";
        setGlobalError(message);
        toast.error(message);
      }
    } finally {
      setSaving(false);
    }
  };

  /*
  const genderOptions = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];
  */

  return (
    <Modal panelClassName="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold my-2">Add New Junior</h2>
        <p className="text-gray-500 text-sm">
          create a profile for junior to continue see progress
        </p>
      </div>

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
        {/* 
        <Select
          label="Gender"
          options={genderOptions}
          value={formData.gender}
          onChange={(val) => handleChange("gender", val)}
          placeholder="Gender"
        /> 
        */}

        <DatePicker
          label="Birth Date"
          value={formData.birthDate ? new Date(formData.birthDate) : undefined}
          onChange={(date) =>
            handleChange("birthDate", date ? date.toISOString() : "")
          }
          error={errors.birthDate}
        />
        {globalError && (
          <p className="text-red-500 text-sm text-center">{globalError}</p>
        )}
      </div>

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
    </Modal>
  );
};
