import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import API from "../services/api";
function BuildCourse() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [whatYouWillLearn, setLearn] = useState([""]);
  const [lectures, setLectures] = useState([
    { title: "", video: "", uploading: false },
  ]);
  const [loading, setLoading] = useState(false);
  const updateLearn = (i, v) =>
    setLearn((a) => a.map((x, j) => (j === i ? v : x)));
  const addLearn = () => setLearn((a) => [...a, ""]);
  const removeLearn = (i) => setLearn((a) => a.filter((_, j) => j !== i));
  const updateLecture = (i, f, v) =>
    setLectures((a) => a.map((x, j) => (j === i ? { ...x, [f]: v } : x)));
  async function uploadVideo(i, file) {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    setLectures((a) =>
      a.map((x, j) => (j === i ? { ...x, uploading: true } : x)),
    );
    try {
      const r = await API.post("/course/upload-video", fd);
      if (r.data.success) {
        setLectures((a) =>
          a.map((x, j) =>
            j === i ? { ...x, video: r.data.data.url, uploading: false } : x,
          ),
        );
        toast.success("Video uploaded successfully");
      }
    } catch (e) {
      setLectures((a) =>
        a.map((x, j) => (j === i ? { ...x, uploading: false, video: "" } : x)),
      );
      toast.error(e.response?.data?.message || "Video upload failed");
    }
  }
  async function createCourse(e) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter course title");
    if (!description.trim())
      return toast.error("Please enter course description");
    if (!category.trim()) return toast.error("Please enter course category");
    if (!price || Number(price) < 0)
      return toast.error("Please enter a valid price");
    if (lectures.some((x) => x.uploading))
      return toast.error("Please wait for all videos to finish uploading");
    const valid = lectures.filter((x) => x.title.trim() && x.video.trim());
    if (!valid.length)
      return toast.error("Please add at least one lecture with a video");
    try {
      setLoading(true);
      const r = await API.post("/course/create", {
        title,
        description,
        whatYouWillLearn: whatYouWillLearn.filter(Boolean),
        category,
        lectures: valid.map((x) => ({ title: x.title, video: x.video })),
        price: Number(price),
        thumbnail,
      });
      if (r.data.success) {
        toast.success("Course created successfully");
        navigate("/teacher/profile");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Course creation failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div className="mb-9">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-yellow-400">
            Creator studio
          </p>
          <h1 className="mt-2 text-4xl font-black">Build a course.</h1>
          <p className="mt-3 text-zinc-500">
            Turn your knowledge into a structured learning experience.
          </p>
        </div>
        <form onSubmit={createCourse} className="space-y-6">
          <section className="rounded-3xl border border-white/8 bg-[#111] p-6 sm:p-8">
            <h2 className="text-xl font-black">Course basics</h2>
            <div className="mt-6 grid gap-5">
              <label>
                <span className="mb-2 block text-sm font-semibold text-zinc-400">
                  Course title
                </span>
                <input
                  className="input-premium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Operating Systems from Zero to Interview"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold text-zinc-400">
                  Description
                </span>
                <textarea
                  rows="5"
                  className="input-premium resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will students learn?"
                />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-semibold text-zinc-400">
                    Category
                  </span>
                  <input
                    className="input-premium"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Operating System"
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-semibold text-zinc-400">
                    Price (₹)
                  </span>
                  <input
                    className="input-premium"
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="499"
                  />
                </label>
              </div>
              <label>
                <span className="mb-2 block text-sm font-semibold text-zinc-400">
                  Thumbnail URL
                </span>
                <input
                  className="input-premium"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://..."
                />
              </label>
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Thumbnail preview"
                  className="h-48 w-full rounded-2xl object-cover"
                />
              )}
            </div>
          </section>
          <section className="rounded-3xl border border-white/8 bg-[#111] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">What students will learn</h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Keep each point specific and useful.
                </p>
              </div>
              <button
                type="button"
                onClick={addLearn}
                className="rounded-xl border border-yellow-400/30 px-3 py-2 text-sm font-bold text-yellow-400"
              >
                + Add
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {whatYouWillLearn.map((x, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="input-premium"
                    value={x}
                    onChange={(e) => updateLearn(i, e.target.value)}
                    placeholder={`Learning outcome ${i + 1}`}
                  />
                  {whatYouWillLearn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLearn(i)}
                      className="rounded-xl border border-white/8 px-4 text-red-400"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-white/8 bg-[#111] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">Course lectures</h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Upload videos and give each lecture a clear title.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setLectures((a) => [
                    ...a,
                    { title: "", video: "", uploading: false },
                  ])
                }
                className="rounded-xl border border-yellow-400/30 px-3 py-2 text-sm font-bold text-yellow-400"
              >
                + Add lecture
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {lectures.map((l, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-black text-yellow-400">
                      LECTURE {String(i + 1).padStart(2, "0")}
                    </span>
                    {lectures.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setLectures((a) => a.filter((_, j) => j !== i))
                        }
                        className="text-xs font-bold text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    className="input-premium"
                    value={l.title}
                    onChange={(e) => updateLecture(i, "title", e.target.value)}
                    placeholder="Lecture title"
                  />
                  <label className="mt-4 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[.02] p-5 text-sm font-semibold text-zinc-500 hover:border-yellow-400/30 hover:text-yellow-400">
                    <input
                      className="hidden"
                      type="file"
                      accept="video/*"
                      onChange={(e) => uploadVideo(i, e.target.files?.[0])}
                    />
                    {l.uploading
                      ? "Uploading video..."
                      : l.video
                        ? "✓ Video uploaded — click to replace"
                        : "Click to upload lecture video"}
                  </label>
                </div>
              ))}
            </div>
          </section>
          <button
            disabled={loading}
            className="w-full rounded-2xl bg-yellow-400 py-4 font-black text-black shadow-xl shadow-yellow-400/10 hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Creating course..." : "Create course →"}
          </button>
        </form>
      </main>
    </div>
  );
}
export default BuildCourse;
