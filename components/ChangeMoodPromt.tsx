import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ChangeMoodPromt = () => {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="bg-gray-400">
        <DialogHeader>
          <DialogTitle>
            How are you feeling now? Do you want to change your mood preference?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Link
            href="/dashboard/mood-preferences"
            className="p-2 rounded-lg bg-white text-black hover:cursor-pointer hover:scale-95 transition-all"
          >
            Change Mood
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ChangeMoodPromt;
