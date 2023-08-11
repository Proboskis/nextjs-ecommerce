import prismaDatabase from "@/lib/prismadb";

import {BillboardClient} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/client";

const BillboardPage = async ({
    params
} : {
    params: { billboardId: string }
}) => {
    // const billboard = await prismaDatabase.billboard.findUnique({
    //     where: {
    //         id: params.billboardId
    //     }
    // });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardPage;
