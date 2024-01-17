"use server";

import { api } from "@/trpc/server";
import WineListClient from "./components/client";
import { WineModelType } from "@/models/wine";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/title";

export default async function Home() {
  const wines = await api.wine.getAll.query();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Title />
        <WineListClient data={wines} />
      </div>
    </div>
  );
}
