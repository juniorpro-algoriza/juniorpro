// TODO: why???
// export const dynamic = "force-dynamic";

import { getProductManagerData } from "../server/getProductManagerData";
import {
  ProductManagerHeader,
  ProductManagerStats,
  ProductManagerTable,
} from "./components";

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
