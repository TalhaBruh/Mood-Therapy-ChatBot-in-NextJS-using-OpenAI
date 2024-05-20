import ChatResponse from "@/components/ChatResponse";
import EndSession from "@/components/EndSession";
import TimeTracker from "@/components/TimeTracker";

const DashboardPage = () => {
  return (
    <main className="h-full grid grid-rows-[auto,1fr] text-center text-lg text-text-color-900 py-8">
      {/* End Session */}
      <div className="flex flex-col items-end mr-8">
        <div>
          <EndSession />
          {/* Time Tracker */}
          <TimeTracker />
        </div>
      </div>
      {/* Chat Layout*/}
      <ChatResponse />
    </main>
  );
};
export default DashboardPage;
