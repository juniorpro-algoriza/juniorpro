import { getData } from "./getData";

export const joinProject = async (projectId: number) => {
  try {
    const response = await getData({
      url: "projectjunior/join",
      method: "POST",
      params: { projectId },
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error joining project:", error);
    return { success: false, error: error.message || "Failed to join project" };
  }
};