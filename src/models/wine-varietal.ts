import { z } from "zod";

//https://stackoverflow.com/a/73825370
export const wineVarietals = [
  { value: "CabernetSauvignon", label: "Cabernet Sauvignon" },
  { value: "Merlot", label: "Merlot" },
  { value: "Shiraz", label: "Shiraz" },
  { value: "CheninBlanc", label: "Chenin Blanc" },
  { value: "SauvignonBlanc", label: "Sauvignon Blanc" },
  { value: "Verdelho", label: "Verdelho" },
  { value: "Chardonnay", label: "Chardonnay" },
  { value: "Durif", label: "Durif" },
] as const;

type WineVarietalType = (typeof wineVarietals)[number]["value"];
const wineVarietalsValues: [WineVarietalType, ...WineVarietalType[]] = [
  wineVarietals[0].value,
  ...wineVarietals.slice(1).map((p) => p.value),
];
export const WineVarietal = z.enum(wineVarietalsValues);
