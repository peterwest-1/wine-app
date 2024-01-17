"use server";

import { api } from "@/trpc/server";
import WineListClient from "./components/client";
import { WineModelType } from "@/models/wine";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const wines = await api.wine.getAll.query();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-5xl font-bold tracking-tight">
            <span className="text-[#B22837]">Vino</span>Vault
          </h2>
          <p className="text-sm font-semibold text-muted-foreground">
            Your Digital Wine Cellar
          </p>
        </div>
        <Separator />
        <WineListClient data={wines} />
      </div>
    </div>
  );
}
