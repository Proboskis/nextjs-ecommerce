import prismaDatabase from "@/lib/prismadb";

import { ColorClient } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/client";
import { ColorColumn } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/columns";

import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismaDatabase.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
