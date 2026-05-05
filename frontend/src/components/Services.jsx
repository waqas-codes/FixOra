import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'Electrician',
    description: 'Expert electrical repairs and installations.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Plumber',
    description: 'Fast and reliable plumbing services.',
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Mechanic',
    description: 'Professional automotive repair and maintenance.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Carpenter',
    description: 'Custom woodworking and furniture repair.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
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
    <section id="services" ref={sectionRef} className="py-16 px-6 max-w-7xl mx-auto mt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Expertise for Every Task
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            ref={el => cardsRef.current[index] = el}
            className="border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-200 dark:hover:shadow-white/5 hover:scale-105 flex flex-col h-full overflow-hidden"
          >
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-40 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm">{service.description}</p>
              <Link 
                to="/book-service" 
                state={{ serviceType: service.title }}
                className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 text-sm text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
