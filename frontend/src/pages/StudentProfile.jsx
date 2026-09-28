import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const fallback =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80";
function StudentProfile() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getStudentCourses() {
    try {
      const r = await API.get("/enrollment/student-courses");
      if (r.data.success) setCourses(r.data.data || []);
    } catch (e) {
      toast.error(e.response?.data?.message || "Courses could not be loaded");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (user) getStudentCourses();
  }, [user]);
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <section className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[#111] p-7 sm:p-9">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-yellow-400 text-3xl font-black text-black">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-yellow-400">
                  Student dashboard
                </p>
                <h1 className="mt-1 text-3xl font-black">
                  Hi, {user?.name?.split(" ")[0]}.
                </h1>
                <p className="mt-1 text-zinc-500">{user?.email}</p>
              </div>
            </div>
            <Link
              to="/catalog"
              className="rounded-xl bg-yellow-400 px-5 py-3 text-center text-sm font-black text-black hover:bg-yellow-300"
            >
              Explore more courses →
            </Link>
          </div>
        </section>
        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-yellow-400">
              Your library
            </p>
            <h2 className="mt-2 text-3xl font-black">Continue learning</h2>
          </div>
          <span className="rounded-full border border-white/8 px-3 py-1.5 text-xs font-bold text-zinc-500">
            {courses.length} course{courses.length !== 1 ? "s" : ""}
          </span>
        </div>
        {loading ? (
          <div className="mt-8 rounded-2xl border border-white/8 bg-[#111] p-10 text-center text-yellow-400">
            Loading your courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-[#111] p-12 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-yellow-400/10 text-2xl">
              📚
            </div>
            <h3 className="mt-5 text-xl font-black">Your library is empty</h3>
            <p className="mt-2 text-zinc-500">
              Purchase a course and it will appear here.
            </p>
            <Link
              to="/catalog"
              className="mt-6 inline-block rounded-xl bg-yellow-400 px-5 py-3 font-black text-black"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((enrollment) => {
              const course = enrollment.course;
              return (
                <div
                  key={enrollment._id}
                  className="group overflow-hidden rounded-2xl border border-white/8 bg-[#111] hover:border-yellow-400/20"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={course?.thumbnail || fallback}
                      alt={course?.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-white">{course?.title}</h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      By {course?.teacher?.name || "Instructor"} ·{" "}
                      {course?.lectures?.length || 0} lectures
                    </p>
                    <Link
                      to={`/learn/${course?._id}`}
                      className="mt-5 block rounded-xl bg-yellow-400 py-3 text-center text-sm font-black text-black hover:bg-yellow-300"
                    >
                      Continue learning →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
export default StudentProfile;
