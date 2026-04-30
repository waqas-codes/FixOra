import { useAuth } from '../context/AuthContext';
import { Bell, Search, Settings, HelpCircle, User } from 'lucide-react';

const Navbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 glass-morphism">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-10 py-4 max-w-[1440px] mx-auto w-full">
        {/* Left: Title & Search */}
        <div className="flex items-center gap-5">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight hidden sm:block">
            {title}
          </h2>
          
          <div className="relative hidden md:block group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={15} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm w-56 focus:w-72 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400/40 transition-all duration-300 outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 pr-3 mr-1 border-r border-slate-200/60">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all hidden sm:flex">
              <HelpCircle size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all hidden sm:flex">
              <Settings size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="hidden lg:flex flex-col items-end">
              <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">
                {user?.name}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">
                {user?.role}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
               {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
