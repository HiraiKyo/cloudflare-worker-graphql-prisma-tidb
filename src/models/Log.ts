import { builder } from '../builder'

const LevelEnum = builder.enumType('Level', {
  values: ['Info', 'Warn', 'Error'] as const,
});

export const LogType = builder.prismaObject('Log', {
  fields: (t) => ({
    id: t.exposeInt("id"),
    level: t.expose("level", {
      type: LevelEnum
    }),
    message: t.exposeString("message"),
    meta: t.expose("meta", {
      type: 'JSON',
    })
  }),
})