import { signal } from "@preact/signals";
import { GoogleGenerativeAI } from "@google/generative-ai";

const index = signal(0);

type Chat = {
  index: number;
  text: string;
  type?: "user" | "gemini";
};

export const input = signal("");
export const responses = signal<Chat[]>([]);
export const loading = signal(false);

const genAI = new GoogleGenerativeAI(
  "AIzaSyAoKa6mpRuLoxYLX_AKDpgit1WdUgIVF4Y",
  // add your api key here
);

export const generate = async () => {
  if (!input.value) return;

  try {
    responses.value = responses.value.concat({
      index: index.value++,
      text: input.value,
      type: "user",
    });

    loading.value = true;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(input.value);
    input.value = "";
    const response = result.response;
    const text = response.text();
    console.log(text);
    responses.value = responses.value.concat({
      index: index.value++,
      text,
      type: "gemini",
    });

    loading.value = false;
  } catch (error) {
    console.log(error);
    console.log("Something Went Wrong");
    loading.value = false;
  }
};
