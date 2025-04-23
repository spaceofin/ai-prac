import { tool } from "llamaindex";
import { z } from "zod";

export const sumNumbers = tool({
  name: "sumNumbers",
  description: "Use this function to sum two numbers",
  parameters: z.object({
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
  }),
  execute: ({ a, b }: { a: number; b: number }) => `${a + b}`,
});

export const divideNumbers = tool({
  name: "divideNumbers",
  description: "Use this function to divide two numbers",
  parameters: z.object({
    a: z.number().describe("The dividend a to divide"),
    b: z.number().describe("The divisor b to divide by"),
  }),
  execute: ({ a, b }: { a: number; b: number }) => `${a / b}`,
});
