import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-slate-700 dark:bg-slate-900 dark:text-gray-300 border-t border-gray-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Local Service Agency
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Connecting you with trusted professionals for all your home service needs. Experience precision and reliability.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#home" className="hover:text-indigo-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-indigo-500 transition-colors">Services</a></li>
              <li><a href="#how-it-works" className="hover:text-indigo-500 transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-indigo-500 transition-colors">Features</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Plumbing</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Electrical</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Cleaning</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">AC Repair</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +92 XXX XXX XXXX
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                support@localservice.com
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs">
            © 2026 <span className="font-bold">Local Service Agency</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-500 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
