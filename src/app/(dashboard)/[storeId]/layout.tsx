import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import prismaDatabase from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function dashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {storeId: string}
}) {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismaDatabase.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return(
      <>
          <div>
              <Navbar />
              {children}
          </div>
      </>
    );
}