import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 shadow-2xl shadow-indigo-500/20">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Ready to book your service?
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of happy customers who trust Local Service Agency for their home and service needs. Get started now in just a few clicks.
          </p>
          <Link 
            to="/book-service"
            className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] text-lg inline-block"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
