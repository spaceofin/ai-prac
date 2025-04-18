import React from "react";

const baseUrl = process.env.API_BASE_URL;

export default async function ChatPage() {
  const res = await fetch(`${baseUrl}/api/chat`);
  const data = await res.json();

  return (
    <div className="bg-gray-200 rounded-md m-10 py-5 px-8 h-72 w-1/2 ">
      <h1 className="text-2xl font-bold">OpenAI Response</h1>
      <p className="py-2">
        {data.error ? `Error: ${data.error}` : data.message.content}
      </p>
    </div>
  );
}
