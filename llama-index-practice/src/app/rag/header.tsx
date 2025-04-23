import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 w-full bg-slate-400/50 h-16 flex items-center px-10 text-xl font-bold text-slate-700 gap-8">
      <Link
        href="/rag/manual"
        className="border-2 border-slate-700 rounded-md w-36 flex justify-center">
        manual
      </Link>
      <Link
        href="/rag/auto-load"
        className="border-2 border-slate-700 rounded-md w-36 flex justify-center">
        auto-load
      </Link>
      <Link
        href="/rag/math"
        className="border-2 border-slate-700 rounded-md w-36 flex justify-center">
        math
      </Link>
    </div>
  );
}
