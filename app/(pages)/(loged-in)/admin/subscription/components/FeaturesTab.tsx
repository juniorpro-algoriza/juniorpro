import {
  EnhancedTable,
  MainCard,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import { components } from "../../../../../../api-schema";

type Feature =
  components["schemas"]["JuniorPro.Services.DTO.FeatureModels.FeatureModel"];

interface FeaturesTableProps {
  features: Feature[];
}

export function FeaturesTable({ features }: FeaturesTableProps) {
  const featuresList = features || [];

  return (
    <MainCard classname="p-0">
      <div className="p-5">
        <h3 className="font-semibold text-lg flex items-center gap-3">
          Features Available{" "}
          <span className="text-xs px-2 py-1 text-dark-blue-main bg-blue-main/10 rounded-full font-medium">
            {featuresList.length}
          </span>
        </h3>
      </div>
      <EnhancedTable>
        <TableHeader>
          <TableRow className="bg-[#F9FAFB] text-gray-600 border-y border-gray-200 uppercase">
            <TableHead className="h-14 font-semibold min-w-[200px]">
              Feature Name
            </TableHead>
            <TableHead className="h-14 font-semibold min-w-[200px]">
              Description
            </TableHead>
            <TableHead className="h-14 font-semibold min-w-[100px]">Type</TableHead>
            <TableHead className="h-14 font-semibold min-w-[100px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {featuresList.map((feature) => (
            <TableRow key={feature.id} className="border-gray-100">
              <TableCell className="h-20 whitespace-normal break-words">
                {feature.nameEn}
              </TableCell>
              <TableCell className="h-20 whitespace-normal break-words">
                {feature.description}
              </TableCell>
              <TableCell className="h-20 whitespace-normal break-words">
                {feature.type}
              </TableCell>
              <TableCell className="h-20 whitespace-normal break-words">
                {/* Add action buttons here as needed */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </EnhancedTable>
    </MainCard>
  );
}
