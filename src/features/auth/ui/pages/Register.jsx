import React from "react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Network,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { useAuth } from "../../hooks/authHook";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    registerFormSubmit,
    navigate,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useAuth();

  return (
    <div className="min-h-screen bg-[#0d0b11] text-white flex flex-col">
      <div className="flex-1 lg:grid lg:grid-cols-[46%_54%]">
        <section className="relative hidden lg:flex min-h-screen overflow-hidden border-r border-white/[0.07] bg-[#080d1b]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(124,92,246,0.18),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(45,212,191,0.08),transparent_28%),linear-gradient(145deg,#07101f_0%,#0a1020_45%,#090a14_100%)]" />

          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-violet-500/20 blur-[120px]" />
          <div className="absolute top-[35%] -right-32 w-[360px] h-[360px] rounded-full bg-cyan-400/10 blur-[130px]" />
          <div className="absolute bottom-[-120px] left-[15%] w-[420px] h-[420px] rounded-full bg-indigo-600/10 blur-[120px]" />

          <div className="absolute top-[18%] left-[8%] w-[82%] h-[46%]">
            <div className="absolute left-[12%] top-[48%] w-3 h-3 rounded-full bg-violet-300 shadow-[0_0_25px_rgba(196,181,253,0.8)]" />
            <div className="absolute left-[30%] top-[28%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
            <div className="absolute left-[51%] top-[58%] w-3 h-3 rounded-full bg-violet-300 shadow-[0_0_25px_rgba(196,181,253,0.8)]" />
            <div className="absolute left-[73%] top-[20%] w-2 h-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(240,171,252,0.8)]" />
            <div className="absolute left-[86%] top-[70%] w-3 h-3 rounded-full bg-cyan-200 shadow-[0_0_25px_rgba(103,232,249,0.8)]" />
            <div className="absolute left-[37%] top-[82%] w-2 h-2 rounded-full bg-violet-200 shadow-[0_0_18px_rgba(196,181,253,0.8)]" />

            <div className="absolute left-[12%] top-[48%] w-[22%] h-px bg-gradient-to-r from-violet-300/50 to-cyan-300/10 rotate-[-22deg] origin-left" />
            <div className="absolute left-[30%] top-[28%] w-[27%] h-px bg-gradient-to-r from-cyan-300/40 to-violet-300/10 rotate-[35deg] origin-left" />
            <div className="absolute left-[51%] top-[58%] w-[25%] h-px bg-gradient-to-r from-violet-300/50 to-fuchsia-300/10 rotate-[-27deg] origin-left" />
            <div className="absolute left-[73%] top-[20%] w-[17%] h-px bg-gradient-to-r from-fuchsia-300/40 to-cyan-300/10 rotate-[72deg] origin-left" />
            <div className="absolute left-[37%] top-[82%] w-[18%] h-px bg-gradient-to-r from-violet-300/40 to-transparent rotate-[-44deg] origin-left" />
            <div className="absolute left-[12%] top-[48%] w-[40%] h-px bg-gradient-to-r from-violet-300/30 to-transparent rotate-[12deg] origin-left" />
            <div className="absolute left-[51%] top-[58%] w-[31%] h-px bg-gradient-to-r from-cyan-300/20 to-transparent rotate-[19deg] origin-left" />

            <div className="absolute left-[24%] top-[33%] w-44 h-44 rounded-full border border-violet-300/10 blur-[1px]" />
            <div className="absolute left-[36%] top-[42%] w-28 h-28 rounded-full border border-cyan-300/10" />
            <div className="absolute left-[46%] top-[23%] w-16 h-16 rounded-full bg-violet-400/10 blur-xl" />
          </div>

          <div className="relative z-10 w-full p-8 xl:p-10 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-300/20 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-violet-200" />
              </div>

              <div>
                <p className="font-bold text-[20px] tracking-tight">
                  team-sync
                </p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Intelligence Platform
                </p>
              </div>
            </div>

            <div className="mt-auto max-w-[520px]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-300/15 bg-violet-300/[0.06] text-violet-200 text-[11px] font-semibold tracking-[0.18em] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Next generation AI
              </div>

              <h1 className="mt-6 text-[46px] xl:text-[54px] leading-[1.04] font-bold tracking-[-0.04em]">
                Turn your data
                <span className="block bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                  into intelligence.
                </span>
              </h1>

              <p className="mt-6 text-[16px] xl:text-[17px] leading-7 text-white/55 max-w-[470px]">
                Connect your enterprise data, collaborate with intelligent
                models, and transform complex information into decisions that
                move your team forward.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-10">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-md p-4">
                  <div className="flex items-center gap-2 text-violet-200">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-semibold">10x</span>
                  </div>
                  <p className="text-[11px] text-white/35 mt-2">
                    Faster analysis
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-md p-4">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <Network className="w-4 h-4" />
                    <span className="text-sm font-semibold">24/7</span>
                  </div>
                  <p className="text-[11px] text-white/35 mt-2">
                    AI availability
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-md p-4">
                  <div className="flex items-center gap-2 text-fuchsia-200">
                    <Globe2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">Global</span>
                  </div>
                  <p className="text-[11px] text-white/35 mt-2">
                    Secure workspace
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-7 text-[12px] text-white/35">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                All systems operational
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-14 xl:px-20 py-12 bg-[#0d0b11]">
          <div className="w-full max-w-[510px]">
            <div className="mb-9">
              <div className="lg:hidden flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-violet-200" />
                </div>
                <span className="text-[20px] font-bold">team-sync</span>
              </div>

              <div className="inline-flex items-center gap-2 text-violet-300 text-xs font-semibold uppercase tracking-[0.18em]">
                <Sparkles className="w-4 h-4" />
                Start building
              </div>

              <h2 className="mt-4 text-[38px] sm:text-[44px] leading-tight font-bold tracking-[-0.035em]">
                Create your account
              </h2>

              <p className="mt-3 text-[15px] sm:text-[16px] text-white/45 leading-6">
                Build your intelligent workspace and connect your team in
                minutes.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(registerFormSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-[13px] font-medium text-white/65 mb-2.5">
                  Full name
                </label>

                <div className="relative">
                  <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/25" />

                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full h-[56px] rounded-xl border border-white/[0.11] bg-white/[0.035] pl-12 pr-4 text-[15px] text-white placeholder:text-white/20 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-violet-500/[0.06]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-white/65 mb-2.5">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/25" />

                  <input
                    {...register("email")}
                    type="email"
                    placeholder="name@company.com"
                    className="w-full h-[56px] rounded-xl border border-white/[0.11] bg-white/[0.035] pl-12 pr-4 text-[15px] text-white placeholder:text-white/20 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-violet-500/[0.06]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-white/65 mb-2.5">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/25" />

                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full h-[56px] rounded-xl border border-white/[0.11] bg-white/[0.035] pl-12 pr-12 text-[15px] text-white placeholder:text-white/20 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-violet-500/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>

                <div className="flex gap-1.5 mt-2.5">
                  <span className="h-1 flex-1 rounded-full bg-violet-400" />
                  <span className="h-1 flex-1 rounded-full bg-violet-400" />
                  <span className="h-1 flex-1 rounded-full bg-violet-400/25" />
                  <span className="h-1 flex-1 rounded-full bg-white/[0.06]" />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[12px] text-violet-300">
                    Strong password
                  </span>

                  <span className="text-[11px] text-white/25">
                    8+ characters
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-white/65 mb-2.5">
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/25" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="w-full h-[56px] rounded-xl border border-white/[0.11] bg-white/[0.035] pl-12 pr-12 text-[15px] text-white placeholder:text-white/20 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-violet-500/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input type="checkbox" className="peer sr-only" />

                <span className="w-5 h-5 shrink-0 mt-0.5 rounded-md border border-white/[0.13] bg-white/[0.025] flex items-center justify-center peer-checked:bg-violet-500 peer-checked:border-violet-400 transition">
                  <Check className="w-3.5 h-3.5 text-transparent peer-checked:text-white" />
                </span>

                <span className="text-[12px] sm:text-[13px] leading-5 text-white/40">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-violet-300 hover:text-violet-200 transition"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-violet-300 hover:text-violet-200 transition"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="group w-full h-[58px] rounded-xl bg-gradient-to-r from-[#7756c7] via-[#8f6be3] to-[#b99df5] text-[#120d1c] font-bold text-[15px] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.99] transition shadow-[0_14px_40px_rgba(124,92,246,0.18)]"
              >
                Create account
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/20 font-semibold">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-[54px] rounded-xl border border-white/[0.1] bg-white/[0.025] hover:bg-white/[0.05] transition flex items-center justify-center gap-3 text-sm text-white/75"
              >
                <Globe2 className="w-4.5 h-4.5" />
                Google
              </button>

              <button
                type="button"
                className="h-[54px] rounded-xl border border-white/[0.1] bg-white/[0.025] hover:bg-white/[0.05] transition flex items-center justify-center gap-3 text-sm text-white/75"
              >
                <Network className="w-4.5 h-4.5" />
                SSO
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-8 text-[14px] text-white/35">
              <span>Already have an account?</span>
              <button
                onClick={() => navigate("/")}
                type="button"
                className="font-semibold text-violet-300 hover:text-white transition"
              >
                Log in
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-7 text-[11px] text-white/20">
              <LockKeyhole className="w-3.5 h-3.5" />
              Your data is encrypted and protected
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/[0.06] px-6 lg:px-8 py-5 bg-[#0c0a10]">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BrainCircuit className="w-4 h-4 text-violet-300" />
            team-sync
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/30">
            <button className="hover:text-white transition">Privacy</button>
            <button className="hover:text-white transition">Terms</button>
            <button className="hover:text-white transition">Security</button>
            <button className="hover:text-white transition">Status</button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/25">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Systems operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
