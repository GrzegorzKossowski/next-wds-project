import { trpc } from "@/trpc/server";

export default async function PollsPage() {
  const data = await trpc.polls.getPolls();

  return (
    <>
      <h2 className="text-2xl mb-4">Polls Page (list)?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap">
        {data ? (
          data.map((poll) => {
            return (
              <div
                key={poll.id}
                className="border border-amber-300 max-w-[350px] md:w-full p-2"
              >
                <div className="text-pink-700">Q: {poll.question}</div>
                <hr className="mb-3" />
                {poll.options.map((option) => {
                  return (
                    <div key={option.id} className="flex">
                      <div className="pr-2">o {option.text}</div>
                      <div className="ml-auto">{option.voteCount}</div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <>Brak sond</>
        )}
      </div>
    </>
  );
}
