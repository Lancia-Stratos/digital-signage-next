import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // Unitテーブル
  const unit1 = await prisma.unit.create({
    data: {
      name: "Unit 1",
    },
  });

  // ユーザーを作成する例
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: "password1",
      name: "User 1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: "password2",
      name: "User 2",
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
