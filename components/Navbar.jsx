import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          📢 Notice Board
        </Link>

        <div className="flex gap-4">

          <Link
            href="/"
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Home
          </Link>

          <Link
            href="/notices/create"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            Add Notice
          </Link>

        </div>

      </div>
    </nav>
  );
}