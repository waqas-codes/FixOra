import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user"); // Using "user" as it contains the token

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="fixed w-full top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-slate-900 dark:text-white transition-colors duration-300">Fix</span>
          <span className="text-gradient">Ora</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            Home
          </a>
          <a href="#services" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">Services</a>
          <a href="#how-it-works" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">How It Works</a>
          <a href="#features" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">Features</a>
        </div>

        {/* Button & Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          {token ? (
            <button
              onClick={handleLogout}
              className="btn-primary hover:scale-105 active:scale-95 transition-transform duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/signin" className="btn-primary hover:scale-105 active:scale-95 transition-transform duration-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
