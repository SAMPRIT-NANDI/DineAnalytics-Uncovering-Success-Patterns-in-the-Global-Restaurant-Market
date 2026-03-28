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
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-3 bg-blue-600 rounded-2xl group-hover:rotate-6 transition-all shadow-lg shadow-blue-200">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                DineAnalytics
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      isActive 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {session ? (
              <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                <div className="text-right hidden sm:block space-y-0.5">
                  <p className="text-sm font-black text-slate-900 leading-none">{session.user?.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{session.user?.email?.split('@')[0]}</p>
                </div>
                <div className="relative group">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm group-hover:border-blue-600 transition-colors">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="absolute -top-2 -right-2 p-2 bg-white border border-slate-200 rounded-xl shadow-xl text-slate-400 hover:text-red-600 hover:border-red-100 transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
