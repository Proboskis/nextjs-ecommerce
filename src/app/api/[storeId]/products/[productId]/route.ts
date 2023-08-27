import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import prismaDatabase from "@/lib/prismadb";

export async function GET(
  request: Request,
  {params}: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", {status: 400});
    }

    const product = await prismaDatabase.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function PATCH(
  request: Request,
  {params}: { params: { storeId: string; productId: string } }
) {
  try {
    const {userId} = auth();
    const body = await request.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!name) {
      return new NextResponse("Name is required", {status: 400});
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", {status: 400});
    }

    if (!price) {
      return new NextResponse("Price is required", {status: 400});
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", {status: 400});
    }

    if (!sizeId) {
      return new NextResponse("size id is required", {status: 400});
    }

    if (!colorId) {
      return new NextResponse("Color id is required", {status: 400});
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", {status: 400});
    }

    const storeByUserId = await prismaDatabase.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    // This check is to prevent users from modifying stores that are not their own
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {status: 403});
    }

    await prismaDatabase.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived
      }
    });

    const product = await prismaDatabase.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function DELETE(
  request: Request,
  {params}: { params: { StoreId: string; productId: string } }
) {
  try {
    const {userId} = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", {status: 400});
    }

    const storeByUserId = await prismaDatabase.store.findFirst({
      where: {
        id: params.StoreId,
        userId
      }
    });

    // This check is to prevent users from modifying stores that are not their own
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {status: 403});
    }

    const product = await prismaDatabase.product.deleteMany({
      where: {
        id: params.productId
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
