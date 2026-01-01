import React, { useState, useEffect } from 'react';
import DishCard from './components/DishCard';
import { MOCK_DISHES } from './constants';
import { Dish } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dishes, setDishes] = useState<Dish[]>(MOCK_DISHES);

  // Initial Dark Mode Check
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Basic search filtering (Name only for this demo, usually would trigger API)
  useEffect(() => {
    if (!searchTerm) {
      setDishes(MOCK_DISHES);
    } else {
      const lower = searchTerm.toLowerCase();
      setDishes(MOCK_DISHES.filter(d => 
        d.name.toLowerCase().includes(lower) || 
        d.subTitle.toLowerCase().includes(lower) ||
        d.reviews.toLowerCase().includes(lower)
      ));
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen relative pb-24">
      {/* --- Navbar --- */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto z-40 relative">
        <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => window.location.reload()}>
          <span className="material-icons-round text-primary text-3xl">restaurant_menu</span>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ching<span className="text-primary">Finder</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-icons-round">{darkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
            <img
              alt="Profile"
              className="h-full w-full object-cover"
              src="https://picsum.photos/id/64/100/100" // Girl portrait placeholder
            />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* --- Hero Section --- */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-slate-900 dark:text-white leading-tight">
            Find your <span className="italic text-primary">Ching</span> anywhere.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover local restaurants that match the specific flavor profile of St. Louis classics.
          </p>

          <div className="relative max-w-2xl mx-auto shadow-xl rounded-full group z-10">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <span className="material-icons-round text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-14 pr-32 py-5 rounded-full border-2 border-transparent bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-lg"
              placeholder="Enter City, Zip, or Dish (e.g., 'Hot Braised Chicken')"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-red-700 text-white px-8 rounded-full font-medium transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>

        {/* --- Results Section --- */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-serif font-bold border-l-4 border-primary pl-4 text-slate-900 dark:text-white">
              Mirror Dishes <span className="text-slate-400 font-sans text-lg font-normal ml-2 hidden sm:inline">(Matches for St. Louis Profile)</span>
            </h3>
            <button className="text-primary font-medium text-sm hover:underline flex items-center gap-1">
              View All Matches <span className="material-icons-round text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Grid */}
          {dishes.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
             </div>
          ) : (
            <div className="text-center py-20 bg-surface-light dark:bg-surface-dark rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <span className="material-icons-round text-6xl text-slate-300 mb-4">no_food</span>
              <p className="text-slate-500">No dishes found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* --- Footer Note --- */}
        <div className="mt-20 text-center pb-8 border-t border-slate-200 dark:border-slate-800 pt-10">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase mb-4">Powered by Community Data</p>
          <div className="flex justify-center gap-8 opacity-50 dark:opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            {['Google', 'Yelp', 'Reddit', 'TikTok'].map((brand) => (
              <span key={brand} className="text-sm font-bold text-slate-600 dark:text-slate-400 cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </main>

      {/* --- Floating Bottom Dock --- */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-2 py-2 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 ring-1 ring-black/5">
          <NavItem icon="home" active />
          <NavItem icon="favorite_border" />
          <NavItem icon="map" />
          <NavItem icon="person_outline" />
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; active?: boolean }> = ({ icon, active }) => (
  <button 
    className={`p-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-primary/10 dark:bg-primary/20 text-primary scale-105' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
    }`}
  >
    <span className="material-icons-round text-2xl">{icon}</span>
  </button>
);

export default App;