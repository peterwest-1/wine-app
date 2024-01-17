import { z } from "zod";

//https://stackoverflow.com/a/73825370
export const wineTypes = [
  { value: "Red", label: "Red" },
  { value: "White", label: "White" },
  { value: "Rose", label: "Rose" },
  { value: "WhiteBlend", label: "White Blend" },
  { value: "RedBlend", label: "Red Blend" },
] as const;

type WineTypeType = (typeof wineTypes)[number]["value"];
const wineTypesValues: [WineTypeType, ...WineTypeType[]] = [
  wineTypes[0].value,
  ...wineTypes.slice(1).map((p) => p.value),
];
export const WineType = z.enum(wineTypesValues);
