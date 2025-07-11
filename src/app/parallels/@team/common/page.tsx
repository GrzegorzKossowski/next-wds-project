import { pause } from "@/app/_lib/utils";

export default async function AnalyticsDetails() {
  await pause(2500);

  //throw new Error('Settings Data not available')

  return (
    <section className="h-96 w-96 border-2 rounded-lg p-4 bg-red-600/30">
      <h2 className="text-xl">Team Common</h2>
    </section>
  );
}
