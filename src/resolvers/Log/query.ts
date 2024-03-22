import { builder } from '../../builder'

builder.queryFields((t) => ({
  logs: t.prismaField({
    type: 'Log',
    nullable: true,
    // resolve: async (_root, _args, ctx) => await ctx.db.log.findFirst({
    resolve: async (query, _, args, ctx) => await ctx.db.log.findMany({ ...query })
  }),
}))