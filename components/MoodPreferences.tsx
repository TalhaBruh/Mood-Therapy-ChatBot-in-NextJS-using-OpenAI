"use client";
import moods from "@/utils/moods";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserUpdateType, UserType } from "@/utils/types";
import { updateUserAction } from "@/utils/actions";

const MoodPreferences = () => {
  const userName = localStorage.getItem("userName") as string;
  const previousMood = localStorage.getItem("mood") as string;
  const session = localStorage.getItem("session") as string;
  const gptResponse = localStorage.getItem("gptResponse") as string;
  const [currentMood, setCurrentMood] = useState<string>(previousMood || "");

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (values: UserUpdateType) => updateUserAction(values),
    onSuccess: (data: UserType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
        router.push("/login");
        return;
      }
      toast.success("User mood updated successfully!!!");
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("mood", data.mood);
      localStorage.setItem("session", data.session.toString());
      localStorage.setItem("gptResponse", data.gptResponse);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // form.reset();

      router.push("/dashboard");
    },
  });

  const handleSubmit = () => {
    const values = {
      userName,
      mood: currentMood,
      session: Number(session),
      gptResponse,
    };
    mutate(values);
  };
  return (
    <main className="max-w-3xl flex flex-col">
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
        {moods?.map((mood) => {
          return (
            <button
              key={mood.id}
              className={`max-w-64 rounded-xl border-[1px] capitalize px-8 xl:px-12 py-3 transition-all ${
                currentMood === mood.mood
                  ? "text-blue-600 border-blue-600"
                  : "text-text-color-900 border-text-color-900"
              }`}
              onClick={() => setCurrentMood(mood.mood)}
            >
              {mood.mood}
            </button>
          );
        })}
        {/* Confused */}
        <button
          className={`max-w-64 rounded-xl border-[1px] capitalize px-8 xl:px-12 py-3 transition-all ${
            currentMood === "confused"
              ? "text-blue-600 border-blue-600"
              : "text-text-color-900 border-text-color-900"
          }`}
          onClick={() => setCurrentMood("confused")}
        >
          Confused
        </button>
        {/* Hopeless */}
        <button
          className={`max-w-64 rounded-xl border-[1px] capitalize px-8 xl:px-12 py-3 transition-all ${
            currentMood === "hopeless"
              ? "text-blue-600 border-blue-600"
              : "text-text-color-900 border-text-color-900"
          }`}
          onClick={() => setCurrentMood("hopeless")}
        >
          Hopeless
        </button>
      </ul>
      <button
        className="self-center mt-16 max-w-56 rounded-xl capitalize px-8 xl:px-16 py-2 hover:bg-custom-btn-500 transition-all bg-custom-btn-900"
        onClick={handleSubmit}
      >
        Save
      </button>
    </main>
  );
};
export default MoodPreferences;
