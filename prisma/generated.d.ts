/* eslint-disable */
import type { Prisma, Log } from "./client";
export default interface PrismaTypes {
    Log: {
        Name: "Log";
        Shape: Log;
        Include: never;
        Select: Prisma.LogSelect;
        OrderBy: Prisma.LogOrderByWithRelationInput;
        WhereUnique: Prisma.LogWhereUniqueInput;
        Where: Prisma.LogWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}