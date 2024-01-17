import { api } from "@/trpc/server";
import { WineForm } from "./components/wine-form";
import Title from "@/components/title";

const WinePage = async ({ params }: { params: { wineId: string } }) => {
  const wine =
    params.wineId == "new"
      ? null
      : await api.wine.findUnique.query({
          id: parseInt(params.wineId),
        });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Title />
        <WineForm initialData={wine} />
      </div>
    </div>
  );
};

export default WinePage;
