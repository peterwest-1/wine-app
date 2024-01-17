import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";

type Props = {};

const Title = ({}: Props) => {
  return (
    <div>
      <Link href={"/"}>
        <h2 className="text-5xl font-bold tracking-tight">
          <span className="text-[#B22837]">Vino</span>Vault
        </h2>
        <p className="text-sm font-semibold text-muted-foreground">
          Your Digital Wine Cellar
        </p>
      </Link>
      <Separator className="mt-2" />
    </div>
  );
};

export default Title;
