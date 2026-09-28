import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
const fallback =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85";
function CourseDetails() {
  const { id } = useParams(),
    navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null),
    [loading, setLoading] = useState(true),
    [buying, setBuying] = useState(false);
  useEffect(() => {
    API.get(`/course/${id}`)
      .then((r) => {
        if (r.data.success) setCourse(r.data.data);
      })
      .catch((e) =>
        toast.error(e.response?.data?.message || "Course could not be loaded"),
      )
      .finally(() => setLoading(false));
  }, [id]);
  async function buyCourse() {
    if (!user) {
      toast.info("Please login to purchase this course");
      navigate("/login");
      return;
    }
    if (user.role !== "Student") {
      toast.error("Only students can purchase courses");
      return;
    }
    try {
      setBuying(true);
      const r = await API.post("/payment/create-order", { courseId: id });
      if (!r.data.success) {
        toast.error("Order could not be created");
        return;
      }
      const order = r.data.data;
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "SkillBazar",
        description: course.title,
        order_id: order.orderId,
        handler: async (payment) => {
          try {
            const v = await API.post("/payment/verify-payment", {
              razorpay_order_id: payment.razorpay_order_id,
              razorpay_payment_id: payment.razorpay_payment_id,
              razorpay_signature: payment.razorpay_signature,
              courseId: id,
            });
            if (v.data.success) {
              toast.success("Course purchased successfully");
              navigate(`/learn/${id}`);
            }
          } catch (e) {
            toast.error(
              e.response?.data?.message || "Payment verification failed",
            );
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#FACC15" },
      };
      new window.Razorpay(options).open();
    } catch (e) {
      toast.error(e.response?.data?.message || "Payment could not be started");
    } finally {
      setBuying(false);
    }
  }
  if (loading)
    return (
      <div className="min-h-screen bg-[#080808]">
        <Navbar />
        <div className="mx-auto max-w-7xl p-8 text-yellow-400">
          Loading course...
        </div>
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen bg-[#080808]">
        <Navbar />
        <div className="mx-auto max-w-7xl p-8 text-red-400">
          Course not found.
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_390px]">
          <div>
            <span className="rounded-full bg-yellow-400/10 px-3 py-1.5 text-xs font-bold text-yellow-400">
              {course.category?.name || "Course"}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-500">
              {course.description}
            </p>
            <p className="mt-5 text-sm text-zinc-600">
              Created by{" "}
              <span className="font-bold text-zinc-300">
                {course.teacher?.name}
              </span>
            </p>
            <section className="mt-12">
              <h2 className="text-2xl font-black">What you'll learn</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.whatYouWillLearn?.map((x, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/8 bg-[#111] p-4 text-sm text-zinc-400"
                  >
                    <span className="mr-3 text-yellow-400">✓</span>
                    {x}
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-12">
              <h2 className="text-2xl font-black">Course content</h2>
              <div className="mt-5 space-y-2">
                {course.lectures?.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#111] p-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-yellow-400 text-sm font-black text-black">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-zinc-300">
                      {l.title}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="h-fit overflow-hidden rounded-3xl border border-white/8 bg-[#111] shadow-2xl lg:sticky lg:top-24">
            <img
              src={course.thumbnail || fallback}
              alt={course.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <p className="text-4xl font-black text-yellow-400">
                ₹{course.price}
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                {course.lectures?.length || 0} lectures · lifetime access
              </p>
              {user?.role === "Teacher" ? (
                <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm text-zinc-500">
                  Teachers cannot purchase courses.
                </div>
              ) : (
                <button
                  onClick={buyCourse}
                  disabled={buying}
                  className="mt-6 w-full rounded-xl bg-yellow-400 py-4 font-black text-black hover:bg-yellow-300 disabled:opacity-50"
                >
                  {buying ? "Processing..." : "Buy this course →"}
                </button>
              )}
              <div className="mt-5 space-y-3 border-t border-white/8 pt-5 text-sm text-zinc-500">
                <p>✓ Structured video lectures</p>
                <p>✓ Learn at your own pace</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
export default CourseDetails;
