"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logoutAction } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Logout = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (): any => logoutAction(),
    onSuccess: () => {
      toast.success("User logged out successfully!!!");
      router.push("/login");
      localStorage.clear();
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button hover:cursor-pointer">
          <span className="px-8 py-2 rounded-3xl">Logout</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-400">
        <DialogHeader>
          <DialogTitle>Do you really want to logout?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <button
            className=" p-2 rounded-lg bg-white text-black hover:cursor-pointer hover:scale-95 transition-all"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? "Logging out" : "Logout"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Logout;
