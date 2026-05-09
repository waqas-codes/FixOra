import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workersImg from '../assets/workers.jpg';

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
      <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end relative group perspective-1000">
        <div
          ref={cardRef}
          className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 ease-out shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(99,102,241,0.4)]"
        >
          {/* Soft glow enhancer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 mix-blend-overlay z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <img 
            src={workersImg} 
            alt="Our Professional Workers" 
            className="w-full h-auto object-cover relative z-0 transform transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
