"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Utensils, AlertCircle, ArrowRight, UserCheck, Sparkles, ChefHat } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-slate-100 border-t-blue-600 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Utensils className="w-10 h-10 text-blue-600 animate-bounce" />
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center space-y-2">
          <p className="text-slate-900 font-black text-2xl tracking-tight">DineAnalytics</p>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Initializing Intelligence</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Left Side: Visuals */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
            alt="High-end restaurant interior" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/50 to-transparent"></div>
          
          {/* Animated Overlay Circles */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl text-white space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Market Intelligence Platform</span>
            </div>
            
            <h2 className="text-7xl font-black leading-[0.9] tracking-tighter">
              The Science of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">Culinary Success.</span>
            </h2>
            
            <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-lg">
              Unlock competitive advantages using advanced machine learning models trained on 9,500+ global dining data points.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-4">
            {[
              { label: "Data Points", val: "95k+" },
              { label: "City Models", val: "400+" },
              { label: "Prediction", val: "ML-Driven" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl font-black tracking-tight">{stat.val}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-8">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-400">
              Trusted by <span className="text-white">500+</span> Market Analysts
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        
        <div className="max-w-md w-full space-y-12 relative z-10">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 group hover:rotate-6 transition-transform">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">Login</h1>
              <p className="text-slate-400 font-bold text-lg tracking-tight">Access the Intelligence Hub</p>
            </div>
          </div>

          {error === "OAuthSignin" && (
            <div className="p-6 bg-slate-900 rounded-[2rem] border border-white/10 flex items-start gap-4 text-white shadow-2xl animate-in slide-in-from-bottom-4">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest mb-1">Configuration Required</p>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Google OAuth keys are not detected in the environment. Please use <strong>Guest Access</strong> for full functionality.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-4 px-8 py-5 bg-white border-2 border-slate-100 rounded-[1.5rem] text-slate-900 font-black text-sm hover:border-blue-600 hover:bg-blue-50/30 transition-all group relative overflow-hidden"
            >
              <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{ fill: "#4285F4" }} />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{ fill: "#34A853" }} />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" style={{ fill: "#FBBC05" }} />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{ fill: "#EA4335" }} />
              </svg>
              <span className="relative z-10 uppercase tracking-widest">Sign in with Google</span>
            </button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <span className="relative px-6 bg-white text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">OR</span>
            </div>

            <button
              disabled={isGuestLoading}
              onClick={() => {
                setIsGuestLoading(true);
                signIn("credentials", { callbackUrl: "/" });
              }}
              className="w-full flex items-center justify-center gap-4 px-8 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-blue-200 group disabled:opacity-70"
            >
              {isGuestLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="w-5 h-5 text-white" />
              )}
              <span className="uppercase tracking-widest">Guest Access</span>
              {!isGuestLoading && <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
          
          <div className="pt-12 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Secured by JWT & OAuth 2.0</p>
            <div className="flex justify-center gap-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="w-12 h-6 bg-slate-200 rounded-md"></div>
              <div className="w-12 h-6 bg-slate-200 rounded-md"></div>
              <div className="w-12 h-6 bg-slate-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
