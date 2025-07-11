import { pause } from "@/app/_lib/utils"

export default async function DefaultAnalytics() {
    await pause(2000)

    return (
        <section className="h-96 w-96 border-2 rounded-lg p-4 bg-purple-700">
            <h2 className="text-xl">Default Analytics</h2>
        </section>
    )
}