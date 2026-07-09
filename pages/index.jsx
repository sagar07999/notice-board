import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NoticeCard from "../components/NoticeCard";
import Footer from "../components/Footer";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadNotices() {
    try {
      const res = await axios.get("/api/notices");
      setNotices(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  useEffect(() => {
    const result = notices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(search.toLowerCase()) ||
        notice.category.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(result);
  }, [search, notices]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          📢 College Notice Board
        </h1>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg">Total Notices</h2>
            <h1 className="text-4xl font-bold mt-2">
              {filtered.length}
            </h1>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg">Urgent Notices</h2>
            <h1 className="text-4xl font-bold mt-2">
              {filtered.filter((n) => n.priority === "Urgent").length}
            </h1>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg">Events</h2>
            <h1 className="text-4xl font-bold mt-2">
              {filtered.filter((n) => n.category === "Event").length}
            </h1>
          </div>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Notices */}

        {loading ? (
          <h2 className="text-center text-xl">Loading...</h2>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-semibold">
              No Notices Found
            </h2>
            <p className="text-gray-500 mt-3">
              Click "Add Notice" to create your first notice.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                refresh={loadNotices}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}