"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Trash2, User, Users, AlertTriangle } from "lucide-react";
import {
  Breadcrumb,
  Button,
  EmptyData,
  Modal,
  Jumbotron,
  Skeleton,
  Input,
  MainCard,
  EnhancedTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import { components } from "../../../../../api-schema";
import {
  useGetProjectManagers,
  useDeleteProjectManager,
} from "../tanstack/project-managers";
import { toast } from "sonner";

type ProjectManagerDetail =
  components["schemas"]["Sawiha.Services.DTO.ProjectMangerModels.ProjectMangerDetailModel"];

const ProjectManagers = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    data: response,
    isLoading,
    error,
  } = useGetProjectManagers({
    pageNumber,
    pageSize: 12,
    searchText: search || undefined,
  });

  const { mutate: deletePM, isPending: isDeleting } = useDeleteProjectManager();

  const projectManagers =
    (response?.data as ProjectManagerDetail[] | undefined) || [];

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deletePM(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Project manager deleted successfully");
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete project manager"),
    });
  };

  const renderTable = () => {
    if (isLoading) {
      return (
        <MainCard classname="p-0 border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <EnhancedTable>
              <TableHeader>
                <TableRow className="bg-gray-50/50 text-gray-500 border-y border-gray-100">
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    NAME
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    EMAIL
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    STATUS
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    ENABLERS
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    JOINED
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index} className="border-y border-gray-100">
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="size-10 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-12" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-28" />
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <Skeleton className="h-8 w-20 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </EnhancedTable>
          </div>
        </MainCard>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 py-10 text-center font-medium">
          Error loading project managers. Please try again.
        </div>
      );
    }

    if (projectManagers.length === 0) {
      return (
        <EmptyData
          icon={<Users className="size-6" />}
          title="No Project Managers Found"
          description={
            search
              ? "No project managers found matching your search."
              : "No project managers have been added yet."
          }
        />
      );
    }

    return (
      <MainCard classname="p-0 border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">
              All Project Managers
            </h3>
            <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
              {projectManagers.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <EnhancedTable>
            <TableHeader>
              <TableRow className="bg-gray-50/50 text-gray-500 border-y border-gray-100">
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  NAME
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  EMAIL
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  STATUS
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  ENABLERS
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  JOINED
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-right">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectManagers.map((pm) => (
                <TableRow
                  key={pm.id}
                  className="group hover:bg-gray-50/30 transition-colors border-gray-200 cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/project-managers/${pm.id}`)
                  }
                >
                  <TableCell className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-purple-main/10 flex items-center justify-center text-xs font-bold text-purple-main border border-purple-main/10">
                        {pm.name ? (
                          pm.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                        ) : (
                          <User className="size-4" />
                        )}
                      </div>
                      <span className="font-bold text-gray-900">
                        {pm.name || "Unknown"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                    {pm.email || "—"}
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        pm.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pm.status || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                    {pm.enablersCount ?? 0}
                  </TableCell>
                  <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                    {pm.joiningDate
                      ? new Date(pm.joiningDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="py-5 px-6 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget({
                          id: pm.id || 0,
                          name: pm.name || "this manager",
                        });
                      }}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </EnhancedTable>
        </div>
      </MainCard>
    );
  };

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/admin/dashboard" },
          { title: "Project Managers", href: "/admin/project-managers" },
        ]}
      />

      <Jumbotron
        title="Project Managers"
        description="Manage project managers, view their enablers and juniors."
        imageClassName="bg-[linear-gradient(135deg,rgba(198,210,255,0.8)0%,rgba(238,242,255,0.8)100%)]"
        imageSrc="/images/handOnHand.svg"
      />

      <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full mb-6">
        <div className="relative min-w-[200px]">
          <Input
            type="text"
            placeholder="search project manager..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            className="pl-10"
            leftIcon={<Search size={16} />}
          />
        </div>
        <Link href="/admin/project-managers/create" className="ml-auto">
          <Button
            intent="main2"
            size="mainDefault"
            icon={<Plus size={18} />}
            className="w-full"
          >
            New Project Manager
          </Button>
        </Link>
      </div>

      {renderTable()}

      {deleteTarget && (
        <Modal
          title="Delete Project Manager"
          onClose={() => setDeleteTarget(null)}
          panelClassName="rounded-3xl max-w-md w-full"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="size-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Are you sure?
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  This will permanently delete{" "}
                  <span className="font-semibold text-gray-700">
                    {deleteTarget.name}
                  </span>
                  . This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <Button
                intent="main"
                size="mainDefault"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                intent="dangerMain"
                size="mainDefault"
                onClick={handleConfirmDelete}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectManagers;
