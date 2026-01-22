"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "../server";

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment,
  });
};
