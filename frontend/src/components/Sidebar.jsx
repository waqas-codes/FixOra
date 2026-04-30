import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Wrench, 
  ClipboardList, 
  Users, 
  Star, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { to: user?.role === 'admin' ? '/admin' : '/customer', icon: LayoutDashboard, label: 'Dashboard' },
    { to: user?.role === 'admin' ? '/admin/services' : '/customer/services', icon: Wrench, label: 'Services' },
    { to: user?.role === 'admin' ? '/admin/requests' : '/customer/requests', icon: ClipboardList, label: 'Requests' },
    { to: '/admin/workers', icon: Users, label: 'Workers', adminOnly: true },
    { to: user?.role === 'admin' ? '/admin/reviews' : '/customer/reviews', icon: Star, label: 'Reviews' },
  ];

  const filteredItems = menuItems.filter(item => !item.adminOnly || user?.role === 'admin');

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group relative ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/10'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] border-r border-slate-800/50 shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Brand */}
      <div className={`p-8 flex items-center justify-between ${collapsed ? 'px-4' : 'px-8'}`}>
        {!collapsed && (
          <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40">
              <ShieldCheck size={20} />
            </span>
            <span>Fix<span className="text-blue-500">Ora</span></span>
          </h1>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/40">
            <ShieldCheck size={22} />
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
        <p className={`text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-4 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•••' : 'Main Menu'}
        </p>
        
        {filteredItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin' || item.to === '/customer'}
            className={linkClasses}
            onClick={() => setMobileOpen(false)}
          >
            <item.icon size={22} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="flex-1">{item.label}</span>}
            
            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-16 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-2xl border border-slate-700">
                {item.label}
              </div>
            )}
            
            {/* Active Indicator */}
            <span className={`absolute right-2 w-1.5 h-1.5 rounded-full bg-white opacity-0 transition-opacity duration-300 group-[.active]:opacity-100 ${collapsed ? 'hidden' : ''}`} />
          </NavLink>
        ))}
      </nav>

      {/* User Card */}
      <div className={`p-4 mt-auto border-t border-slate-800/50 bg-slate-900/30 ${collapsed ? 'items-center' : ''}`}>
        {!collapsed && (
          <div className="mb-4 px-2">
             <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
                  {user?.name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">{user?.role}</p>
                </div>
             </div>
          </div>
        )}
        
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 group relative ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
             <div className="absolute left-16 px-3 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <div className="p-4 flex justify-center hidden lg:flex">
         <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-2 flex items-center justify-center rounded-xl bg-slate-800/30 text-slate-500 hover:text-white hover:bg-slate-800 transition-all duration-300 border border-slate-700/30"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header (Hidden on Large Screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center px-4 justify-between">
        <h1 className="text-xl font-black text-slate-900">FixOra</h1>
        <button
          className="p-2 bg-slate-900 rounded-xl text-white shadow-lg active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar Container */}
      <aside 
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[45] animate-in fade-in duration-300" onClick={() => setMobileOpen(false)} />
      )}
      
      {/* Mobile Sidebar Content */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-[50] w-72 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full w-full bg-[#0F172A] shadow-2xl relative">
          {/* Close button inside mobile sidebar */}
          <button 
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
