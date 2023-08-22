import prismaDatabase from "@/lib/prismadb";

import { ColorForm } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/color-form";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismaDatabase.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-8">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
