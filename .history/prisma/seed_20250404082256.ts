import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // Unitテーブルのダミーデータを作成
  const unit1 = await prisma.unit.create({
    data: {
      name: "m",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const unit2 = await prisma.unit.create({
    data: {
      name: "y",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const unit3 = await prisma.unit.create({
    data: {
      name: "反",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // 初期データを追加する他の処理...

  console.log("Data seeding complete.");
}

main()
  .catch((err) => {
    console.error("Error seeding data:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
