"use client";

import { History, Target, TrendingUp, Award, Clock, Users, Globe, Zap, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Data Points", value: "95k+", icon: Zap, color: "blue" },
    { label: "Cities Analyzed", value: "400+", icon: Globe, color: "emerald" },
    { label: "Accuracy Rate", value: "94%", icon: Target, color: "amber" },
    { label: "Active Users", value: "500+", icon: Users, color: "indigo" },
  ];

  const timeline = [
    { year: "Phase 1", title: "Foundation", event: "Initial data cleaning and exploratory analysis of 9,500+ restaurants.", icon: CheckCircle2 },
    { year: "Phase 2", title: "Intelligence", event: "Development of statistical models and city-level distribution analysis.", icon: CheckCircle2 },
    { year: "Phase 3", title: "Prediction", event: "Integration of Machine Learning (Random Forest) for rating prediction.", icon: CheckCircle2 },
    { year: "Phase 4", title: "Scale", event: "Launch of interactive DineAnalytics full-stack dashboard with real-time insights.", icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-24 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 py-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-5">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 animate-fade-in">
          <History className="w-5 h-5 animate-spin-slow" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Our Legacy & Future</span>
        </div>
        
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] animate-slide-up">
          Engineering the <br />
          <span className="text-gradient">Next Generation</span> of Dining.
        </h1>
        
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
          DineAnalytics isn't just a dashboard—it's a sophisticated intelligence engine designed to decode the complex DNA of the global restaurant market.
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all group relative overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-slide-left">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Objective</h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            The project was born from a simple observation: the dining industry is drowning in data but starving for insights. We built DineAnalytics to bridge that gap. 
          </p>
          <p className="text-lg text-slate-600 leading-relaxed font-medium italic border-l-4 border-blue-600 pl-6 py-2">
            "We don't just show you what happened; we use machine learning to predict what happens next."
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
             <div className="space-y-2">
                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Innovation</h4>
                <p className="text-sm text-slate-500">Proprietary Random Forest models trained on 9.5k+ venues.</p>
             </div>
             <div className="space-y-2">
                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Speed</h4>
                <p className="text-sm text-slate-500">Sub-100ms response times for complex market queries.</p>
             </div>
          </div>
        </div>
        
        <div className="relative group animate-slide-right">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-all"></div>
          <div className="relative bg-white p-4 rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop" 
              alt="Data Analytics" 
              className="w-full h-full object-cover rounded-[2.5rem] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <section className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100 space-y-16 overflow-hidden relative">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Evolutionary Roadmap</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Journey from Data to Intelligence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="space-y-6 group animate-slide-up" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.year}</span>
                <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Section */}
      <section className="bg-slate-900 p-16 rounded-[4rem] text-white text-center space-y-10 relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] opacity-50"></div>
        </div>
        
        <div className="relative z-10 space-y-6">
          <TrendingUp className="w-16 h-16 text-blue-400 mx-auto animate-float" />
          <h2 className="text-5xl font-black tracking-tighter leading-none">The Future of <br />DineAnalytics</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            We are pushing the boundaries with **Sentiment Analysis** using NLP and **Real-time API** feeds for instantaneous market monitoring.
          </p>
          <div className="pt-8">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-500/20 uppercase tracking-widest text-xs active:scale-95">
              Explore Roadmap
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
