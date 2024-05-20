import Sidebar from "@/components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="gradient min-h-screen flex ">
      {/* Sidebar */}
      <div className="h-min-h-screen">
        <Sidebar />
      </div>
      {/* Page */}
      <div className="w-full">{children}</div>
    </main>
  );
};
export default layout;
