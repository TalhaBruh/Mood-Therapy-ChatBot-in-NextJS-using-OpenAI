import MoodPreferences from "@/components/MoodPreferences";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ChangeMoodPage = () => {
  return (
    <main className="relative h-full text-white py-20 px-12 flex flex-col justify-center">
      <Link
        href="/dashboard"
        className="absolute top-8 hover:cursor-pointer hover:scale-110 transition-all"
      >
        <ArrowLeft />
      </Link>
      <div>
        <h1 className="capitalize text-3xl font-bold">
          select your mood preferences?
        </h1>
        <p className="mt-8 text-text-color-900">
          Dr.Luma will start the conversation based on your following preference
        </p>
      </div>
      <div>
        <MoodPreferences />
      </div>
    </main>
  );
};
export default ChangeMoodPage;
