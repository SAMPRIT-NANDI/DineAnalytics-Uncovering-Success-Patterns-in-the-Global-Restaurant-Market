"use client";

import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Utensils, MapPin, Star, TrendingUp, ShoppingBag, DollarSign,
  Search, Filter, ChevronRight
} from 'lucide-react';

interface DashboardData {
  stats: {
    totalRestaurants: number;
    avgRating: number;
    totalVotes: number;
    avgCostForTwo: number;
  };
  topCuisines: { name: string; value: number }[];
  priceDistribution: { range: string; count: number }[];
  topCities: { city: string; rating: number }[];
  deliveryImpact: { delivery: string; rating: number }[];
  restaurants: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/dashboard-data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(json ? false : true);
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">DineAnalytics</h1>
          <p className="text-slate-500 mt-1">Restaurant Industry Success Patterns & Insights Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search restaurants..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            Filter Data
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Restaurants</p>
            <h3 className="text-2xl font-bold mt-1">{data.stats.totalRestaurants.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Utensils className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Average Rating</p>
            <h3 className="text-2xl font-bold mt-1">{data.stats.avgRating} / 5.0</h3>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
            <Star className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Votes</p>
            <h3 className="text-2xl font-bold mt-1">{data.stats.totalVotes.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Avg Cost (for 2)</p>
            <h3 className="text-2xl font-bold mt-1">₹{data.stats.avgCostForTwo.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Top Cuisines */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800">Top 10 Most Popular Cuisines</h4>
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
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Range Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800">Price Range Distribution</h4>
            <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">BY COUNT</span>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
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
                  label={({ range }) => `Price ${range}`}
                >
                  {data.priceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Cities by Rating */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800">Highest Rated Cities</h4>
            <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">TOP 10</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCities} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="city" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 5]} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="rating" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Impact */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold text-slate-800">Impact of Online Delivery on Ratings</h4>
            <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">YES VS NO</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.deliveryImpact} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="delivery" 
                  tick={{ fontSize: 14, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Has Online Delivery', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  domain={[0, 5]} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="rating" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Restaurant List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <h4 className="font-semibold text-slate-800">Detailed Restaurant Sample Data</h4>
          <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
            View all restaurants <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Cuisines</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Votes</th>
                <th className="px-6 py-4 text-center">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {data.restaurants.map((rest, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">{rest['Restaurant Name']}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {rest['City']}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{rest['Cuisines']}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                        rest['Aggregate rating'] >= 4 ? 'bg-green-500' : 
                        rest['Aggregate rating'] >= 3 ? 'bg-yellow-500' : 'bg-slate-400'
                      }`}>
                        {rest['Aggregate rating']}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{rest['Votes'].toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-bold">
                      {"₹".repeat(rest['Price range'])}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-10 text-center text-slate-400 text-sm border-t border-slate-100 pt-8">
        <p>© 2026 DineAnalytics Dashboard • Cognifyz Technologies Data Analysis Internship</p>
        <p className="mt-1 font-medium text-slate-500">Built with Next.js, Recharts, and Tailwind CSS</p>
      </footer>
    </div>
  );
}
