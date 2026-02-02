export type StatusState = "full" | "filled" | "open";

export interface Role {
  id: number;
  title: string;
  description: string;
  statusLabel: string;
  statusState: StatusState;
  tools: string[];
  mentor: {
    name: string;
    role: string;
    initials: string;
  };
  responsibilities: string[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Not Started" | "In Progress" | "Submitted";
  priority: "High" | "Medium" | "Low";
  assignee: { name: string; initials: string } | null;
  dueDate: string;
}

export interface Collaboration {
  id: number;
  title: string;
  description: string;
  progress?: number;
  reward: {
    amount: number;
    currency: string;
  };
  dueDate: string;
  rolesCount: {
    open: number;
    total: number;
  };
  requirements: string[];
  features: string[];
  guidelines: string[];
  roles: Role[];
  tasks: Task[];
  status: "open" | "joined" | "completed";
}

export const JUNIOR_COLLABORATIONS: Collaboration[] = [
  {
    id: 1,
    title: "E-Commerce Re-platforming",
    description:
      "Help us migrate our legacy store to a modern Next.js architecture.",
    progress: 45,
    reward: { amount: 1200, currency: "SAR" },
    dueDate: "15 April 2024",
    rolesCount: { open: 0, total: 6 },
    status: "joined",
    requirements: [
      "Proficient in React and Next.js",
      "Experience with Tailwind CSS",
      "Understanding of RESTful APIs",
      "Knowledge of State Management (Zustand/Redux)",
    ],
    features: [
      "Implement a fully responsive product catalog",
      "Build a secure checkout experience with Stripe",
      "Optimize performance for core web vitals",
      "Integrate with a headless CMS for content management",
    ],
    guidelines: [
      "Follow the established ESLint and Prettier configurations",
      "Write unit tests for all new utility functions",
      "Daily stand-ups at 10:00 AM AST",
      "PRs must be reviewed by the assigned mentor",
    ],
    roles: [
      {
        id: 1,
        title: "Frontend Developer",
        description: "Focus on UI/UX implementation and accessibility.",
        statusLabel: "2/2 Full",
        statusState: "full",
        tools: ["React", "Next.js", "Tailwind"],
        mentor: {
          name: "Ahmed Ali",
          role: "Senior Frontend Engineer",
          initials: "AA",
        },
        responsibilities: [
          "Implement product grid",
          "Optimize image loading",
          "Create checkout flow",
        ],
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Setup Next.js Boilerplate",
        description:
          "Configure the initial project structure and dependencies.",
        status: "Submitted",
        priority: "High",
        assignee: { name: "Ahmed Ali", initials: "AA" },
        dueDate: "10 Jan 2024, 10:00AM",
      },
      {
        id: 2,
        title: "Implement Branding System",
        description: "Convert Figma design tokens into Tailwind configuration.",
        status: "In Progress",
        priority: "Medium",
        assignee: { name: "You", initials: "ME" },
        dueDate: "20 Jan 2024, 02:00PM",
      },
    ],
  },
  {
    id: 2,
    title: "AI Chatbot Integration",
    description:
      "Building an intelligent customer support agent using OpenAI API.",
    reward: { amount: 800, currency: "SAR" },
    dueDate: "20 May 2024",
    rolesCount: { open: 4, total: 8 },
    status: "open",
    requirements: [
      "Basic understanding of Node.js",
      "Familiarity with OpenAI API",
      "Willingness to learn vector databases",
      "Ability to write clean documentation",
    ],
    features: [
      "Real-time streaming responses",
      "Context-aware conversation history",
      "Tool-calling for order tracking",
      "Sentiment analysis for escalation",
    ],
    guidelines: [
      "Avoid leaking sensitive API keys in the code",
      "Document all prompt engineering experiments",
      "Test against diverse user inputs",
    ],
    roles: [
      {
        id: 2,
        title: "Backend Junior",
        description: "Assist in API development and database management.",
        statusLabel: "1/3 Filled",
        statusState: "filled",
        tools: ["Node.js", "Express", "Prisma"],
        mentor: { name: "Sarah Chen", role: "Backend Lead", initials: "SC" },
        responsibilities: [
          "Implement API endpoints",
          "Write unit tests",
          "Manage database schemas",
        ],
      },
      {
        id: 3,
        title: "Prompt Engineer",
        description: "Optimize AI responses and system prompts.",
        statusLabel: "0/2 Open",
        statusState: "open",
        tools: ["GPT-4", "Python"],
        mentor: { name: "John Doe", role: "AI Specialist", initials: "JD" },
        responsibilities: [
          "Test prompt variations",
          "Monitor AI accuracy",
          "Fine-tune bot personality",
        ],
      },
    ],
    tasks: [],
  },
  {
    id: 3,
    title: "Mobile Fitness Tracker",
    description: "Developing a cross-platform app for tracking daily workouts.",
    progress: 100,
    reward: { amount: 1500, currency: "SAR" },
    dueDate: "10 March 2024",
    rolesCount: { open: 0, total: 5 },
    status: "completed",
    requirements: [
      "Experience with React Native or Expo",
      "Basic understanding of health sensors",
      "Familiarity with App Store/Play Store deployment",
    ],
    features: [
      "Native Apple Health and Google Fit sync",
      "Custom animation for workout transitions",
      "Social sharing features",
    ],
    guidelines: [
      "Optimize for battery life",
      "Ensure offline availability for key features",
    ],
    roles: [
      {
        id: 4,
        title: "Native Developer",
        description: "Work on native modules and animations.",
        statusLabel: "2/2 Full",
        statusState: "full",
        tools: ["React Native", "Reanimated"],
        mentor: { name: "Fahad Khan", role: "Mobile Lead", initials: "FK" },
        responsibilities: [
          "Build custom charts",
          "Implement push notifications",
          "Optimize app performance",
        ],
      },
    ],
    tasks: [],
  },
];
