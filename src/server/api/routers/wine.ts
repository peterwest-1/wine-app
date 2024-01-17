import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { WineFormSchema } from "@/models/wine";

export const wineRouter = createTRPCRouter({
  create: publicProcedure
    .input(WineFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.wine.create({
        data: {
          ...input,
        },
      });
    }),
  update: publicProcedure
    .input(z.object({ id: z.number(), wine: WineFormSchema }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.wine.update({
        where: { id: input.id },
        data: { ...input.wine },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.wine.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  findUnique: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.wine.findUnique({
        where: { id: input.id },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.wine.delete({
        where: { id: input.id },
      });
    }),
});
