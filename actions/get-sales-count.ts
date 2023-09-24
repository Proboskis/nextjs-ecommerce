import prismaDatabase from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismaDatabase.order.count({
    where: {
      storeId,
      isPaid: true
    }
  });

  return salesCount;
};