"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { WineModelType } from "@/models/wine";

interface WinesClientProps {
  data: WineModelType[];
}

const WinesClient = async ({ data }: WinesClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Wines (${data.length})`}
          description="Manage wines for your collection"
        />
        <Button onClick={() => router.push(`/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add Wine
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default WinesClient;
