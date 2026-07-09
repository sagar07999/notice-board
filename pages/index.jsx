import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NoticeCard from "../components/NoticeCard";

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

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          College Notice Board
        </h1>

        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-8"
        />

        {loading ? (
          <h2 className="text-center">Loading...</h2>
        ) : filtered.length === 0 ? (
          <h2 className="text-center text-xl">
            No Notices Found
          </h2>
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
    </>
  );
}