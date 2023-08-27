import {PrismaClient} from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

const prismaDatabase = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismaDatabase;

export default prismaDatabase;