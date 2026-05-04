import React from 'react';

const testimonials = [
  {
    text: "The UI is incredibly clean and booking an electrician was faster than ordering coffee. Also was impressed with their professional and fixed-rate pricing.",
    name: "Sarah Richardson",
    role: "Homeowner",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    text: "I've used dozens of services, but Fixora stands out with transparency and speed. The real-time tracking is a game changer.",
    name: "Michael Ross",
    role: "Property Manager",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    text: "Finally, a service platform that feels modern. No hidden fees, great pros, and excellent customer support if you need it.",
    name: "Lisa Tan",
    role: "Interior Designer",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=lisa"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 transition-colors duration-500 bg-slate-900 text-white dark:bg-white dark:text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by over 10,000 households
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-slate-800 dark:bg-gray-100 flex flex-col h-full group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(item.stars)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 dark:text-slate-600 text-lg italic mb-8 flex-grow leading-relaxed">
                "{item.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50 dark:border-slate-200">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full border-2 border-indigo-500/20 group-hover:border-indigo-500 transition-colors duration-300"
                />
                <div>
                  <h4 className="font-bold text-white dark:text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-400 dark:text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
