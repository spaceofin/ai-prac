import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 w-full bg-slate-400/50 h-16 flex items-center px-10 text-xl font-bold text-slate-700">
      <Link
        href="/rag/manual"
        className="border-2 border-slate-700 rounded-md px-4">
        manual
      </Link>
    </div>
  );
}
