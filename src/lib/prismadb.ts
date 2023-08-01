import {PrismaClient} from "@prisma/client/extension";

declare global {
    let prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prismadb;