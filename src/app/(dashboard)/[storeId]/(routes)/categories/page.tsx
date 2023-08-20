import prismaDatabase from "@/lib/prismadb";

import {CategoryClient} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/client";
import {CategoryColumn} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/columns";

import {format} from "date-fns";

const CategoriesPage = async ({
    params
} : {
    params: { storeId: string }
}) => {
    const categories = await  prismaDatabase.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        label: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
