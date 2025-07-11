import { pause } from "@/app/_lib/utils";

export default async function Analytics() {
  await pause(3000);

  return (
    <section className="h-96 w-96 border-2 rounded-lg p-4">
      <h2 className="text-xl">Analytics</h2>
    </section>
  );
}
