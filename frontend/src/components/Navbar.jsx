import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    API.get("/category/all")
      .then((r) => r.data.success && setCategories(r.data.data || []))
      .catch(() => {});
  }, []);

  async function logoutHandler() {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (e) {
      toast.error("Logout failed");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#090909]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400 text-lg font-black text-black shadow-lg shadow-yellow-400/10">
            S
          </span>
          <div className="leading-none">
            <div className="text-xl font-black tracking-tight">
              Skill<span className="text-yellow-400">Bazar</span>
            </div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[.25em] text-zinc-500">
              Learn • Build • Grow
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="text-sm font-medium text-zinc-300 transition hover:text-yellow-400"
            to="/"
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-1 py-5 text-sm font-medium text-zinc-300 hover:text-yellow-400">
              Catalog <span className="text-xs">⌄</span>
            </button>
            {open && (
              <div className="absolute left-1/2 top-[62px] w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#151515] p-2 shadow-2xl shadow-black/50">
                <Link
                  to="/catalog"
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-200 hover:bg-yellow-400 hover:text-black"
                >
                  All Courses
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/catalog?category=${category._id}`}
                    className="block rounded-xl px-4 py-3 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white sm:block"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black hover:bg-yellow-300"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to={
                  user.role === "Teacher"
                    ? "/teacher/profile"
                    : "/student/profile"
                }
                className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 sm:flex"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-yellow-400 font-black text-black">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
                <span className="max-w-28 truncate text-sm font-semibold text-zinc-200">
                  {user.name}
                </span>
              </Link>
              {user.role === "Teacher" && (
                <Link
                  to="/teacher/build-course"
                  className="hidden rounded-xl border border-yellow-400/30 px-4 py-2.5 text-sm font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black lg:block"
                >
                  Create
                </Link>
              )}
              <button
                onClick={logoutHandler}
                className="rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-zinc-400 hover:border-red-400/30 hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;
