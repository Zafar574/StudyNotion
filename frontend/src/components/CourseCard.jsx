import { Link } from "react-router-dom";

const fallback =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80";

function CourseCard({ course }) {
  return (
    <Link
      to={`/course/${course._id || course.id}`}
      className="group overflow-hidden rounded-2xl border border-white/8 bg-[#151515] transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative h-48 overflow-hidden bg-zinc-900">
        <img
          src={course.thumbnail || course.image || fallback}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold text-yellow-300 backdrop-blur">
          {course.category?.name || course.category || "Course"}
        </span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-bold text-white group-hover:text-yellow-300">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          By {course.teacher?.name || course.teacher || "SkillBazar Instructor"}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
          <span className="text-xl font-black text-white">₹{course.price}</span>
          <span className="text-sm font-bold text-yellow-400">
            View course →
          </span>
        </div>
      </div>
    </Link>
  );
}
export default CourseCard;
