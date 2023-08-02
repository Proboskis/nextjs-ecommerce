import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import prismaDatabase from "@/lib/prismadb";

export default async function ({
    children
}: {
    children: React.ReactNode
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismaDatabase.store.findFirst({
        where: {
            userId: userId
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    );
}