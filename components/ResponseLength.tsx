"use client";
import { gptResponse } from "@/utils/gptResponse";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserUpdateType, UserType } from "@/utils/types";
import { updateUserAction } from "@/utils/actions";
import toast from "react-hot-toast";

const ResponseLength = () => {
  const userName = localStorage.getItem("userName") as string;
  const mood = localStorage.getItem("mood") as string;
  const session = localStorage.getItem("session") as string;
  const previousGptResponse = localStorage.getItem("gptResponse") as string;
  const [currentResponse, setCurrentResponse] = useState<string>(
    previousGptResponse || ""
  );

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
      toast.success("User response value updated successfully!!!");
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
      mood,
      session: Number(session),
      gptResponse: currentResponse,
    };
    mutate(values);
  };
  return (
    <main className="max-w-3xl flex flex-col">
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
        {gptResponse?.map((response) => {
          return (
            <button
              key={response.id}
              className={`max-w-64 rounded-xl border-[1px] capitalize px-8 xl:px-12 py-3 transition-all ${
                currentResponse === response.title
                  ? "text-blue-600 border-blue-600"
                  : "text-text-color-900 border-text-color-900"
              }`}
              onClick={() => setCurrentResponse(response.title)}
            >
              {response.title}
            </button>
          );
        })}
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
export default ResponseLength;
