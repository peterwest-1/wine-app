import * as z from "zod"
import * as imports from "../null"

export const WineModel = z.object({
  id: z.number().int(),
  name: z.string(),
  year: z.number().int(),
  type: z.string(),
  varietal: z.string(),
  rating: z.number().nullish(),
  consumed: z.boolean().nullish(),
  consumedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
