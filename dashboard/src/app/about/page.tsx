import { History, Target, TrendingUp, Award, Clock } from "lucide-react";

export default function AboutPage() {
  const timeline = [
    { year: "Phase 1", event: "Initial data cleaning and exploratory analysis of 9,500+ restaurants." },
    { year: "Phase 2", event: "Development of statistical models and city-level distribution analysis." },
    { year: "Phase 3", event: "Integration of Machine Learning (Random Forest) for rating prediction." },
    { year: "Phase 4", event: "Launch of interactive DineAnalytics full-stack dashboard." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-10">
      <section className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-3xl mb-4">
          <History className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">Project History & Evolution</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          From a simple dataset to a powerful intelligence platform. DineAnalytics was born to transform raw restaurant data into actionable business insights.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit"><Target className="w-6 h-6" /></div>
          <h2 className="text-2xl font-bold">Our Objective</h2>
          <p className="text-slate-600 leading-relaxed">
            The project aimed to solve the challenge of information overload in the dining industry. By analyzing cuisines, pricing, and service trends, we help entrepreneurs make data-driven decisions on where to open their next restaurant and what services to prioritize.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl w-fit"><Award className="w-6 h-6" /></div>
          <h2 className="text-2xl font-bold">Innovation</h2>
          <p className="text-slate-600 leading-relaxed">
            Unlike traditional reports, DineAnalytics uses **Random Forest Regression** to predict how successful a restaurant will be based on its location and services, achieving a high variance explanation rate.
          </p>
        </div>
      </div>

      <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold mb-10 text-center">Development Roadmap</h2>
        <div className="space-y-12">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-6 relative">
              {idx !== timeline.length - 1 && (
                <div className="absolute left-[27px] top-[50px] w-0.5 h-[calc(100%+20px)] bg-slate-100"></div>
              )}
              <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200 z-10">
                <Clock className="w-6 h-6" />
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-blue-600">{item.year}</h3>
                <p className="text-slate-600 mt-1 text-lg">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center p-12 bg-slate-900 rounded-3xl text-white">
        <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Future of DineAnalytics</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          We are currently working on integrating **Natural Language Processing (NLP)** for review sentiment analysis and **Real-time API** connections for live restaurant monitoring.
        </p>
      </section>
    </div>
  );
}
