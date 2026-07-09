import Link from "next/link";
import axios from "axios";

export default function NoticeCard({ notice, refresh }) {

  async function deleteNotice() {

    if (!confirm("Delete this notice?")) return;

    await axios.delete(`/api/notices/${notice.id}`);

    refresh();
  }

  return (

    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-bold">
          {notice.title}
        </h2>

        {notice.priority==="Urgent" && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Urgent
          </span>
        )}

      </div>

      <p className="text-gray-700 mt-4">
        {notice.body}
      </p>

      <div className="mt-5">

        <p>
          <strong>Category :</strong> {notice.category}
        </p>

        <p>
          <strong>Date :</strong>{" "}
          {new Date(notice.publishDate).toLocaleDateString()}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <Link
          href={`/notices/edit/${notice.id}`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          onClick={deleteNotice}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>

  );

}