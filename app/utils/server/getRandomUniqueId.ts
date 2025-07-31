"use server";

import { randomUUID } from "crypto";

export const getRandomUniqueId = async () => {
  return randomUUID();
};
