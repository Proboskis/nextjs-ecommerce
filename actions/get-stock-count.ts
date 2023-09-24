import prismaDatabase from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismaDatabase.product.count({
    where: {
      storeId,
      isArchived: false
    }
  });

  return stockCount;
};