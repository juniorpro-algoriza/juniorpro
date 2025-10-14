import { getData } from "./getData";

export const joinProject = async (projectId: number) => {
  try {
    const response = await getData({
      url: "projectjunior/join",
      method: "POST",
      params: { projectId },
    });
    return { success: true, data: response };
  } catch (error: unknown) {
    console.error("Error joining project:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to join project" };
  }
};
