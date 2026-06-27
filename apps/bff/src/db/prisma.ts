export type PrismaClientPlaceholder = never;

export function getPrismaClient(): PrismaClientPlaceholder {
  throw new Error('Prisma is not installed or configured yet.');
}
