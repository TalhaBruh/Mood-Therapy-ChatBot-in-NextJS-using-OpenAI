"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sessionRatingType } from "@/utils/types";
import { sessionRatingAction } from "@/utils/actions";
import toast from "react-hot-toast";
import ratings from "@/utils/rating";

const Ratings = () => {
  const userName = localStorage.getItem("userName") as string;
  const [currentRating, setCurrentRating] = useState<number>(10);
  const [review, setReview] = useState<string>("");

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: sessionRatingType) => sessionRatingAction(values),
    onSuccess: (data: sessionRatingType | { error: string }) => {
      if ("error" in data) {
        toast.error(data?.error);
        // router.push("/login");
        return;
      }
      toast.success("Rating saved successfully!!!");
      // form.reset();
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentRating === 0 || review === "") {
      toast.error("Please add review and select rating...");
      return;
    }
    const values = {
      userName,
      rating: currentRating,
      review,
    };
    mutate(values);
  };
  return (
    <main className="max-w-3xl flex flex-col">
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 mb-4">
        {ratings?.map((rating) => {
          return (
            <button
              key={rating.id}
              className={`max-w-64 rounded-xl border-[1px] px-8 xl:px-12 py-3 transition-all ${
                currentRating === rating.rating
                  ? "text-blue-600 border-blue-600"
                  : "text-text-color-900 border-text-color-900"
              }`}
              onClick={() => setCurrentRating(rating.rating)}
            >
              {rating.title}
            </button>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="textArea" className="mb-2">
          Review:
        </label>
        <textarea
          name="textArea"
          id="textArea"
          placeholder="How was the session..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="bg-[#1D2432] outline-none rounded-lg focus:border-2 focus:border-[#6366F1] p-2"
        />
        <button
          type="submit"
          className="self-center mt-8 max-w-56 rounded-xl capitalize px-8 xl:px-16 py-2 hover:bg-custom-btn-500 transition-all bg-custom-btn-900 "
        >
          Save
        </button>
      </form>
    </main>
  );
};
export default Ratings;
