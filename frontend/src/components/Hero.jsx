import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Heading
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        clearProps: "all",
        immediateRender: false
      });

      // Description
      gsap.from(descRef.current, {
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        clearProps: "all",
        immediateRender: false
      });

      // Button 1
      gsap.from(btn1Ref.current, {
        scrollTrigger: {
          trigger: btn1Ref.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all",
        immediateRender: false
      });

      // Button 2
      gsap.from(btn2Ref.current, {
        scrollTrigger: {
          trigger: btn2Ref.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all",
        immediateRender: false
      });

      // Card
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out",
        clearProps: "all",
        immediateRender: false
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[70vh] gap-12 pt-32 px-6 lg:mt-0">

      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1
          ref={headingRef}
          className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white"
        >
          Find Trusted Local <span className="text-gradient">Services Easily</span>
        </h1>
        <p
          ref={descRef}
          className="text-gray-600 dark:text-gray-400 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Experience precision-engineered service delivery. From electrical repairs to professional carpentry, we connect you with verified experts in minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/book-service"
            ref={btn1Ref}
            className="btn-primary w-full sm:w-auto text-center"
          >
            Book a Pro Now
          </Link>
          <button
            ref={btn2Ref}
            className="glass hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-medium py-2 px-6 rounded-full transition-all duration-300 w-full sm:w-auto hover:scale-105 active:scale-95"
          >
            Watch how it works
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
        <div
          ref={cardRef}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 lg:p-8 w-full max-w-sm relative overflow-hidden shadow-md hover:scale-105 transition-all duration-300"
        >
          {/* Subtle gradient glow behind the card content */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 p-1 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-slate-800 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="John Davis" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg leading-tight">John Davis</h3>
                  <p className="text-indigo-600 dark:text-indigo-300 text-sm">Lead Master Electrician</p>
                </div>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                On Site
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 dark:text-gray-300">Project Progress</span>
                  <span className="text-gray-900 dark:text-white font-medium">85% Complete</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden border border-gray-300 dark:border-white/5">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[85%] relative">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 border border-gray-200 dark:border-white/5">
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase tracking-wider">Time Elapsed</p>
                  <p className="text-gray-900 dark:text-white font-medium text-lg">4h 45m</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 border border-gray-200 dark:border-white/5">
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase tracking-wider">ETA</p>
                  <p className="font-medium text-lg text-emerald-600 dark:text-emerald-400">15 mins</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-xs">Background checked & certified professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
