import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // 日本時間に調整した現在時刻を取得する関数
  const getJSTDate = () => {
    const date = new Date();
    // UTCの時間に9時間を足して日本時間に変換
    return new Date(date.getTime() + 9 * 60 * 60 * 1000);
  };

  // Unitテーブルのシードデータを作成
  const unit1 = await prisma.unit.create({
    data: {
      name: "m",
      createdAt: getJSTDate(),
      updatedAt: getJSTDate(),
    },
  });

  const unit2 = await prisma.unit.create({
    data: {
      name: "y",
      createdAt: getJSTDate(),
      updatedAt: getJSTDate(),
    },
  });

  const unit3 = await prisma.unit.create({
    data: {
      name: "反",
      createdAt: getJSTDate(),
      updatedAt: getJSTDate(),
    },
  });

  // 初期データを追加する他の処理...

  console.log("Data seeding complete.");
  console.log({ unit1, unit2, unit3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
