"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EndSession = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (): any => router.push("/dashboard/feedback-module"),
    onSuccess: () => {
      toast.success("Session has ended successfully!!!");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button hover:cursor-pointer">
          <span className="px-8 py-2 rounded-3xl">End Session</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-400">
        <DialogHeader>
          <DialogTitle>Do you really want to end the session?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <button
            className=" p-2 rounded-lg bg-white text-black hover:cursor-pointer hover:scale-95 transition-all"
            onClick={() => mutate()}
          >
            End Session
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EndSession;
