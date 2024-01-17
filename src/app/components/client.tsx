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
import { UserButton } from "@clerk/nextjs";

interface WinesClientProps {
  data: WineModelType[];
}

const WinesClient = ({ data }: WinesClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Wines (${data.length})`}
            description="Manage wines for your collection"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Button onClick={() => router.push(`/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Add Wine
          </Button>
          <UserButton />
        </div>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default WinesClient;
