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
    <nav className="bg-[#111111]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 no-print px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 group transition-all">
              <div className="bg-[#FACC15] p-2.5 rounded-xl group-hover:rotate-12 transition-all duration-300">
                <Utensils className="w-5 h-5 text-slate-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-[0.2em] uppercase leading-none">
                  Dine
                </span>
                <span className="text-[10px] font-bold text-[#FACC15] tracking-[0.1em] uppercase mt-0.5">
                  Analytics
                </span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2 group ${
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-[#FACC15] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {session ? (
              <div className="flex items-center gap-5">
                <div className="text-right hidden sm:block space-y-0.5">
                  <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">{session.user?.name}</p>
                  <p className="text-[9px] text-[#FACC15] font-bold uppercase tracking-widest opacity-80">{session.user?.email?.split('@')[0]}</p>
                </div>
                <div className="relative group">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#FACC15] transition-all duration-300 shadow-lg">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="absolute -top-1.5 -right-1.5 p-1.5 bg-[#FACC15] text-slate-900 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FACC15] transition-all duration-300 shadow-xl active:scale-95">
                Get In Touch
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
