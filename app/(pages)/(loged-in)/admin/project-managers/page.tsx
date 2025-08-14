export const dynamic = "force-dynamic";

import { getProductManagerData } from "../../../../server/admin/getProductManagerData";

import { ProductManagerHeader } from "./components/ProductManagerHeader";
import ProductManagerStats from "./components/ProductManagerStats";
import { ProductManagerTable } from "./components/ProductManagerTable";

const AdminProductManager = async () => {
  const productManagerData = await getProductManagerData();

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProductManagerHeader />

      <ProductManagerStats />

      <ProductManagerTable productManagerData={productManagerData} />
    </div>
  );
};

export default AdminProductManager;
