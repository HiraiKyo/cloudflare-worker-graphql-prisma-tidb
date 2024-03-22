import { PrismaClient } from "@prisma/client";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { connect } from "@tidbcloud/serverless";

const prisma = (connectionString: string) => {
  const connection = connect({ url: connectionString });
  const adapter = new PrismaTiDBCloud(connection);
  const prisma = new PrismaClient({ 
    adapter
   });
  return prisma;
};

// TODO: Userオブジェクトを作成して認証実装
export interface Context {
  db: PrismaClient;
}

// FIXME: https://zenn.dev/poyochan/articles/9f22799853784d
// Prisma ClientをContextに置くのはVSCodeの型チェックを重くするため非推奨だそうなので、グローバル変数で扱います。
// ただTCPの接続の都合上、アクセス毎に毎回接続を構築する必要があるのでここ
export const createContext = (connectionString: string): Context => {
  return {
    db: prisma(connectionString)
  }
}