import prismaDatabase from "@/lib/prismadb";

import {CategoryForm} from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/category-form";

const CategoryPage = async ({
  params,
} : {
  params: { categoryId: string, storeId: string }
}) => {
  const category = await prismaDatabase.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  const billboards = await prismaDatabase.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-8">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
