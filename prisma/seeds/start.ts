import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const logData: Prisma.LogCreateInput[] = [
  {
    level: "Info",
    message: "Log from seed test.",
    meta: {}
  }
];

async function main() {
  console.log(`Start seeding ...`);

  for (const l of logData) {
    const log = await prisma.log.create({
      data: l,
    });

    console.log(`Created log with id: ${log.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
