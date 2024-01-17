"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";
import { ArrowUpDown, MoreHorizontal, Wine } from "lucide-react";
import { WineModelType } from "@/models/wine";
import { wineVarietals } from "@/models/wine-varietal";

export const columns: ColumnDef<WineModelType>[] = [
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "varietal",
    header: "Varietal",
    cell: ({ row }) => {
      const varietal1 = row.getValue("varietal") as any;

      const varietalLabel = wineVarietals.find(
        (varietal) => varietal.value === (varietal1 as any),
      );

      return <div className="w-24 text-center">{varietalLabel?.label}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as any;

      return <WineRating rating={rating} />;
    },
  },
  {
    accessorKey: "consumed",
    header: "Consumed",
    cell: ({ row }) => {
      const res = row.getValue("consumed");
      if (res == null) {
        return null;
      }
      return res ? "Yes" : "No";
    },
  },
  {
    accessorKey: "consumedAt",
    header: "Consumed On",
    cell: ({ row }) => {
      if (row.getValue("consumedAt") == null) {
        return null;
      }
      const date = new Date(row.getValue("consumedAt"));

      const value = format(date, "dd/LL/yy ");
      return <div className="w-24 text-center">{value}</div>;
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue("createdAt"));
  //     const value = format(date, "dd/LL/yy ");
  //     return <div className="w-24 text-center">{value}</div>;
  //   },
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue("updatedAt"));
  //     const value = format(date, "dd/LL/yy ");
  //     return <div className="w-24 text-center">{value}</div>;
  //   },
  // },
];
const WineRating = ({ rating }: { rating: number }) => {
  const generateWineElements = () => {
    const wineElements = [];

    for (let i = 0; i < rating; i++) {
      wineElements.push(<Wine key={i} />);
    }
    return wineElements;
  };

  return <div className="flex flex-row">{generateWineElements()}</div>;
};
