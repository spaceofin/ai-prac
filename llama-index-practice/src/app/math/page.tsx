import { mathAgent } from "./mathAgent";

export default async function MathPage() {
  const question = "How much is 5 + 5? then divide by 2";
  const response = await mathAgent.run(question);
  const answer = response.data as unknown as { result: string };

  // console.log(response);

  return (
    <div className="bg-gray-200 rounded-md m-10 py-5 px-8 h-72 w-1/2 ">
      <p className="text-2xl font-bold">{question}</p>
      <p className="py-2">{answer.result}</p>
    </div>
  );
}
