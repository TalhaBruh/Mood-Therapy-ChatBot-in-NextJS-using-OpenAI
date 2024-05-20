"use client";
import Link from "next/link";
import sessions from "@/utils/session";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserUpdateType, UserType } from "@/utils/types";
import { updateUserAction } from "@/utils/actions";
import { ArrowLeft } from "lucide-react";

const SessionPage = () => {
  const userName = localStorage.getItem("userName") as string;
  const mood = localStorage.getItem("mood") as string;
  const gptResponse = localStorage.getItem("gptResponse") as string;
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
      toast.success("Values updated successfully!!!");
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("mood", data.mood);
      localStorage.setItem("session", data.session.toString());
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // form.reset();

      router.push("/dashboard");
    },
  });

  const [currentSession, setCurrentSession] = useState<number>(0);
  const handleSubmit = () => {
    const values = {
      userName,
      mood,
      session: currentSession,
      gptResponse,
    };
    mutate(values);
  };

  return (
    <main className="gradient min-h-screen bg-custom-primary">
      <div className="h-screen flex flex-col justify-between px-12 md:px-32 pb-12">
        <Link
          href="/mood"
          className="absolute top-8 hover:cursor-pointer hover:scale-110 transition-all text-text-color-100"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-white text-5xl font-semibold mt-32 leading-snug flex flex-col">
          For how long would you like <br /> the session?
        </h1>
        <div className="flex flex-col justify-center items-center gap-y-14">
          <div className="flex space-x-3 flex-wrap">
            {sessions?.map((session) => {
              return (
                <button
                  key={session.id}
                  className={`text-text-color-500 rounded-xl capitalize px-8 md:px-16 lg:px-16 py-2 hover:bg-custom-secondary-900 transition-all ${
                    currentSession === session.sessionTime
                      ? "bg-custom-secondary-900"
                      : "bg-custom-btn-500"
                  }`}
                  onClick={() => setCurrentSession(session.sessionTime)}
                >
                  {session.session}
                </button>
              );
            })}
          </div>
          <button
            className="button hover:cursor-pointer"
            onClick={handleSubmit}
            disabled={currentSession === 0}
          >
            {userName && mood && currentSession ? (
              <Link href="/dashboard" className="px-8 py-3 rounded-xl">
                Let's get started !
              </Link>
            ) : (
              <span className="px-8 py-3 rounded-xl">Let's get started !</span>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};
export default SessionPage;
