import { type Context } from "./context";
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "../prisma/generated";
import { DateResolver, JSONResolver } from "graphql-scalars";
import { Prisma } from "@prisma/client";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    JSON: {
      Input: unknown;
      Output: unknown;
    };
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  Context: Context;
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: (ctx) => ctx.db,
    dmmf: Prisma.dmmf
  },
});

builder.queryType();
builder.mutationType();
builder.addScalarType('JSON', JSONResolver);
builder.addScalarType('Date', DateResolver);