import { Breadcrumb } from "@components";
import { BadgeFilters, BadgesList } from "./_components";
import { components } from "../../../../../api-schema";

type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];

const getBadgeTypeParam = (type?: string): BadgeType | undefined => {
  const parsedType = Number(type);

  if ([1, 2, 3, 4].includes(parsedType)) {
    return parsedType as BadgeType;
  }

  return undefined;
};

const BadgesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; type?: string; page?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.query || "";
  const selectedType = getBadgeTypeParam(resolvedSearchParams.type);
  const pageNumber = Math.max(1, Number(resolvedSearchParams.page) || 1);

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Badge Management",
            href: "/admin/badges",
          },
        ]}
      />

      <div className="mt-8">
        <h1 className="text-[32px] font-bold text-yankees-blue">
          Badge Management
        </h1>
        <p className="mt-2 text-lg font-medium text-semi-blue">
          Manage progression levels and unlock requirements for juniors
        </p>
      </div>

      <div className="mt-10 space-y-8">
        <BadgeFilters selectedType={selectedType} />
        <BadgesList
          searchText={searchText}
          selectedType={selectedType}
          pageNumber={pageNumber}
        />
      </div>
    </>
  );
};

export default BadgesPage;
