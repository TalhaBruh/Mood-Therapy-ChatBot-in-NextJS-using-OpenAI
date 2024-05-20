"use client";
import { useState } from "react";
import Link from "next/link";
import moods from "@/utils/moods";
import { ArrowLeft } from "lucide-react";
const MoodPage = () => {
  const [currentMood, setCurrentMood] = useState<string>("");

  const handleMood = (mood: string): void => {
    setCurrentMood(mood);
    localStorage.setItem("mood", mood);
  };

  return (
    <main className="gradient min-h-screen bg-custom-primary">
      <div className="h-screen flex flex-col justify-between px-12 md:px-32 pb-12">
        <Link
          href="/login"
          className="absolute top-8 hover:cursor-pointer hover:scale-110 transition-all text-text-color-100"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-white text-5xl font-semibold mt-32 leading-snug self-end mr-12 flex flex-col">
          <span>How are you feeling</span>
          <span className="self-end">
            right now<span className="ml-2">?</span>
          </span>
        </h1>
        <div className="flex flex-col justify-center items-center gap-y-14">
          <div className="flex space-x-3">
            {moods?.map((mood) => {
              return (
                <button
                  key={mood.id}
                  className={`text-text-color-500 rounded-xl capitalize px-8 md:px-16 lg:px-16 py-2 hover:bg-custom-secondary-900 transition-all ${
                    currentMood === mood.mood
                      ? "bg-custom-secondary-900"
                      : "bg-custom-btn-500"
                  }`}
                  onClick={() => handleMood(mood.mood)}
                >
                  {mood.mood}
                </button>
              );
            })}
          </div>
          <button
            className="button hover:cursor-pointer"
            disabled={currentMood === ""}
          >
            {currentMood ? (
              <Link href="/session" className="px-20 py-3 rounded-xl">
                Next
              </Link>
            ) : (
              <span className="px-20 py-3 rounded-xl">Next</span>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};
export default MoodPage;
