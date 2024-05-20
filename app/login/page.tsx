"use client";

import Link from "next/link";
import InputField from "@/components/InputField";
import toast from "react-hot-toast";
import { loginUserAction } from "@/utils/actions";
import { UserLoginType, UserType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UserLoginType) => loginUserAction(values),
    onSuccess: (data: UserType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
        return;
      }

      localStorage.setItem("userName", data.userName);
      localStorage.setItem("mood", data.mood);
      localStorage.setItem("session", data.session.toString());
      localStorage.setItem("gptResponse", data.gptResponse);

      queryClient.invalidateQueries({ queryKey: ["users"] });
      // form.reset();
      if (data.mood === "unknown" || data.session === 0) {
        toast.success("User logged in successfully!!!");
        router.push("/mood");
        return;
      }
      toast.success(`You are currently in ${data.mood} mood`);
      toast.success("User logged in successfully!!!");
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;
    const values = {
      userName,
      password,
    };
    mutate(values);
  };

  return (
    <main className="bg-[#111827] min-h-screen py-32 px-8">
      <div className="max-w-sm mx-auto ">
        <div className="mx-auto w-[8rem]">
          <img src="2.png" alt="AI Blend" />
        </div>
        <h2 className="text-text-color-100 text-2xl font-bold -mt-3 my-4 text-center">
          Sign in to your account
        </h2>
        <form className="space-y-4 max-w-3xl" onSubmit={handleSubmit}>
          {/* User Name */}
          <InputField name="userName" type="text" />
          {/* Password */}
          <InputField name="password" type="password" />

          <button
            className="bg-[#6366F1] text-white rounded-xl text-lg py-1 w-full hover:bg-[#787aff]  hover:scale-95 transition-all"
            disabled={isPending}
          >
            {isPending ? "Please wait..." : "Login"}
          </button>
          <p className="text-[#9CA3AF] text-sm text-center">
            Don't have an account?
            <Link
              href="/register"
              className="ml-2 text-secondary-500 text-[#6366F1] font-semibold text-lg hover:text-[#787aff] transition-all"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
export default LoginPage;
