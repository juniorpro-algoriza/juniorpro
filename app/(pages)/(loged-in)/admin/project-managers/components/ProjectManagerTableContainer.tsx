/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { ProjectManagerTable } from "./ProjectManagerTable";
import { getProjectManagerData } from "../../server";
import { Badge } from "@components";

export const ProjectManagerTableContainer = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const result = await getProjectManagerData();

    const transformed = result.map((pm: any) => ({
      ...pm,
      status: (
        <Badge
          label={pm.status}
          variant={pm.status === "active" ? "green" : "orange"}
        />
      ),
      actionHref: `/admin/project-managers/${pm.id}`,
    }));

    setData(transformed);
    setFilteredData(transformed);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!search) return setFilteredData(data);
    const lower = search.toLowerCase();
    setFilteredData(
      data.filter(
        (pm) =>
          pm.name.toLowerCase().includes(lower) ||
          pm.email.toLowerCase().includes(lower)
      )
    );
  }, [search, data]);

  return (
    <ProjectManagerTable
      projectManagerData={filteredData}
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    />
  );
};
