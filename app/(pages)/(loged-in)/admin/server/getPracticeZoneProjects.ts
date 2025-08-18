"use server";

import { Project } from "@types";
export const getPracticeZoneProjects = async (): Promise<Project[]> => {
  return [
    {
      id: "1",
      title: "Python Turtle Graphics",
      imageUrl: "/images/featued-Project-image.svg",
      description: "",
      rating: 0,
      projectType: "coding",
      isFree: true,
      status: "active",
      juniorsCount: 12,
    },
    {
      id: "3",
      title: "Python Turtle Graphics",
      imageUrl: "/images/featued-Project-image.svg",
      description: "",
      rating: 0,
      projectType: "coding",
      isFree: true,
      status: "active",
      juniorsCount: 12,
    },
    {
      id: "2",
      title: "Python Turtle Graphics",
      category: "Building Your First Website with Flask (Part 1,2,3)",
      imageUrl: "/images/featued-Project-image.svg",
      description: "",
      rating: 0,
      projectType: "coding",
      isFree: true,
      status: "active",
      juniors: [
        "Ali",
        "Sara",
        "Omar",
        "Lina",
        "Ahmed",
        "Mona",
        "Hassan",
        "Yara",
        "Tarek",
        "Nour",
        "Farah",
        "Mostafa",
      ],
      juniorsCount: 12,
    },
  ];
};
