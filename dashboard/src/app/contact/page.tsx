import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Github, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-10">
      <section className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-3xl mb-4">
          <MessageSquare className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">Get in Touch</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Have questions about the analysis or need a custom restaurant report? Our team is here to help you navigate the data.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Subject</label>
              <input type="text" placeholder="Inquiry about City Analysis" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <textarea placeholder="Tell us what you're looking for..." rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
            </div>
            <button className="md:col-span-2 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Send className="w-5 h-5" />
              Send Inquiry
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-xl font-bold">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Mail className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="text-slate-900 font-medium">contact@dineanalytics.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Phone className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                  <p className="text-slate-900 font-medium">+91 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office</p>
                  <p className="text-slate-900 font-medium">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl shadow-sm text-white space-y-6">
            <h3 className="text-xl font-bold">Connect with us</h3>
            <div className="flex gap-4">
              <button className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-all"><Linkedin className="w-6 h-6" /></button>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-slate-700 transition-all"><Github className="w-6 h-6" /></button>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-indigo-600 transition-all"><Globe className="w-6 h-6" /></button>
            </div>
            <p className="text-slate-500 text-sm">Follow us for latest updates on data insights and analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
