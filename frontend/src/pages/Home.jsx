import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import logo from '../assets/logo.png';
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
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Local Service Agency" className="h-12 md:h-14 object-contain" />
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
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm hover:shadow-md transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
