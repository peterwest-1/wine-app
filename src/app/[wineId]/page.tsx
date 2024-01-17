import { api } from "@/trpc/server";
import { WineForm } from "./components/wine-form";

const WinePage = async ({ params }: { params: { wineId: string } }) => {
  if (params.wineId == "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <WineForm initialData={null} />
        </div>
      </div>
    );
  }
  const wine = await api.wine.findUnique.query({
    id: parseInt(params.wineId),
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WineForm initialData={wine} />
      </div>
    </div>
  );
};

export default WinePage;
