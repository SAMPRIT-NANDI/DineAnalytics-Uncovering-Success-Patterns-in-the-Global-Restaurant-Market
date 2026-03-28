"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, LayoutDashboard, Info, Mail, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "History", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  if (pathname === "/login") return null;

  return (
    <nav className="bg-[#111111]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 no-print px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex flex-col items-center justify-center bg-[#FACC15] p-4 group transition-all hover:bg-[#EAB308]">
              <div className="p-1 border-2 border-slate-900 mb-1 group-hover:rotate-6 transition-transform">
                <Utensils className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-[10px] font-black text-slate-900 tracking-[0.4em] uppercase leading-none">
                Dine
              </span>
              <span className="text-[10px] font-black text-slate-900 tracking-[0.4em] uppercase leading-none">
                Analytics
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group ${
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#FACC15] transition-all ${isActive ? "w-6" : "w-0 group-hover:w-4"}`}></span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {session ? (
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block space-y-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{session.user?.name}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">{session.user?.email?.split('@')[0]}</p>
                </div>
                <div className="relative group">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#FACC15] transition-all">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="absolute -top-1 -right-1 p-2 bg-[#FACC15] text-slate-900 rounded-full shadow-xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-8 py-3.5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#FACC15] transition-all shadow-xl active:scale-95">
                Get In Touch
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
