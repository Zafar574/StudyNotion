import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const signupData = JSON.parse(localStorage.getItem("signupData"));
      if (!signupData) {
        toast.error("Registration data not found");
        navigate("/signup");
        return;
      }
      const response = await API.post("/user/verify-otp", {
        ...signupData,
        otp,
      });
      if (response.data.success) {
        localStorage.removeItem("signupData");
        toast.success("Registration completed successfully");
        navigate("/login");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#080808] px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-xl items-center justify-center">
        <div className="w-full rounded-[30px] border border-white/8 bg-[#111] p-7 shadow-2xl sm:p-10">
          <Link to="/" className="text-2xl font-black">
            Skill<span className="text-yellow-400">Bazar</span>
          </Link>
          <div className="mt-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-yellow-400 text-2xl font-black text-black">
              ✉
            </div>
            <p className="mt-7 text-sm font-bold uppercase tracking-[.18em] text-yellow-400">
              Email verification
            </p>
            <h1 className="mt-2 text-4xl font-black">Verify your OTP.</h1>
            <p className="mx-auto mt-3 max-w-sm text-zinc-500">
              Enter the 6-digit code sent to your email to finish registration.
            </p>
          </div>
          <form onSubmit={submitHandler} className="mt-10">
            <input
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="6"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="000000"
              className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-5 text-center text-3xl font-black tracking-[.55em] text-yellow-400 outline-none focus:border-yellow-400"
              required
            />
            <button
              disabled={loading || otp.length !== 6}
              className="mt-5 w-full rounded-xl bg-yellow-400 py-3.5 font-black text-black hover:bg-yellow-300 disabled:opacity-40"
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </button>
          </form>
          <button
            onClick={() => navigate("/signup")}
            className="mt-5 w-full text-sm font-semibold text-zinc-500 hover:text-yellow-400"
          >
            ← Change registration details
          </button>
        </div>
      </div>
    </div>
  );
}
export default VerifyOTP;
