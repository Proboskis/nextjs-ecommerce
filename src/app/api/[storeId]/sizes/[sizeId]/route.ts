import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import prismaDatabase from "@/lib/prismadb";

export async function GET (
    request: Request,
    {params} : {params: {sizeId: string}}
) {
    try {
        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400});
        }

        const size = await prismaDatabase.size.findUnique({
            where: {
                id: params.sizeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH (
    request: Request,
    {params} : {params: {storeId: string, sizeId: string}}
) {
    try {
        const { userId } = auth();
        const body = await request.json();

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400});
        }

        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400});
        }

        const storeByUserId = await prismaDatabase.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        // This check is to prevent users from modifying stores that are not their own
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403});
        }

        const size = await prismaDatabase.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE (
    request: Request,
    {params} : {params: {StoreId: string, sizeId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400});
        }

        const storeByUserId = await prismaDatabase.store.findFirst({
            where: {
                id: params.StoreId,
                userId
            }
        });

        // This check is to prevent users from modifying stores that are not their own
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403});
        }

        const size = await prismaDatabase.size.deleteMany({
            where: {
                id: params.sizeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}