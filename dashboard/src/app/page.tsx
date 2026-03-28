"use client";

import { useEffect, useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Utensils, MapPin, Star, TrendingUp, ShoppingBag, DollarSign,
  Search, Filter, ChevronRight, BrainCircuit, Target, Info, LogOut, User
} from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  priceDistribution: { range: string; count: number }[];
  topCities: { city: string; rating: number }[];
  deliveryImpact: { delivery: string; rating: number }[];
  restaurants: any[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316'];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

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

  // Filter Logic - FIXED: Using explicit dependencies and ensuring it updates correctly
  const filteredRestaurants = useMemo(() => {
    if (!data) return [];
    
    // Perform filtering on the full restaurant list
    return data.restaurants.filter(rest => {
      // Search matching (Name, City, or Cuisines)
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = searchLower === "" || 
                          rest['Restaurant Name'].toLowerCase().includes(searchLower) ||
                          rest['City'].toLowerCase().includes(searchLower) ||
                          rest['Cuisines'].toLowerCase().includes(searchLower);
      
      // Price matching
      const matchesPrice = !priceFilter || priceFilter === "" || String(rest['Price range']) === priceFilter;
      
      return matchesSearch && matchesPrice;
    });
  }, [data, searchQuery, priceFilter]); // Explicitly track these dependencies

  if (status === "loading" || loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-xl font-medium text-slate-600 animate-pulse flex items-center gap-2">
          <Utensils className="animate-spin" />
          Loading DineAnalytics Dashboard...
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      {/* Top Nav / User Info */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" />
            ) : (
              <div className="p-1.5 bg-slate-100 rounded-full"><User className="w-4 h-4 text-slate-500" /></div>
            )}
            <span className="text-sm font-medium text-slate-700">{session?.user?.name || "User"}</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">DineAnalytics</h1>
            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">AI Powered</div>
          </div>
          <p className="text-slate-500 mt-1">Restaurant Industry Success Patterns & Insights Dashboard</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name, city or cuisine..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            <select 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer"
              onChange={(e) => setPriceFilter(e.target.value || null)}
              value={priceFilter || ""}
            >
              <option value="">All Prices</option>
              <option value="1">₹ (Budget)</option>
              <option value="2">₹₹ (Mid)</option>
              <option value="3">₹₹₹ (Premium)</option>
              <option value="4">₹₹₹₹ (Luxury)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Restaurants</p>
            <h3 className="text-2xl font-bold mt-1">{data.stats.totalRestaurants.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Utensils className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Average Rating</p>
            <h3 className="text-2xl font-bold mt-1">{data.stats.avgRating} / 5.0</h3>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
            <Star className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Votes</p>
            <h3 className="text-2xl font-bold mt-1">{data.stats.totalVotes.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Avg Cost (for 2)</p>
            <h3 className="text-2xl font-bold mt-1">₹{data.stats.avgCostForTwo.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Machine Learning Insights Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="text-blue-600 w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-800">Machine Learning Insights</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Model Performance */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="w-5 h-5" /> Predictive Model
              </h4>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase">Regression</span>
            </div>
            <p className="text-blue-100 text-sm mb-6">{data.mlInsights.modelName} trained on restaurant features.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Model Accuracy (R² Score)</span>
                  <span>{Math.round(data.mlInsights.accuracy_r2 * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: `${data.mlInsights.accuracy_r2 * 100}%` }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <p className="text-[10px] text-blue-200 uppercase font-bold">MSE Error</p>
                  <p className="text-lg font-bold">{data.mlInsights.error_mse}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <p className="text-[10px] text-blue-200 uppercase font-bold">Confidence</p>
                  <p className="text-lg font-bold">High</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-2 text-xs bg-white/10 p-3 rounded-lg italic text-blue-50 border border-white/5">
              <Info className="w-4 h-4 shrink-0" />
              {data.mlInsights.predictionNote}
            </div>
          </div>

          {/* Feature Importance Radar */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
              Feature Importance: What drives ratings?
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.mlInsights.featureImportance}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="feature" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Importance (%)"
                    dataKey="importance"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2 italic">
              AI analysis suggests that <strong>Votes</strong> and <strong>Price Range</strong> are key success indicators.
            </p>
          </div>
        </div>
      </section>

      {/* Main Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h4 className="font-semibold text-slate-800 mb-6">Market Dominance: Top 10 Cuisines</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCuisines} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h4 className="font-semibold text-slate-800 mb-6 text-center">Affordability Distribution</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.priceDistribution}
                  cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}
                  dataKey="count" nameKey="range" label={({ range }) => `₹`.repeat(Number(range))}
                >
                  {data.priceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Explorer Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h4 className="font-bold text-slate-800">Restaurant Explorer</h4>
            <p className="text-xs text-slate-500 font-medium">Found {filteredRestaurants.length} matching restaurants</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            Real-time Filtering Active
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100">
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Cuisines</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Votes</th>
                <th className="px-6 py-4 text-center">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRestaurants.length > 0 ? filteredRestaurants.map((rest, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{rest['Restaurant Name']}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {rest['City']}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{rest['Cuisines']}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold text-white shadow-sm ${
                      rest['Aggregate rating'] >= 4 ? 'bg-green-500' : 
                      rest['Aggregate rating'] >= 3 ? 'bg-yellow-500' : 'bg-slate-400'
                    }`}>
                      {rest['Aggregate rating']}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{rest['Votes'].toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-bold tracking-widest">
                      {"₹".repeat(rest['Price range'])}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-slate-100 rounded-full"><Search className="w-8 h-8 opacity-20" /></div>
                      <p className="font-medium">No results found for your search criteria.</p>
                      <button 
                        onClick={() => {setSearchQuery(""); setPriceFilter(null);}}
                        className="text-blue-600 font-bold hover:underline text-xs bg-blue-50 px-4 py-2 rounded-lg"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pb-10 text-center text-slate-400 text-xs border-t border-slate-100 pt-10">
        <p className="font-medium tracking-tight uppercase">© 2026 DineAnalytics AI Dashboard • Cognifyz Technologies Internship Project</p>
        <div className="flex items-center justify-center gap-6 mt-4 grayscale opacity-40 font-bold tracking-wider">
          <span className="flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5" /> AI ENGINE</span>
          <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> DATA SCIENCE</span>
          <span className="flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5" /> GASTRONOMY</span>
        </div>
      </footer>
    </div>
  );
}
