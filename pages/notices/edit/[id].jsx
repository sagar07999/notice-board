import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../../components/Navbar";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      loadNotice();
    }
  }, [id]);

  async function loadNotice() {
    try {
      const res = await axios.get(`/api/notices/${id}`);

      setForm({
        title: res.data.title,
        body: res.data.body,
        category: res.data.category,
        priority: res.data.priority,
        publishDate: res.data.publishDate
          ? res.data.publishDate.substring(0, 10)
          : "",
        image: res.data.image || "",
      });
    } catch (err) {
      alert("Unable to load notice");
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(`/api/notices/${id}`, form);
      alert("Notice Updated Successfully");
      router.push("/");
    } catch (err) {
      alert("Update Failed");
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 border rounded-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Notice
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="body"
            rows="5"
            value={form.body}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>General</option>
            <option>Event</option>
            <option>Exam</option>
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
          />

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Notice
          </button>

        </form>

      </div>
    </>
  );
}