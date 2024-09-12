import { generate, input, loading, responses } from "./state";
import { signal } from "@preact/signals";

const clicked = signal(false);

function AiChat() {
  return (
    <div
      class={`transition-all duration-700 ease-in-out px-4 ${
        clicked.value
          ? "fixed top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-neutral-800 bg-opacity-20"
          : "bg-opacity-0 transition-none"
      }`}
      onClick={() => {
        // if (e.currentTarget.has)
        clicked.value = !clicked.value;
      }}
      onKeyDown={() => false}
    >
      <div
        class={clicked.value ? "container z-20" : "max-w-max"}
        onClick={(e) => {
          if (clicked.value) e.stopPropagation();
          // if (!clicked.value) clicked.value = true;
        }}
        onKeyDown={() => false}
      >
        <div class={clicked.value ? "bg-sky-50 rounded-3xl" : ""}>
          <div
            class={`transition-all z-0 ${
              clicked.value
                ? " text-center text-3xl text-sky-700 rounded-t-3xl py-2 border-b-2 border-sky-700"
                : "fixed bottom-20 right-6 bg-sky-500 text-neutral-50 py-2 pr-6 pl-4 rounded-full flex items-center"
            }`}
          >
            <WandIcon
              className={`text-neutral-50 transition-transform scale-100 ${
                clicked.value && "scale-0 hidden"
              }`}
            />
            Ask AI Doctor
          </div>
          <div
            class={
              clicked.value
                ? "p-2 min-h-max max-h-96 overflow-y-scroll"
                : "scale-0 min-h-0 p-0"
            }
          >
            <ul class="flex flex-col">
              {responses.value.map((chat) => (
                <li
                  key={chat.index}
                  class={`${
                    chat.type === "gemini" ? geminiChatCls : userChatCls
                  } ${
                    loading.value &&
                    chat.index === responses.value.length - 1 &&
                    chat.type === "gemini"
                      ? "scale-0"
                      : "scale-100"
                  } transition-transform ease-in-out`}
                >
                  {chat.text}
                </li>
              ))}
            </ul>
            <div className="flex container items-center justify-center space-x-2">
              <ChatInput
                placeholder="Enter your Symptoms"
                value={input.value}
                onChange={(e) => {
                  input.value = e.currentTarget.value;
                }}
              >
                <WandIcon />
              </ChatInput>
              <button
                type="button"
                class="flex size-10 items-center justify-center rounded-full bg-sky-500"
                onClick={generate}
              >
                <SendIcon loading={loading.value} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiChat;

const ChatInput = ({
  name,
  placeholder,
  value,
  children,
  onChange,
  ...props
}: {
  value: string;
  name?: string;
  placeholder: string;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div class="container">
    <div class="relative">
      <textarea
        name={name}
        class="container mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  </div>
);

const WandIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    class={`mr-2 size-6 text-neutral-400 ${className}`}
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2L8.6 4.5L10 7zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14zM22 2l-1.4 2.5L22 7l-2.5-1.4L17 7l1.4-2.5L17 2l2.5 1.4zm-8.66 10.78l2.44-2.44l-2.12-2.12l-2.44 2.44zm1.03-5.49l2.34 2.34c.39.37.39 1.02 0 1.41L5.04 22.71c-.39.39-1.04.39-1.41 0l-2.34-2.34c-.39-.37-.39-1.02 0-1.41L12.96 7.29c.39-.39 1.04-.39 1.41 0"
    />
  </svg>
);

const geminiChatCls =
  "my-2 w-max max-w-xs rounded-3xl rounded-es-sm bg-sky-600 px-4 py-1.5 text-neutral-50";
const userChatCls =
  "my-2 w-max max-w-xs rounded-3xl rounded-ee-sm bg-sky-200 px-4 py-1.5 text-end text-neutral-800 self-end";

const SendIcon = ({ loading = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class={`size-6 ${loading && "animate-spin"} text-neutral-50`}
    viewBox="0 0 24 24"
  >
    {loading ? (
      <path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8" />
    ) : (
      <path fill="currentColor" d="m2 21l21-9L2 3v7l15 2l-15 2z" />
    )}
  </svg>
);
