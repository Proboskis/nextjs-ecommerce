import prismaDatabase from "@/lib/prismadb";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismaDatabase.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-8"></div>
    </div>
  );
};

export default BillboardPage;
