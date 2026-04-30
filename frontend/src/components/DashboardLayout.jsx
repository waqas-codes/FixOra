import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ title }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Sidebar Component */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        collapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <Navbar title={title} />
        
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-8 max-w-[1440px] mx-auto w-full mt-0 lg:mt-0">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>

        <footer className="px-6 lg:px-10 py-5 border-t border-slate-200/60 bg-white/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 max-w-[1440px] mx-auto w-full">
            <p className="text-xs text-slate-400 font-medium">&copy; {new Date().getFullYear()} FixOra. Built for excellence.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors font-medium">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
