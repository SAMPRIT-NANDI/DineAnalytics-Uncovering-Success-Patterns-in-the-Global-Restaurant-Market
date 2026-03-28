"use client";

import { useEffect, useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';
import { 
  Utensils, MapPin, Star, TrendingUp, ShoppingBag, DollarSign,
  Search, Filter, ChevronRight, BrainCircuit, Target, Info, LogOut, User,
  ArrowLeftRight, FileText, Download, Send, Globe, Zap, AlertCircle, X, Mail, CheckCircle2,
  TrendingDown, Activity, Layers, Smartphone, Sparkles
} from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CityData {
  stats: {
    count: number;
    avgRating: number;
    avgCost: number;
    topCuisine: string;
  };
  cuisines: { name: string; value: number }[];
  priceRange: { range: string; count: number }[];
  restaurants: any[];
}

interface DashboardData {
  stats: {
    totalRestaurants: number;
    avgRating: number;
    totalVotes: number;
    avgCostForTwo: number;
  };
  mlInsights: {
    modelName: string;
    accuracy_r2: number;
    error_mse: number;
    featureImportance: { feature: string; importance: number }[];
    predictionNote: string;
  };
  topCuisines: { name: string; value: number }[];
  topCities: { city: string; rating: number }[];
  cities: Record<string, CityData>;
  allCities: string[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316'];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // States for Filtering & Explorer
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [comparisonCity, setComparisonCity] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"global" | "city" | "compare">("global");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch('/dashboard-data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setViewMode("city");
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleComparison = (city: string) => {
    if (comparisonCity === city) {
      setComparisonCity(null);
      setViewMode("city");
    } else {
      setComparisonCity(city);
      setViewMode("compare");
    }
  };

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus("sending");
    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput,
          cityName: selectedCity || "Global Market",
          stats: selectedCity ? data?.cities[selectedCity].stats : data?.stats
        })
      });
      const result = await res.json();
      if (result.success) {
        setEmailStatus("success");
        setTimeout(() => {
          setIsReportModalOpen(false);
          setEmailStatus("idle");
        }, 3000);
      } else {
        setEmailStatus("error");
      }
    } catch (err) {
      setEmailStatus("error");
    }
  };

  // Search Logic to jump to a city
  const searchResults = useMemo(() => {
    if (!data || !searchQuery) return [];
    return data.allCities.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [data, searchQuery]);

  if (status === "loading" || loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-slate-100 border-t-[#FACC15] rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Utensils className="w-10 h-10 text-slate-900 animate-bounce" />
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-6 h-6 text-[#FACC15] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center space-y-2">
          <p className="text-slate-900 font-black text-2xl tracking-tight">Syncing Intelligence Engine</p>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Processing 9,500+ Market Data Points</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 relative bg-white min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-[#111111] -z-10 rounded-l-[10rem] translate-x-1/4 animate-fade-in duration-1000"></div>
      
      {/* Floating Elements (Image 2 style) */}
      <div className="absolute top-40 right-1/4 w-12 h-12 -z-5 animate-float opacity-20">
         <img src="https://cdn-icons-png.flaticon.com/512/2346/2346856.png" className="w-full h-full object-contain rotate-45" alt="leaf" />
      </div>
      <div className="absolute bottom-40 left-10 w-16 h-16 -z-5 animate-float opacity-10 delay-1000">
         <img src="https://cdn-icons-png.flaticon.com/512/2346/2346856.png" className="w-full h-full object-contain -rotate-12" alt="leaf" />
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 no-print px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="px-5 py-2 bg-[#FACC15] text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
              {viewMode} Mode
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> Live Market Data
            </div>
          </div>
          <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.85]">
            {viewMode === 'global' ? "Market Intelligence" : 
             viewMode === 'city' ? selectedCity : 
             "Comparison Hub"}
          </h1>
          <p className="text-slate-500 font-bold text-xl max-w-2xl leading-relaxed">
            {viewMode === 'global' ? "Advanced analytics for global restaurant performance and consumer trends." : 
             viewMode === 'city' ? `Granular economic and performance analysis for the ${selectedCity} market.` : 
             `Comparative performance delta between ${selectedCity} and ${comparisonCity}.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[380px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-[#FACC15] transition-colors" />
            <input 
              type="text" 
              placeholder="Search 400+ cities..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-[2rem] text-sm font-black text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-0 focus:bg-white focus:border-[#FACC15] transition-all shadow-sm group-hover:bg-slate-100/50"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white mt-4 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-slate-100 z-[60] overflow-hidden py-4 animate-in fade-in slide-in-from-top-4">
                {searchResults.map(city => (
                  <button 
                    key={city} 
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left px-10 py-5 hover:bg-blue-50 text-sm font-black text-slate-600 hover:text-blue-600 flex items-center justify-between group/item transition-all"
                  >
                    {city}
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover/item:text-[#FACC15] group-hover/item:translate-x-2 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-[2rem] border-2 border-slate-50 shadow-sm">
            <button 
              onClick={() => setViewMode("global")}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all ${viewMode === 'global' ? 'bg-slate-900 text-white shadow-2xl' : 'text-slate-400 hover:text-slate-900'}`}
            >
              GLOBAL
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <select 
              className="bg-transparent border-none text-[10px] font-black text-slate-900 focus:ring-0 cursor-pointer pr-12 uppercase tracking-[0.2em]"
              value={selectedCity || ""}
              onChange={(e) => handleCitySelect(e.target.value)}
            >
              <option value="" disabled>EXPLORER</option>
              {data.allCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-slate-100 no-print"></div>

      {/* Main Content Area */}
      <div className="animate-in fade-in duration-1000 px-4 sm:px-6 lg:px-8">
        {viewMode === "global" ? (
          <GlobalView data={data} onCitySelect={handleCitySelect} />
        ) : viewMode === "city" ? (
          <CityView city={selectedCity!} cityData={data.cities[selectedCity!]} onCompare={toggleComparison} onBack={() => setViewMode("global")} onEmailRequest={() => setIsReportModalOpen(true)} />
        ) : (
          <ComparisonView city1={selectedCity!} city2={comparisonCity!} data1={data.cities[selectedCity!]} data2={data.cities[comparisonCity!]} onBack={() => setViewMode("city")} />
        )}
      </div>

      {/* Email Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-200">
                  <Mail className="w-8 h-8" />
                </div>
                <button onClick={() => setIsReportModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors group">
                  <X className="w-6 h-6 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </button>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Report</h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  Generate a high-fidelity PDF summary for <strong>{selectedCity || "Global Market"}</strong> and deliver it to your inbox.
                </p>
              </div>

              {emailStatus === "success" ? (
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-emerald-900">Success!</h4>
                    <p className="text-emerald-700 font-medium">Your intelligence report is being dispatched.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendReport} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Destination Address</label>
                    <input 
                      type="email" 
                      required 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. analyst@company.com" 
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-900"
                    />
                  </div>
                  <button 
                    disabled={emailStatus === "sending"}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white font-black text-lg rounded-[1.5rem] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 disabled:opacity-70 active:scale-[0.98]"
                  >
                    {emailStatus === "sending" ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {emailStatus === "sending" ? "Compiling Data..." : "Transmit Analysis"}
                  </button>
                  {emailStatus === "error" && <p className="text-center text-red-500 text-sm font-black bg-red-50 py-3 rounded-xl border border-red-100 animate-shake">Critical: Connection failed. Retry?</p>}
                </form>
              )}
            </div>
            <div className="px-10 py-6 bg-slate-50 text-center border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Proprietary AI Modeling System</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] flex gap-4 no-print bg-slate-900/90 backdrop-blur-xl p-3 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-white/10 scale-90 sm:scale-100 transition-all hover:shadow-blue-500/20">
        <button 
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-3xl font-black text-sm hover:bg-blue-500 transition-all active:scale-95 group"
        >
          <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Transmit via Email
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-3xl font-black text-sm hover:bg-white/20 transition-all active:scale-95 group"
        >
          <FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          Save as PDF
        </button>
      </div>
    </div>
  );
}

function GlobalView({ data, onCitySelect }: { data: DashboardData, onCitySelect: (city: string) => void }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Visual Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            { label: "Venues Scoped", value: data.stats.totalRestaurants.toLocaleString(), icon: Utensils, color: "slate", trend: "+12% Growth" },
            { label: "Aggregate Rating", value: data.stats.avgRating, icon: Star, color: "yellow", trend: "High Stability" },
            { label: "Public Votes", value: data.stats.totalVotes.toLocaleString(), icon: TrendingUp, color: "emerald", trend: "Massive Engagement" },
            { label: "Mean Cost (2)", value: `₹${data.stats.avgCostForTwo.toLocaleString()}`, icon: DollarSign, color: "slate", trend: "Market Median" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-[#FACC15] hover:shadow-2xl transition-all group overflow-hidden relative">
              <div className="relative z-10 flex justify-between items-start">
                <div className={`p-4 ${stat.color === 'yellow' ? 'bg-[#FACC15] text-slate-900' : 'bg-slate-50 text-slate-600'} rounded-3xl mb-8 group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] relative z-10">{stat.label}</p>
              <h3 className="text-5xl font-black text-slate-900 mt-2 relative z-10 tracking-tighter">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 bg-white rounded-[3rem] p-12 relative overflow-hidden flex flex-col justify-between group shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <span className="text-[#ef4444] font-black uppercase tracking-[0.3em] text-[10px]">Chef's Special Insight</span>
              <h4 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Market Freshness.</h4>
            </div>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              "The strongest predictor of success across all cities is <strong>Service Hybridization</strong>—venues offering both Table Booking and Online Delivery consistently outperform peers by 22%."
            </p>
            <div className="pt-4">
               <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#FACC15] hover:text-slate-900 transition-all">
                  Download Report
               </button>
            </div>
          </div>
          
          {/* Circular Food Image (Image 2 style) */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-1000">
             <div className="relative w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover rounded-full border-[1rem] border-white shadow-2xl"
                  alt="Food Plate"
                />
                <div className="absolute top-0 right-0 w-16 h-16 animate-float">
                   <img src="https://cdn-icons-png.flaticon.com/512/2346/2346856.png" className="w-full h-full object-contain" alt="leaf" />
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Col: Rankings */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-2xl font-black text-slate-900 tracking-tight">Market Leaders</h4>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Target className="w-5 h-5" /></div>
          </div>
          <div className="space-y-5">
            {data.topCities.map((city, i) => (
              <button 
                key={city.city} 
                onClick={() => onCitySelect(city.city)}
                className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-[1.5rem] transition-all duration-300 group border border-transparent hover:border-slate-800 hover:translate-x-2"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-white text-slate-900 rounded-2xl text-xs font-black shadow-sm group-hover:scale-90 transition-transform">
                    {i+1}
                  </span>
                  <span className="font-black text-base tracking-tight">{city.city}</span>
                </div>
                <div className="flex items-center gap-1.5 font-black text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {city.rating}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Charts */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-10">
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Cuisine Market Saturation</h4>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Global Share by Volume</p>
              </div>
              <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest">Vertical Index</div>
            </div>
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topCuisines} layout="vertical" margin={{ left: 20 }}>
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fontWeight: 900, fill: '#1e293b' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '16px' }} 
                  />
                  <Bar dataKey="value" fill="url(#blueGradient)" radius={[0, 12, 12, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Q&A / Insight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
              <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Zap className="text-blue-600 w-6 h-6" /> Market FAQ
              </h4>
              <div className="space-y-6">
                {[
                  { q: "Profitability Leader?", a: "Price Range 4 (Luxury) shows the highest table booking rate but lowest delivery dependence." },
                  { q: "Expansion Hotspot?", a: "Cities like Inner City and Taguig are underserved quality-high markets with low venue density." },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-sm font-black text-slate-900 mb-2">{item.q}</p>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-600 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl shadow-emerald-200">
              <div className="p-4 bg-white/10 rounded-2xl w-fit"><Activity className="w-8 h-8" /></div>
              <h4 className="text-2xl font-black leading-tight">Dynamic Analysis Summary</h4>
              <p className="text-emerald-50 text-lg font-medium leading-relaxed">
                The global restaurant market is currently <strong>oversaturated</strong> in budget Indian/Chinese segments, while <strong>Premium-Convenience</strong> (High price + Online Delivery) is a blue ocean.
              </p>
              <div className="pt-4">
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[78%]"></div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2">Market Efficiency Index</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CityView({ city, cityData, onCompare, onBack, onEmailRequest }: { city: string, cityData: CityData, onCompare: (city: string) => void, onBack: () => void, onEmailRequest: () => void }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center gap-8 no-print">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-5 bg-white border-2 border-slate-100 rounded-3xl hover:bg-[#FACC15] hover:border-[#FACC15] transition-all shadow-sm group">
            <ArrowLeftRight className="w-6 h-6 rotate-180 group-hover:scale-110 transition-transform" />
          </button>
          <div className="space-y-1">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{city}</h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FACC15]" /> Location Intelligence Report
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <button 
            onClick={() => onCompare(city)}
            className="px-8 py-4 bg-[#111111] text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#FACC15] hover:text-slate-900 transition-all active:scale-95 shadow-xl"
          >
            Compare Hub
          </button>
          <button 
            onClick={handlePrint}
            className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-3"
          >
            <Download className="w-4 h-4" /> Save as PDF
          </button>
          <button 
            onClick={onEmailRequest}
            className="px-8 py-4 bg-[#FACC15] text-slate-900 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl hover:bg-slate-900 hover:text-white transition-all active:scale-95 flex items-center gap-3"
          >
            <Mail className="w-4 h-4" /> Email Report
          </button>
        </div>
      </div>

      {/* City Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Market Density", value: cityData.stats.count, icon: Utensils, color: "slate", suffix: "Venues" },
          { label: "Quality Index", value: cityData.stats.avgRating, icon: Star, color: "yellow", suffix: "/ 5.0" },
          { label: "Economic Index", value: `₹${cityData.stats.avgCost}`, icon: DollarSign, color: "slate", suffix: "Avg (2)" },
          { label: "Top Segment", value: cityData.stats.topCuisine, icon: ShoppingBag, color: "emerald", suffix: "Cuisine" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-2xl hover:border-[#FACC15] transition-all">
            <div className={`p-4 ${stat.color === 'yellow' ? 'bg-[#FACC15] text-slate-900' : 'bg-slate-50 text-slate-600'} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-all duration-500`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">{stat.label}</p>
            <h3 className="text-4xl font-black text-slate-900 mt-1 relative z-10">{stat.value}</h3>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 relative z-10">{stat.suffix}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-1">
               <span className="text-[#ef4444] font-black uppercase tracking-[0.3em] text-[10px]">Chef's Selection</span>
               <h4 className="text-3xl font-black text-slate-900 tracking-tighter">Cuisine Penetration</h4>
            </div>
            <div className="p-4 bg-slate-50 text-slate-900 rounded-2xl"><Activity className="w-6 h-6" /></div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData.cuisines}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} />
                <Bar dataKey="value" fill="#111111" radius={[10, 10, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#111111] rounded-[3.5rem] p-12 text-white relative overflow-hidden flex flex-col justify-between group shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <Zap className="w-64 h-64" />
           </div>
           <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                 <span className="text-[#FACC15] font-black uppercase tracking-[0.3em] text-[10px]">Strategic Matrix</span>
                 <h4 className="text-4xl font-black tracking-tighter leading-none">Economic Spread.</h4>
              </div>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                 The pricing logic for {city} aligns with mass-market accessibility. Maximum share is captured in Price Range {cityData.priceRange.sort((a,b) => b.count - a.count)[0]?.range}.
              </p>
           </div>
           
           <div className="relative z-10 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cityData.priceRange}
                    cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={8}
                    dataKey="count" nameKey="range"
                  >
                    {cityData.priceRange.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '24px', color: '#000' }} />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Intelligence Grid */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Layers className="w-64 h-64" />
        </div>
        <h4 className="text-3xl font-black mb-12 flex items-center gap-4">
           <Zap className="text-amber-400 w-8 h-8" /> Strategy Matrix for {city}
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-4 hover:bg-white/10 transition-all">
              <h5 className="text-blue-400 font-black tracking-widest text-xs uppercase">Market Saturation</h5>
              <p className="text-xl font-bold leading-tight">
                {cityData.stats.count > 100 ? "Highly saturated market. New entrants must focus on niche specialization rather than volume." : "Emerging market density. Significant opportunity for scale-focused restaurant groups."}
              </p>
           </div>
           <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-4 hover:bg-white/10 transition-all">
              <h5 className="text-emerald-400 font-black tracking-widest text-xs uppercase">Pricing Logic</h5>
              <p className="text-xl font-bold leading-tight">
                Current average cost is ₹{cityData.stats.avgCost}. Strategy should align with <strong>Price Range {cityData.priceRange.sort((a,b) => b.count - a.count)[0]?.range}</strong> to capture maximum market share.
              </p>
           </div>
           <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-4 hover:bg-white/10 transition-all">
              <h5 className="text-amber-400 font-black tracking-widest text-xs uppercase">Success Factor</h5>
              <p className="text-xl font-bold leading-tight">
                {cityData.stats.avgRating > 3.8 ? "Quality threshold is exceptionally high. Customer service must be the primary focus." : "Low quality barrier. A high-quality concept will likely dominate the market quickly."}
              </p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">Elite Venues in {city}</h4>
          <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm">Verified Samples</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white border-b border-slate-100">
                <th className="px-10 py-6">Restaurant Entity</th>
                <th className="px-10 py-6">Performance</th>
                <th className="px-10 py-6">Engagement</th>
                <th className="px-10 py-6 text-center">Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cityData.restaurants.map((rest, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-6 font-black text-slate-900 text-base group-hover:text-blue-600 transition-colors">{rest['Restaurant Name']}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-4 py-1.5 bg-emerald-500 text-white text-[11px] font-black rounded-xl shadow-lg shadow-emerald-100">
                        {rest['Aggregate rating']}
                      </span>
                      {rest['Aggregate rating'] > 4.5 && <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
                    </div>
                  </td>
                  <td className="px-10 py-6 font-black text-slate-500">{rest['Votes'].toLocaleString()} <span className="text-[10px] text-slate-300 font-bold ml-1">VOTES</span></td>
                  <td className="px-10 py-6 text-center font-black text-emerald-600 text-lg tracking-[0.3em]">{"₹".repeat(rest['Price range'])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComparisonView({ city1, city2, data1, data2, onBack }: { city1: string, city2: string, data1: CityData, data2: CityData, onBack: () => void }) {
  const comparisonData = [
    { name: "Avg Rating", [city1]: data1.stats.avgRating, [city2]: data2.stats.avgRating },
    { name: "Density (10x)", [city1]: data1.stats.count / 10, [city2]: data2.stats.count / 10 },
    { name: "Cost Index (100x)", [city1]: data1.stats.avgCost / 100, [city2]: data2.stats.avgCost / 100 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
       <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-5 bg-white border-2 border-slate-100 rounded-3xl hover:bg-[#FACC15] hover:border-[#FACC15] transition-all shadow-sm group">
          <ArrowLeftRight className="w-6 h-6 rotate-180 group-hover:scale-110 transition-transform" />
        </button>
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Comparison Intelligence</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Mapping Market Deltas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <h4 className="text-2xl font-black tracking-tight">Cross-Market Analytics</h4>
            <div className="flex flex-wrap gap-8">
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#111111] rounded-full shadow-lg"></div>
                  <span className="text-[10px] font-black text-slate-900 tracking-[0.2em] uppercase">{city1}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FACC15] rounded-full shadow-lg shadow-[#FACC15]/20"></div>
                  <span className="text-[10px] font-black text-slate-900 tracking-[0.2em] uppercase">{city2}</span>
               </div>
            </div>
          </div>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 900, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '20px' }} />
                <Bar dataKey={city1} fill="#111111" radius={[10, 10, 0, 0]} barSize={45} />
                <Bar dataKey={city2} fill="#FACC15" radius={[10, 10, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#111111] p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute -right-20 -bottom-20 opacity-5">
              <Smartphone className="w-96 h-96" />
            </div>
            <h4 className="text-3xl font-black mb-10 flex items-center gap-4 text-[#FACC15]">
              <Zap className="w-8 h-8" /> Delta Insights
            </h4>
            <div className="space-y-8 relative z-10">
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                <p className="text-[10px] text-[#FACC15] font-black uppercase tracking-[0.3em] mb-3">Consumer Choice</p>
                <p className="text-2xl font-bold leading-tight text-slate-100">
                  {data1.stats.avgRating > data2.stats.avgRating ? city1 : city2} dominates in customer satisfaction with a {Math.abs(data1.stats.avgRating - data2.stats.avgRating).toFixed(2)} point lead.
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-3">Economic Delta</p>
                <p className="text-2xl font-bold leading-tight text-slate-100">
                  {data1.stats.avgCost < data2.stats.avgCost ? city1 : city2} is significantly more accessible for mass-market dining concepts.
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                <p className="text-[10px] text-[#ef4444] font-black uppercase tracking-[0.3em] mb-3">Saturation Risk</p>
                <p className="text-2xl font-bold leading-tight text-slate-100">
                  {data1.stats.count < data2.stats.count ? city1 : city2} is the high-growth opportunity zone due to lower current market density.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
