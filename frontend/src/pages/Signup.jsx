import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/user/send-otp", { email });
      if (response.data.success) {
        localStorage.setItem(
          "signupData",
          JSON.stringify({ name, email, password, role }),
        );
        toast.success("OTP sent successfully");
        navigate("/verify-otp");
      }
    } catch (e) {
      const message = e.response?.data?.message || "Could not send OTP";
      toast.error(
        /already|exist|registered/i.test(message)
          ? "Email is already registered"
          : message,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] px-5 py-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[30px] border border-white/8 bg-[#111] shadow-2xl lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative hidden min-h-[720px] lg:block">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"
            alt="Learning together"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-yellow-500/10" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <Link to="/" className="text-2xl font-black">
              Skill<span className="text-yellow-400">Bazar</span>
            </Link>
            <div>
              <h2 className="max-w-md text-5xl font-black leading-tight">
                One account. A lot of room to grow.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-300">
                Join as a student or share what you know as an instructor.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-10 lg:p-14">
          <Link to="/" className="text-2xl font-black lg:hidden">
            Skill<span className="text-yellow-400">Bazar</span>
          </Link>
          <div className="mb-8 mt-8 lg:mt-0">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-yellow-400">
              Get started
            </p>
            <h1 className="mt-2 text-4xl font-black">Create your account.</h1>
            <p className="mt-3 text-zinc-500">
              We'll verify your email with a one-time password.
            </p>
          </div>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Full name
              </label>
              <input
                className="input-premium"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
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
                placeholder="Create a strong password"
                required
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-zinc-300">
                I want to join as
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Student", "Teacher"].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${role === r ? "border-yellow-400 bg-yellow-400 text-black" : "border-white/10 bg-[#0d0d0d] text-zinc-400 hover:border-white/20"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full rounded-xl bg-yellow-400 py-3.5 font-black text-black hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Continue with email →"}
            </button>
            <p className="text-center text-sm text-zinc-500">
              Already registered?{" "}
              <Link
                className="font-bold text-yellow-400 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
