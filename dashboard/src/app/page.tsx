"use client";

import { useEffect, useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Utensils, MapPin, Star, TrendingUp, ShoppingBag, DollarSign,
  Search, Filter, ChevronRight, BrainCircuit, Target, Info
} from 'lucide-react';

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
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

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

  // Filter Logic
  const filteredRestaurants = useMemo(() => {
    if (!data) return [];
    return data.restaurants.filter(rest => {
      const matchesSearch = rest['Restaurant Name'].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rest['City'].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rest['Cuisines'].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = priceFilter ? String(rest['Price range']) === priceFilter : true;
      return matchesSearch && matchesPrice;
    });
  }, [data, searchQuery, priceFilter]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-xl font-medium text-slate-600 animate-pulse flex items-center gap-2">
          <Utensils className="animate-spin" />
          Loading DineAnalytics Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">DineAnalytics</h1>
            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">AI Powered</div>
          </div>
          <p className="text-slate-500 mt-1">Full-Stack Data Analysis & Machine Learning Dashboard</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name, city or cuisine..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>
          <select 
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            onChange={(e) => setPriceFilter(e.target.value || null)}
            value={priceFilter || ""}
          >
            <option value="">All Price Ranges</option>
            <option value="1">Price: ₹ (Budget)</option>
            <option value="2">Price: ₹₹ (Mid)</option>
            <option value="3">Price: ₹₹₹ (Premium)</option>
            <option value="4">Price: ₹₹₹₹ (Luxury)</option>
          </select>
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
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-[10px] text-blue-200 uppercase font-bold">MSE Error</p>
                  <p className="text-lg font-bold">{data.mlInsights.error_mse}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
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
            <p className="text-center text-xs text-slate-400 mt-2">
              Our AI analysis shows that <strong>Votes</strong> and <strong>Cost</strong> are the biggest predictors of a restaurant's aggregate rating.
            </p>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Top Cuisines */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800">Market Dominance: Top 10 Cuisines</h4>
            <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">BY FREQUENCY</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCuisines} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Range Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800">Affordability Distribution</h4>
            <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">BY COUNT</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.priceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="range"
                  label={({ range }) => `₹`.repeat(Number(range))}
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

      {/* Restaurant List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h4 className="font-semibold text-slate-800">Data Explorer</h4>
            <p className="text-xs text-slate-500">Showing {filteredRestaurants.length} results</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">REAL-TIME FILTERING</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
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
                  <td className="px-6 py-4 font-medium text-slate-900">{rest['Restaurant Name']}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {rest['City']}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{rest['Cuisines']}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white ${
                      rest['Aggregate rating'] >= 4 ? 'bg-green-500' : 
                      rest['Aggregate rating'] >= 3 ? 'bg-yellow-500' : 'bg-slate-400'
                    }`}>
                      {rest['Aggregate rating']}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{rest['Votes'].toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-bold">
                      {"₹".repeat(rest['Price range'])}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-10 h-10 opacity-20" />
                      <p>No restaurants found matching your filters.</p>
                      <button 
                        onClick={() => {setSearchQuery(""); setPriceFilter(null);}}
                        className="text-blue-600 font-medium hover:underline text-xs"
                      >
                        Clear all filters
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
      <footer className="mt-16 pb-10 text-center text-slate-400 text-sm border-t border-slate-100 pt-8">
        <p>© 2026 DineAnalytics AI Dashboard • Cognifyz Technologies Internship Project</p>
        <div className="flex items-center justify-center gap-4 mt-3 grayscale opacity-60">
          <div className="flex items-center gap-1"><BrainCircuit className="w-4 h-4" /> Machine Learning</div>
          <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Data Science</div>
          <div className="flex items-center gap-1"><Utensils className="w-4 h-4" /> Food Industry</div>
        </div>
      </footer>
    </div>
  );
}
