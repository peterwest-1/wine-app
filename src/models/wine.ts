import { z } from "zod";

import { WineModel } from "prisma/zod";
import { WineVarietal } from "./wine-varietal";
import { WineType } from "./wine-type";

export type WineModelType = z.infer<typeof WineModel>;

// export const WineFormSchema = WineModel.omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
// });

// export const WineFormSchema = z.object({
//   name: z.string(),
//   type: WineVarietal,
//   length: WineType,
//   rating: z.coerce.number(),
//   consumed: z.boolean().default(false),
//   openedAt: z.date().nullish(),
// });

export const WineFormSchema = z.object({
  name: z.string(),
  type: z.string(),
  varietal: z.string(),
  year: z.coerce.number().max(2024),
  rating: z.coerce.number().min(1).max(5).nullish(),
  consumed: z.boolean().nullish(),
  consumedAt: z.date().nullish(),
});
