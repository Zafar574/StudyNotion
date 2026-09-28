import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const hero =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85";
const cards = [
  [
    "Web Development",
    "Build real-world applications",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Data Structures",
    "Master problem solving",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Java",
    "From fundamentals to projects",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Database",
    "Design data that scales",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  ],
];

function Home() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(250,204,21,.12),transparent_32%),radial-gradient(circle_at_15%_60%,rgba(250,204,21,.06),transparent_30%)]" />
          <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/8 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-yellow-300">
                <span className="h-2 w-2 rounded-full bg-yellow-400" /> Learn
                smarter
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.04em] text-white sm:text-6xl lg:text-7xl">
                Skills that turn into{" "}
                <span className="text-yellow-400">opportunities.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
                Practical courses, focused learning and instructors who teach
                what actually matters. Pick a skill and start building.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="rounded-xl bg-yellow-400 px-6 py-3.5 font-black text-black shadow-xl shadow-yellow-400/10 hover:bg-yellow-300"
                >
                  Explore Courses →
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl border border-white/12 bg-white/[.03] px-6 py-3.5 font-bold text-white hover:border-yellow-400/40 hover:bg-white/[.06]"
                >
                  Become an Instructor
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-7 text-sm text-zinc-500">
                <span>
                  <b className="text-white">Practical</b> curriculum
                </span>
                <span>
                  <b className="text-white">Learn</b> at your pace
                </span>
                <span>
                  <b className="text-white">Build</b> real skills
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -inset-5 rounded-[36px] bg-yellow-400/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#141414] p-3 shadow-2xl shadow-black/60">
                <img
                  src={hero}
                  alt="Students learning together"
                  className="h-[420px] w-full rounded-[22px] object-cover lg:h-[500px]"
                />
                <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-zinc-500">
                        SkillBazar
                      </p>
                      <p className="mt-1 font-bold text-white">
                        Learn. Build. Grow.
                      </p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400 font-black text-black">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/6 bg-[#0d0d0d]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.18em] text-yellow-400">
                  Explore
                </p>
                <h2 className="mt-2 text-3xl font-black text-white">
                  Learn what moves you forward.
                </h2>
              </div>
              <Link
                to="/catalog"
                className="hidden text-sm font-bold text-zinc-400 hover:text-yellow-400 sm:block"
              >
                View catalog →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map(([name, desc, image]) => (
                <Link
                  key={name}
                  to="/catalog"
                  className="group relative h-56 overflow-hidden rounded-2xl border border-white/8"
                >
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <h3 className="text-lg font-black text-white">{name}</h3>
                    <p className="mt-1 text-sm text-zinc-300">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              [
                "01",
                "Choose",
                "Find a course that matches the skill you want to build.",
              ],
              [
                "02",
                "Learn",
                "Follow structured lessons created by instructors.",
              ],
              [
                "03",
                "Build",
                "Turn knowledge into practical projects and confidence.",
              ],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="rounded-2xl border border-white/8 bg-[#111] p-7"
              >
                <span className="text-sm font-black text-yellow-400">{n}</span>
                <h3 className="mt-7 text-xl font-black text-white">{t}</h3>
                <p className="mt-2 leading-7 text-zinc-500">{d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-white/6 px-5 py-8 text-center text-sm text-zinc-600">
        © 2026 SkillBazar · Learn. Build. Grow.
      </footer>
    </div>
  );
}
export default Home;
