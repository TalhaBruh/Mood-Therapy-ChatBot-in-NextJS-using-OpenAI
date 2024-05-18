"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updatePath, updateShowDialogBox } from "@/lib/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const ChangePageDialog = () => {
  const router = useRouter();
  const path = useAppSelector((state) => state.dialog.path);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(updateShowDialogBox(false));
  };
  const handleContinue = () => {
    dispatch(updateShowDialogBox(false));
    dispatch(updatePath("/dashboard"));
    router.push(path);
  };

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="bg-gray-400">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has not ended. This will permanently end your session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <button
              className="p-2 rounded-lg bg-white text-black hover:cursor-pointer hover:bg-white hover:scale-95 transition-all"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="p-2 rounded-lg bg-white text-black hover:cursor-pointer hover:bg-white hover:scale-95 transition-all"
              onClick={handleContinue}
            >
              Continue
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ChangePageDialog;
