"use client";

import { useUser, useClerk, SignInButton } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Utensils, AlertCircle, ArrowRight, Sparkles, Info } from "lucide-react";

export default function LoginPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111]">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-white/5 border-t-[#FACC15] rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Utensils className="w-10 h-10 text-[#FACC15] animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] relative overflow-hidden flex flex-col">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2064&auto=format&fit=crop" 
          alt="Organic food background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-8 sm:px-12 lg:px-24 py-12">
        <div className="w-full lg:w-1/2 space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-7xl sm:text-9xl font-caveat leading-none tracking-tight text-white animate-slide-up">
              Organic <br />
              <span className="text-[#FACC15]">Intelligence.</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium max-w-lg animate-fade-in delay-300">
              Decoding the success patterns of the global restaurant market through advanced data analytics.
            </p>
          </div>

          <div className="flex items-center gap-6 pt-4 animate-fade-in delay-500">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#111111] overflow-hidden bg-slate-800">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Analyst" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Trusted by <span className="text-white">500+</span> Market Experts
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="max-w-md w-full glass-morphism p-10 rounded-[2.5rem] border border-white/10 space-y-10 animate-slide-right">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">Portal Access</h1>
              <p className="text-slate-400 font-bold tracking-tight uppercase text-xs tracking-[0.2em]">Secure Authentication Hub</p>
            </div>

            {error === "OAuthSignin" && (
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4 text-white">
                <Info className="w-5 h-5 text-[#FACC15] shrink-0" />
                <p className="text-xs font-medium leading-relaxed text-slate-300">
                  OAuth keys not detected. Please use <span className="text-white font-bold">Guest Access</span> for full platform exploration.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <SignInButton mode="modal">
                <button
                  className="w-full flex items-center justify-center gap-4 px-8 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#FACC15] transition-all group relative overflow-hidden"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{ fill: "#4285F4" }} />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{ fill: "#34A853" }} />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" style={{ fill: "#FBBC05" }} />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{ fill: "#EA4335" }} />
                  </svg>
                  Sign in to Continue
                </button>
              </SignInButton>

              <div className="relative py-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <span className="relative px-6 bg-[#111111] text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">OR</span>
              </div>

              <button
                disabled={isGuestLoading}
                onClick={() => {
                  setIsGuestLoading(true);
                  signIn("credentials", { callbackUrl: "/" });
                }}
                className="w-full flex items-center justify-center gap-4 px-8 py-5 bg-[#FACC15] text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-[#FACC15]/20 group disabled:opacity-70"
              >
                {isGuestLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                Guest Access
                {!isGuestLoading && <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-2 transition-transform" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gallery Thumbnails */}
      <div className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 h-32 border-t border-white/5">
        {[
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          "https://images.unsplash.com/photo-1493770348161-369560ae357d",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
        ].map((url, i) => (
          <div key={i} className="relative group overflow-hidden border-r border-white/5">
            <img src={`${url}?q=80&w=400&auto=format&fit=crop`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 cursor-pointer" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
