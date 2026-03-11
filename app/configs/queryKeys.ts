interface SearchParams {
  SearchText?: string;
}

interface PaginationParams extends SearchParams {
  Id?: number;
  PageNumber?: number;
  PageSize?: number;
}

export const QUERY_KEYS = {
  global: {
    lookup: (url: string) => ["global", "lookup", url] as const,
    userProfile: ["global", "user-profile"] as const,
  },
  admin: {
    features: ["admin", "features"] as const,
    collaborations: {
      all: (params: SearchParams) =>
        ["admin", "collaborations", params] as const,
      byId: (id: number) => ["admin", "collaborations", id] as const,
      detail: (id: number) =>
        ["admin", "collaborations", "detail", id] as const,
      list: ["admin", "collaborations"] as const,
      roles: (collaborationId: number) =>
        ["admin", "collaborations", "roles", collaborationId] as const,
      roleTasks: (params: {
        collaborationId: number;
        pageNumber: number;
        pageSize: number;
        searchText?: string;
        status?: number;
        juniorId?: number;
      }) => ["admin", "collaborations", "role-tasks", params] as const,
      roleAssignedJuniors: (roleId: number) =>
        ["admin", "collaborations", "role-assigned-juniors", roleId] as const,
    },
    packages: {
      all: (params: { SearchText: string; DurationType: "month" | "year" }) =>
        ["admin", "packages", params] as const,
      byId: (id: number) => ["admin", "packages", id] as const,
      list: ["admin", "packages"] as const,
    },
    paths: {
      all: (params: SearchParams) => ["admin", "paths", params] as const,
      byId: (id: number) => ["admin", "paths", id] as const,
      list: ["admin", "paths"] as const,
    },
    missions: {
      all: (params: { SearchText?: string; Id?: number }) =>
        ["admin", "missions", params] as const,
      byId: (id: number) => ["admin", "missions", id] as const,
      list: ["admin", "missions"] as const,
    },
  },
  contributor: {
    subscription: ["contributor", "subscription"] as const,
    juniors: ["contributor", "juniors"] as const,
    packages: (params: {
      SearchText: string;
      DurationType: "month" | "year";
    }) => ["contributor", "packages", params] as const,
  },
  junior: {
    collaborations: {
      all: (params: SearchParams) =>
        ["junior", "collaborations", params] as const,
      list: ["junior", "collaborations"] as const,
      detail: (id: number) =>
        ["junior", "collaborations", "detail", id] as const,
      roles: (collaborationId: number) =>
        ["junior", "collaborations", "roles", collaborationId] as const,
      roleTasks: (params: {
        collaborationId: number;
        pageNumber: number;
        pageSize: number;
        searchText?: string;
        status?: number;
      }) => ["junior", "collaborations", "role-tasks", params] as const,
      roleTaskDetail: (id: number) =>
        ["junior", "collaborations", "role-task-detail", id] as const,
    },
    paths: {
      all: (params: SearchParams) => ["junior", "paths", params] as const,
      byId: (id: number) => ["junior", "paths", id] as const,
      mission: (params: PaginationParams) =>
        ["junior", "paths", "mission", params] as const,
      missionsList: ["junior", "paths", "mission"] as const,
      current: ["junior", "paths", "current"] as const,
      currentById: (id: number) => ["junior", "paths", "current", id] as const,
      currentMission: (params: PaginationParams) =>
        ["junior", "paths", "current-mission", params] as const,
      currentMissionById: (id: number) =>
        ["junior", "paths", "current-mission", id] as const,
      currentMissionList: ["junior", "paths", "current-mission"] as const,
      list: ["junior", "paths"] as const,
    },
  },
} as const;
