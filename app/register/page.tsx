"use client";

import Link from "next/link";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import toast from "react-hot-toast";
import { registerUserAction } from "@/utils/actions";
import { SelectTypeEnum, UserType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UserType) => registerUserAction(values),
    onSuccess: (data: UserType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
      } else {
        toast.success("User created successfully!!!");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        // form.reset();
        router.push("/login");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const birth = formData.get("birth") as string;
    const gender = formData.get("gender") as string;
    const mood = "unknown" as string;
    const session = 0 as number;
    const gptResponse = "short";
    const values = {
      firstName,
      lastName,
      userName,
      email,
      password,
      birth,
      gender,
      mood,
      session,
      gptResponse,
    };
    mutate(values);
  };

  return (
    <main className="bg-[#111827] min-h-screen py-8 px-8">
      <div className="max-w-sm mx-auto">
        <div className="mx-auto w-[8rem]">
          <img src="2.png" alt="AI Blend" />
        </div>
        <h2 className="text-text-color-100 text-2xl font-bold -mt-4 mb-4 text-center">
          Sign up to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2 max-w-3xl">
          {/* First Name */}
          <InputField name="firstName" type="text" />
          {/* Last Name */}
          <InputField name="lastName" type="text" />
          {/* User Name */}
          <InputField name="userName" type="text" />
          {/* Email */}
          <InputField name="email" type="email" />
          {/* Password */}
          <InputField name="password" type="password" />
          {/* Date of Birth */}
          <InputField name="birth" type="date" />
          {/* Gender */}
          <SelectField values={Object.values(SelectTypeEnum)} />
          <button
            className="bg-[#6366F1] text-white rounded-xl text-lg py-1 w-full hover:bg-[#787aff]  hover:scale-95 transition-all"
            disabled={isPending}
          >
            {isPending ? "Please wait..." : "Register"}
          </button>
          <p className="text-[#9CA3AF] text-sm text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="ml-2 text-secondary-500 text-[#6366F1] font-semibold text-lg hover:text-[#787aff] transition-all"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
export default RegisterPage;
