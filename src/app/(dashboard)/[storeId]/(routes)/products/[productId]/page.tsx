import prismaDatabase from "@/lib/prismadb";

import {ProductForm} from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/product-form";

const ProductPage = async ({
  params,
} : {
  params: { productId: string }
}) => {
  const product = await prismaDatabase.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-8">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
