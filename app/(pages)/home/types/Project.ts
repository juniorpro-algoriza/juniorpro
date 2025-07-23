export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  rating: number;
  projectType: "web" | "team" | "solo" | "coding";
  isFree: boolean;
};
