"use client";
import { Mic, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { generateResponseAction } from "@/utils/actions";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ChangeMoodPromt from "./ChangeMoodPromt";
import ChangePageDialog from "./ChangePageDialog";
import { useAppSelector } from "@/hooks";

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const ChatResponse = () => {
  const showDialogBox = useAppSelector((state) => state.dialog.showDialogBox);
  const gptResponse = localStorage.getItem("gptResponse") as string;
  const mood = localStorage.getItem("mood") as string;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [countPromts, setCountPromts] = useState<number>(0);
  const [animationShown, setAnimationShown] = useState<boolean[]>([]);

  // Use Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (query: any) =>
      generateResponseAction({ messages: [...messages, query], gptResponse }),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong!!!");
        return;
      }
      setMessages((prev: any) => [...prev, data]);
    },
  });

  // Show Animation
  const handleAnimationComplete = (index: number) => {
    setAnimationShown((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Split Strings
  const splitStringUsingRegex = (inputString: string): string[] => {
    const characters: string[] = [];
    const regex = /[\s\S]/gu;
    let match;
    while ((match = regex.exec(inputString)) !== null) {
      characters.push(match[0]);
    }
    return characters;
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev: any) => [...prev, query]);
    setText("");
    setCountPromts((prev) => prev + 1);
  };

  // Return tsx
  return (
    <div className="grid grid-rows-[1fr,auto] mt-12 gap-y-2">
      {/* Chats */}
      <div
        style={{ scrollbarWidth: "none" }}
        className="h-[350px] flex flex-col justify-center mx-32 p-2 overflow-y-auto"
      >
        {messages.length > 0 ? (
          <div className="flex flex-col gap-y-2 h-full">
            {messages.map((message, index) => {
              const textChars: string[] = splitStringUsingRegex(
                message.content
              );

              return (
                <div
                  key={index}
                  className={`odd:self-end odd:bg-[#61284480] odd:rounded-xl odd:px-4 py-2 even:self-start even:text-text-color-100 `}
                >
                  <motion.p
                    className="text-start"
                    initial="hidden"
                    transition={{ staggerChildren: 0.01 }}
                    whileInView="reveal"
                    animate={animationShown[index] ? "reveal" : "hidden"}
                    onAnimationComplete={() => handleAnimationComplete(index)}
                  >
                    {textChars.map((char) => {
                      return (
                        <motion.span
                          key={char}
                          transition={{ duration: 0.01 }}
                          variants={charVariants}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </motion.p>
                </div>
              );
            })}
            {isPending ? <span className="loading"></span> : null}
          </div>
        ) : (
          <p>
            I understand you're feeling <strong>{mood}</strong>. <br /> Let's
            talk calmly and work through this together. 🌱
          </p>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mx-auto rounded-2xl px-3 flex items-center chat"
      >
        <span className="mr-2">
          <Mic className="text-text-color-900 w-[1.2rem]" />
        </span>
        <input
          type="text"
          name="inputText"
          placeholder="Send a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded-2xl chat outline-none placeholder:text-sm text-sm"
        />
        <button
          type="submit"
          disabled={isPending || text === ""}
          className="group"
        >
          <Send
            className={`text-text-color-900 w-[1.2rem] hover:scale-105 transition-all group-disabled:text-gray-700`}
          />
        </button>
      </form>
      {/* Dialog Box */}
      {countPromts >= 10 && text === "" && <ChangeMoodPromt />}

      {/* Change page confirmation dialog box */}
      {showDialogBox && <ChangePageDialog />}
    </div>
  );
};
export default ChatResponse;
