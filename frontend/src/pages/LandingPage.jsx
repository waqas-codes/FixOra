import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Droplets, 
  Car, 
  Hammer, 
  CheckCircle2, 
  Clock, 
  Users,
  ArrowRight,
  Star,
  Phone,
  Mail,
  MapPin,
  FileText,
  UserCheck,
  CheckSquare
} from 'lucide-react';

const LandingPage = () => {
  const services = [
    { icon: Zap, title: 'Electrician', desc: 'Electrical repairs, installations, and wiring' },
    { icon: Droplets, title: 'Plumber', desc: 'Leak fixes, pipe repairs, and installations' },
    { icon: Car, title: 'Mechanic', desc: 'Vehicle maintenance and repair services' },
    { icon: Hammer, title: 'Carpenter', desc: 'Custom furniture and woodworking' },
  ];

  const steps = [
    { icon: FileText, step: '1', title: 'Submit Request', desc: 'Describe your service needs and preferred timing' },
    { icon: UserCheck, step: '2', title: 'Assign Worker', desc: 'Our team matches you with the best skilled professional' },
    { icon: CheckSquare, step: '3', title: 'Work Completed', desc: 'Service delivered and quality verified by you' },
  ];

  const features = [
    { icon: Users, title: 'Trusted Workers', desc: 'Verified and background-checked professionals' },
    { icon: Clock, title: 'Fast Response', desc: 'Most requests handled within 24 hours' },
    { icon: CheckCircle2, title: 'Simple Process', desc: 'Book any service in just three steps' },
    { icon: Star, title: 'Quality First', desc: 'Satisfaction guaranteed on every service' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', service: 'Plumbing', text: 'Fixed my leaking pipe in under an hour. Very professional service.', rating: 5 },
    { name: 'Mike Chen', service: 'Electrical', text: 'Electrician was knowledgeable and efficient. Great experience.', rating: 5 },
    { name: 'Emily Davis', service: 'Carpentry', text: 'Built custom shelves exactly as I wanted. Highly recommend!', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">
                Fix<span className="text-blue-600">Ora</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Services</a>
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">How It Works</a>
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Why Us</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Log in
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-6">
                <Star size={14} className="text-blue-600" />
                <span className="text-sm text-blue-700">Trusted by 2,000+ customers</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight mb-6">
                Find trusted local services{' '}
                <span className="text-blue-600">easily</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Book electricians, plumbers, mechanics and more with a reliable service agency. 
                Quality work at fair prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Browse Services
                </a>
              </div>

              <div className="flex items-center gap-6 mt-10 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Verified workers
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Same day service
                </span>
              </div>
            </div>

            {/* Right - Clean Space / Subtle Graphic */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Abstract geometric composition */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/50 rounded-2xl rotate-12" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-300/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <ShieldCheck size={40} className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">Our Services</h2>
            <p className="text-slate-600 max-w-lg mx-auto">
              Professional home and business services delivered by verified experts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <div 
                key={i}
                className="group bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <service.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-600 max-w-lg mx-auto">
              Get your service done in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Step {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-3">Why Choose FixOra?</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Simple, fast, and reliable service booking
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={22} className="text-blue-400" />
                </div>
                <h3 className="text-base font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">What Customers Say</h2>
            <p className="text-slate-600">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star 
                      key={j} 
                      size={14} 
                      className={j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} 
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of customers who trust FixOra
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <span className="text-lg font-semibold text-white">
                  Fix<span className="text-blue-400">Ora</span>
                </span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                Your trusted partner for home and business services. Quality work, fair prices.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-sm">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={14} />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} />
                  support@fixora.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center text-slate-500">
            © {new Date().getFullYear()} FixOra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
