import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/dashboard">
        <button className="text-3xl bg-cyan-600 px-3 py-2 rounded-lg">
          Go to Dashboard &rarr;
        </button>
      </Link>
    </div>
  );
}
