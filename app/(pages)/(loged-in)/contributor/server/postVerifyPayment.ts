"use server";

import { createServerFetch } from "../../../../server/lib/customFetch";

export async function verifyPayment(sessionId: string) {
  const fetchFn = await createServerFetch();

  try {
    const response = await fetchFn("/api/payments/confirm", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment verification failed:", response.status, errorText);
      throw new Error(`Payment verification failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    throw error;
  }
}
