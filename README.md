# Cloudflare Worker + GraphQL + Prisma ORM (Preview) + TiDB Serverless(MySQL) 

# 構成
- DB: TiDB Serverless
- ORM: Prisma
- GraphQL: GraphQL Yoga
- バックエンドクラウド: Cloudflare Worker
- デプロイ: Wrangler

# 検討項目
## Contextのパフォーマンス改善
> [https://zenn.dev/chimame/scraps/e9adc89a4f7778]
> 要は無理やりつなぎ直すようにする。これでconnection poolは効かなくなる。そのため、PostgreSQLならばPgBouncerを使用してコネクション数が問題にならないようにする必要がある。
## ポーリング
> [https://zenn.dev/chimame/articles/3e7f0f0f7e783d]
> 最後の connection() を見てくれればわかりますが、ここでデータベースとのコネクションを確立しています。実際のアプリケーションではresolver単位でコネクションを確立するのではなく、GraphQL-Yoga の Context内でコネクションを確立して、各resolverでそれを使うというコードの方がよいです。（むやみにコネクション数を貼るとDBに負荷をかけます。ましてやCloudflare Workersのようなサーバレスだとオートスケールして、、、）
> ただし、これだけだけもデータベースの接続という点では工夫をした方がいいです。いくら1リクエスト単位に接続を確立したとしてもCloudflare Workersのようなサーバレスでオートスケールしていくとコネクション数が膨れ上がる可能性があります。そうなるとデータベースに負荷がかかってしまい、最悪の場合はデータベースがダウンしてしまう可能性があります。そこでPostgreSQLならばPgBouncerのようなPostgreSQLの前に立てるconnection poolingを行うものを使用した方がいいです。ちなみにSupabaseならば標準で提供されているので接続はそちらを使うようにしましょう。

## ユーザ認証
> [https://zenn.dev/poyochan/articles/9f22799853784d]


# コマンド一覧
## GraphQL ローカルサーバ立ち上げ
```
npm run dev
```

## データベース確認
```
npx prisma studio
```

## データベーススキーマ更新
`prisma/schema.prisma`を更新した後は、
```
npx prisma generate
```
で`generated.d.ts`を更新する