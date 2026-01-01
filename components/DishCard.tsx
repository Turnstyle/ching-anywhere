import React, { useMemo } from 'react';
import { Dish } from '../types';
import { analyzeProfile } from '../services/chingLogic';

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  // Run the analysis "backend" logic on the client for this demo
  const analysis = useMemo(() => analyzeProfile(dish.reviews), [dish.reviews]);
  
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-600';
    if (score >= 80) return 'bg-primary'; // The brand red for good matches
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-slate-500';
  };

  return (
    <article className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border-light dark:border-border-dark flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          alt={dish.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          src={dish.imageUrl}
          loading="lazy"
        />
        <div className={`absolute top-3 right-3 ${getScoreColor(analysis.matchScore)}/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
          {analysis.matchScore}% Match
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-1">
            {dish.name}
          </h4>
          <p className="text-sm font-medium text-primary italic">
            {dish.subTitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {analysis.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700/50 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-border-light dark:border-border-dark pt-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-3 font-bold">
            Vibe Check
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold ${dish.stats.color}`}>
                 {dish.stats.icon}
               </div>
               <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                 {dish.stats.value}
               </span>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded-full bg-slate-800 dark:bg-black flex items-center justify-center text-white text-[9px] font-bold">
                 T
               </div>
               <span className="text-xs text-slate-600 dark:text-slate-300 truncate max-w-[80px]">
                 {dish.vibe.type}
               </span>
            </div>
          </div>
          {analysis.reasoning && (
             <p className="mt-3 text-[10px] text-slate-400 italic border-l-2 border-primary pl-2 line-clamp-2">
               "{analysis.reasoning}"
             </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default DishCard;