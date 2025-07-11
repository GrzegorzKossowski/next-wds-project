import { pause } from "@/app/_lib/utils";

export default async function AnalyticsDetails() {
  await pause(2500);

  //throw new Error('Settings Data not available')

  return (
    <section className="h-96 w-96 border-2 rounded-lg p-4 bg-yellow-600">
      <h2 className="text-xl">Analytics Common</h2>
    </section>
  );
}
