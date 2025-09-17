/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input, Button } from "@components";
import { inviteExistingJunior } from "@server";

export const InviteExistingTab = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    setIsLoading(true);
    try {
      await inviteExistingJunior(email);
      toast.success("Invitation sent successfully!");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input
        label="Junior's Email"
        placeholder="Write here"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full"
      />
      <p className="text-dark-electric-blue text-[13px] font-light">
        We'll send an invitation to this email address. The junior must accept
        the invitation to link accounts.
      </p>
      <Button
        intent="primary"
        className="mt-2"
        onClick={handleInvite}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Invitation"}
      </Button>
    </div>
  );
};
