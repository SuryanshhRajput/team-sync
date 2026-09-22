import React from "react";
import { useAuth } from "../../hooks/authHook";

const LoginPage = () => {
  const { register, loginFormSubmit, handleSubmit, navigate } = useAuth();

  return (
    <div className="min-h-screen bg-[#111014] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-150 h-125 bg-violet-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-260 flex items-center justify-center gap-16 relative z-10">
        <div className="w-full max-w-133.75 bg-[#1c1a1f] border border-[#2d2a31] rounded-2xl p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#7053b8] flex items-center justify-center mb-5 shadow-lg shadow-violet-900/20">
              <svg
                className="w-8 h-8 text-violet-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="2" />
                <circle cx="5" cy="7" r="2" />
                <circle cx="19" cy="7" r="2" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
                <path d="M10.5 10.8 6.5 8.2" />
                <path d="M13.5 10.8 17.5 8.2" />
                <path d="m10.5 13.2-3.2 3" />
                <path d="m13.5 13.2 3.2 3" />
              </svg>
            </div>

            <h1 className="text-[28px] font-bold tracking-tight">team-sync </h1>

            <p className="text-[#aaa6b1] mt-1 text-[16px]">
              Sign in to your workspace
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="h-13 rounded-lg border border-[#39363e] bg-[#29272c] hover:bg-[#302d34] transition flex items-center justify-center gap-3 font-semibold text-[#ddd9e2]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.32h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.43Z"
                />
                <path
                  fill="currentColor"
                  d="M12 21.5c2.63 0 4.83-.87 6.44-2.35l-3.14-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.72 9.72 0 0 0 12 21.5Z"
                />
                <path
                  fill="currentColor"
                  d="M6.54 13.59A5.84 5.84 0 0 1 6.24 12c0-.55.1-1.09.3-1.59V7.88H3.3A9.7 9.7 0 0 0 2.25 12c0 1.56.37 3.04 1.05 4.12l3.24-2.53Z"
                />
                <path
                  fill="currentColor"
                  d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.48 14.63 2.5 12 2.5a9.72 9.72 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
                />
              </svg>
              GOOGLE
            </button>

            <button
              type="button"
              className="h-13 rounded-lg border border-[#39363e] bg-[#29272c] hover:bg-[#302d34] transition flex items-center justify-center gap-3 font-semibold text-[#ddd9e2]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4V4Zm2 3v10h3V7H6Zm5 0v10h3v-4.1c0-1.1.4-1.7 1.3-1.7.8 0 1.2.5 1.2 1.7V17h3v-4.9c0-2.4-1.2-3.5-3-3.5-1.2 0-2 .6-2.5 1.2V7h-3Z" />
              </svg>
              GITHUB
            </button>
          </div>

          <div className="flex items-center gap-5 my-9">
            <div className="h-px flex-1 bg-[#302d34]" />
            <span className="text-sm text-[#aaa6b1] whitespace-nowrap">
              or continue with email
            </span>
            <div className="h-px flex-1 bg-[#302d34]" />
          </div>

          <form onSubmit={handleSubmit(loginFormSubmit)}>
            <div className="mb-7">
              <label className="block text-sm font-bold tracking-wide text-[#c9c5cf] mb-2">
                EMAIL ADDRESS
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="name@company.com"
                className="w-full h-13 rounded-lg bg-[#0e0d11] border border-[#35323a] px-4 text-[16px] text-white placeholder:text-[#aaa6b1] outline-none transition focus:border-[#7657c2] focus:ring-2 focus:ring-violet-500/10"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold tracking-wide text-[#c9c5cf]">
                  PASSWORD
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-[#c5afff] hover:text-[#d6c5ff] transition"
                >
                  Forgot password?
                </button>
              </div>

              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full h-13 rounded-lg bg-[#0e0d11] border border-[#35323a] px-4 text-white placeholder:text-[#aaa6b1] outline-none transition focus:border-[#7657c2] focus:ring-2 focus:ring-violet-500/10"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer mb-7 group">
              <input
                type="checkbox"
                className="w-4.75 h-4.75 appearance-none rounded-[5px] border border-[#403d45] bg-[#0e0d11] checked:bg-[#7053b8] checked:border-[#7053b8] cursor-pointer"
              />

              <span className="text-sm text-[#c1bdc7] group-hover:text-white transition">
                Stay signed in
              </span>
            </label>

            <button
              type="submit"
              className="w-full h-13 rounded-lg bg-[#7053b8] hover:bg-[#7d5dc9] active:scale-[0.99] transition flex items-center justify-center gap-3 text-[16px] font-semibold text-white shadow-lg shadow-violet-900/20"
            >
              Sign In
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M13 5h6v14h-6" />
                <path d="M3 12h13" />
                <path d="m11 8 4 4-4 4" />
              </svg>
            </button>
          </form>

          <div className="h-px bg-[#302d34] mt-9 mb-7" />

          <p className="text-center text-sm text-[#aaa6b1]">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="font-semibold text-[#c5afff] hover:text-white transition"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
