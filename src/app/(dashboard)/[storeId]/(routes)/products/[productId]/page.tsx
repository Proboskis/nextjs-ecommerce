import prismaDatabase from "@/lib/prismadb";

import { ProductForm } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismaDatabase.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismaDatabase.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismaDatabase.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismaDatabase.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-8">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
