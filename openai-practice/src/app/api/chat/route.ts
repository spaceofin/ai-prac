import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      store: true,
      messages: [{ role: "user", content: "generate a funny joke about AI" }],
    });

    console.log(completion.choices[0].message);

    return Response.json({ message: completion.choices[0].message });
  } catch (error) {
    return Response.json(
      { error: "Response message generation failed" },
      { status: 500 }
    );
  }
}
