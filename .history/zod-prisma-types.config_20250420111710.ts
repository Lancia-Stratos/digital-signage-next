import { Config } from "zod-prisma-types";

const config: Config = {
  // Prismaのスキーマファイルのパス
  prismaSchema: "./prisma/schema.prisma",
  // 生成されたzodスキーマの出力先
  outputPath: "./src/schemas/generated",
  // すべてのフィールドを必須として扱う
  useMultipleFiles: true,
  // 日付型をDate型として扱う
  dateTimeAsDate: true,
};

export default config;
