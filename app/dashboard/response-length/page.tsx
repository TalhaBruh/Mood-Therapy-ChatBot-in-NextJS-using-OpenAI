import ResponseLength from "@/components/ResponseLength";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ChangeResponseLengthPage = () => {
  return (
    <main className="h-full text-white py-20 px-12  flex flex-col justify-center gap-y-8">
      <Link
        href="/dashboard"
        className="absolute top-8 hover:cursor-pointer hover:scale-110 transition-all"
      >
        <ArrowLeft />
      </Link>
      <div>
        <h1 className="capitalize text-3xl font-bold">
          select your response length?
        </h1>
        <p className="mt-8 text-text-color-900">
          Dr.Luma will responses length to your questions are based on the
          following settings
        </p>
      </div>
      <div>
        <ResponseLength />
      </div>
    </main>
  );
};
export default ChangeResponseLengthPage;
