import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/user/login", { email, password });
      if (response.data.success) {
        const user = response.data.data;
        login(user);
        toast.success("Logged in successfully");
        navigate(
          user.role === "Teacher" ? "/teacher/profile" : "/student/profile",
        );
      }
    } catch (e) {
      const message =
        e.response?.data?.message || "Login failed. Please check your details.";
      toast.error(
        /password|credential|invalid/i.test(message)
          ? "Incorrect email or password"
          : message,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
          alt="People collaborating"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-yellow-500/10" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="text-2xl font-black">
            Skill<span className="text-yellow-400">Bazar</span>
          </Link>
          <div className="max-w-md">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-yellow-400">
              Welcome back
            </p>
            <h2 className="mt-4 text-5xl font-black leading-tight">
              Pick up where your learning left off.
            </h2>
            <p className="mt-5 leading-7 text-zinc-300">
              Your courses, progress and next skill are waiting.
            </p>
          </div>
          <p className="text-xs text-zinc-500">Learn. Build. Grow.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 inline-block text-2xl font-black lg:hidden"
          >
            Skill<span className="text-yellow-400">Bazar</span>
          </Link>
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-yellow-400">
              Account
            </p>
            <h1 className="mt-2 text-4xl font-black text-white">
              Welcome back.
            </h1>
            <p className="mt-3 text-zinc-500">
              Login to continue your SkillBazar journey.
            </p>
          </div>
          <form
            onSubmit={submitHandler}
            className="space-y-5 rounded-3xl border border-white/8 bg-[#111] p-6 sm:p-8"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Email
              </label>
              <input
                className="input-premium"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Password
              </label>
              <input
                className="input-premium"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              disabled={loading}
              className="w-full rounded-xl bg-yellow-400 py-3.5 font-black text-black hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login →"}
            </button>
            <p className="text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                className="font-bold text-yellow-400 hover:underline"
                to="/signup"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
