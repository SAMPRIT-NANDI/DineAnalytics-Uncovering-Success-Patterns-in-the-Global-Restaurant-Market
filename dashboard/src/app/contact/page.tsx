"use client";

import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Github, Globe, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-24 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Wave Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#111111] -z-10 rounded-l-[10rem] translate-x-1/4 opacity-10"></div>

      {/* Header */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex p-4 bg-yellow-50 text-yellow-700 rounded-3xl mb-4 animate-float">
          <MessageSquare className="w-10 h-10" />
        </div>
        <h1 className="text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] animate-slide-up">
          Let's Start a <br />
          <span className="font-caveat text-[#FACC15] text-9xl lowercase">Conversation.</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed animate-fade-in delay-300">
          Whether you're looking for custom city reports or deep-dive restaurant analysis, our intelligence team is ready to assist.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden animate-slide-left">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Direct Inquiry</h2>
          
          {formState === "success" ? (
            <div className="py-20 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-slate-900">Message Dispatched!</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">Our analysts will review your request and get back to you within 24 hours.</p>
              <button onClick={() => setFormState("idle")} className="text-[#FACC15] font-black uppercase tracking-widest text-xs hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Full Identity</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-[#FACC15] focus:bg-white transition-all font-bold text-slate-900" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Email Node</label>
                  <input required type="email" placeholder="john@enterprise.com" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-[#FACC15] focus:bg-white transition-all font-bold text-slate-900" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Analysis Subject</label>
                <input required type="text" placeholder="Custom City Performance Report" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-[#FACC15] focus:bg-white transition-all font-bold text-slate-900" />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Message Payload</label>
                <textarea required rows={5} placeholder="Describe the data scope you need..." className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-[#FACC15] focus:bg-white transition-all font-bold text-slate-900 resize-none"></textarea>
              </div>
              
              <button 
                disabled={formState === "sending"}
                className="w-full flex items-center justify-center gap-4 px-10 py-5 bg-[#111111] text-white font-black rounded-2xl hover:bg-[#FACC15] hover:text-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl group disabled:opacity-70"
              >
                {formState === "sending" ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="uppercase tracking-widest text-sm">{formState === "sending" ? "Transmitting..." : "Send Analysis Request"}</span>
                {formState === "idle" && <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-2 transition-transform" />}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-12 animate-slide-right">
          <div className="bg-[#111111] p-12 rounded-[3.5rem] shadow-2xl text-white space-y-10 relative overflow-hidden group">
            <h3 className="text-3xl font-black tracking-tight relative z-10 text-[#FACC15]">Global Presence</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6 group/item">
                <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-[#FACC15] group-hover/item:text-slate-900 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Electronic Mail</p>
                  <p className="text-xl font-bold">intelligence@dineanalytics.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group/item">
                <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-emerald-600 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-xl font-bold">+91 (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group/item">
                <div className="p-4 bg-white/10 rounded-2xl group-hover/item:bg-amber-600 transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">HQ Location</p>
                  <p className="text-xl font-bold">Innovation Hub, New Delhi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Social Network</h3>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, color: "blue" },
                { icon: Github, color: "slate" },
                { icon: Globe, color: "indigo" }
              ].map((social, i) => (
                <button key={i} className={`p-5 bg-slate-50 rounded-2xl hover:bg-${social.color}-600 hover:text-white transition-all group`}>
                  <social.icon className="w-6 h-6" />
                </button>
              ))}
            </div>
            <p className="text-slate-400 font-medium leading-relaxed">
              Follow our technical updates for the latest in restaurant machine learning and data engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
