import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Search Service',
    description: 'User selects required service from our curated list of options.',
  },
  {
    number: '02',
    title: 'Book Request',
    description: 'User submits a detailed request along with their schedule preferences.',
  },
  {
    number: '03',
    title: 'Get Service',
    description: 'A verified professional is assigned and completes the job efficiently.',
  }
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            immediateRender: false
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 px-6 max-w-7xl mx-auto mt-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <div 
            key={index} 
            ref={el => stepsRef.current[index] = el}
            className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-white/20 transition-all duration-300 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {step.number}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
