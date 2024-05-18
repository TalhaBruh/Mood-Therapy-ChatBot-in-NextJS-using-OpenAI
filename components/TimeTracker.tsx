"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TimeTracker = () => {
  const userSessionTime: number = parseInt(
    localStorage.getItem("session") as string
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionTime, setSessionTime] = useState<number | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [askedForAdditionalTime, setAskedForAdditionalTime] = useState(false);
  const router = useRouter();

  const formatTime = (milliseconds: number) => {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  useEffect(() => {
    const storedSessionTime = localStorage.getItem("session");
    if (storedSessionTime) {
      setSessionTime(parseInt(storedSessionTime));
    }

    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      sessionTime &&
      elapsedTime >= sessionTime * 60000 &&
      !sessionEnded &&
      askedForAdditionalTime
    ) {
      setSessionEnded(true);
      toast.success("Session has ended.");
      router.push("/dashboard/feedback-module");
      setAskedForAdditionalTime(false);
    } else if (
      sessionTime &&
      elapsedTime >= sessionTime * 60000 &&
      !sessionEnded &&
      !askedForAdditionalTime
    ) {
      const addTime = confirm(
        "Do you want to add additional time to the session?"
      );
      if (addTime) {
        setSessionEnded(false); // Reset sessionEnded flag
        setAskedForAdditionalTime(true);
        const newSessionTime = sessionTime + userSessionTime;
        setSessionTime(newSessionTime);
      } else {
        setSessionEnded(true);
        toast.success("Session has ended.");
        router.push("/dashboard/feedback-module");
      }
    }
  }, [sessionTime, elapsedTime, sessionEnded, askedForAdditionalTime]);

  const { hours, minutes, seconds } = formatTime(elapsedTime);

  return (
    <div className="flex flex-col mt-2 items-center">
      <span className="text-sm mb-[3px]">Session Length</span>
      <button className="button hover:cursor-pointer w-[8rem]">
        <span className="rounded-xl">
          {hours} : {minutes} : {seconds}
        </span>
      </button>
    </div>
  );
};
export default TimeTracker;
