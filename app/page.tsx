import Link from "next/link";

const LandingPage = async () => {
  return (
    <main className="gradient min-h-screen flex flex-col justify-between bg-custom-primary p-12 md:px-32">
      <div className="mt-10">
        <h1 className="text-text-color-500 text-5xl font-semibold">
          Feeling Down<span className="ml-2">?</span>
        </h1>
        <h3 className="text-4xl text- font-extralight mt-5 text-text-color-900">
          No one to talk
          <br />
          around?
        </h3>
      </div>
      <div className="flex justify-center">
        <button className="button">
          <Link href="/login" className="px-4 py-3 rounded-xl">
            Let's get Started!
          </Link>
        </button>
      </div>
    </main>
  );
};
export default LandingPage;
