import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function CreateNotice() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/notices", form);
      alert("Notice created successfully");
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          Add Notice
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Notice Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="body"
            placeholder="Notice Description"
            value={form.body}
            onChange={handleChange}
            rows={5}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Exam</option>
            <option>Event</option>
            <option>General</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>

          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (Optional)"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Save Notice
          </button>

        </form>
      </div>
    </>
  );
}