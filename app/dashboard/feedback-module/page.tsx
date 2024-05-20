import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Ratings from "@/components/Ratings";

const FeedbackModulePage = () => {
  return (
    <main className="h-full text-white py-20 px-12 flex flex-col justify-center gap-y-8">
      <Link
        href="/dashboard"
        className="absolute top-8 hover:cursor-pointer hover:scale-110 transition-all"
      >
        <ArrowLeft />
      </Link>
      <div>
        <h1 className="capitalize text-3xl font-bold">How was the session?</h1>
        <p className="mt-8 text-text-color-900">Please rate the session...</p>
      </div>
      <div>
        <Ratings />
      </div>
    </main>
  );
};
export default FeedbackModulePage;
