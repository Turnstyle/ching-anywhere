import { ReviewAnalysis } from '../types';

/**
 * THE YEN CHING PROFILE LOGIC ENGINE
 * 
 * This service mimics the requested Node.js backend cloud function.
 * It analyzes raw text to determine if a restaurant matches the 
 * "St. Louis Yen Ching" flavor profile.
 */

interface ScoreModifier {
  keywords: string[];
  scoreChange: number;
  reason: string;
  tag?: string;
}

const PROFILE_RULES: ScoreModifier[] = [
  // --- 1. The "Dark Soy" Metric ---
  {
    keywords: ['dark brown', 'mahogany', 'deep soy', 'dark soy', 'molasses color'],
    scoreChange: 15,
    reason: 'Correct dark soy usage detected',
    tag: 'Soy: Premium Dark'
  },
  {
    keywords: ['yellow rice', 'pale rice', 'yellow fried rice', 'seasoning salt'],
    scoreChange: -25,
    reason: 'Rice is too pale/yellow (wrong style)',
    tag: 'Soy: Weak'
  },
  {
    keywords: ['wok hei', 'breath of wok', 'smoky', 'charred'],
    scoreChange: 10,
    reason: 'High Wok Hei presence',
    tag: 'Wok Hei: High'
  },

  // --- 2. The "Braised" Texture ---
  {
    keywords: ['spicy braised', 'lacquered', 'sticky', 'reduced glaze', 'oil-based'],
    scoreChange: 20,
    reason: 'Perfect lacquered braise texture',
    tag: 'Texture: Lacquered'
  },
  {
    keywords: ['breaded', 'thick batter', 'syrupy', 'cornstarch slurry', 'gloopy'],
    scoreChange: -20,
    reason: 'Sauce is too syrupy/breading too thick',
    tag: 'Texture: Gummy'
  },

  // --- 3. The "Allium" Punch ---
  {
    keywords: ['green onion', 'scallion', 'seared onion', 'lots of garlic', 'garlic heavy'],
    scoreChange: 10,
    reason: 'Strong allium profile',
    tag: 'Allium: Heavy'
  },
  {
    keywords: ['sugary', 'too sweet', 'candy', 'ketchup'],
    scoreChange: -15,
    reason: 'Too sweet/Americanized incorrectly',
    tag: 'Sweetness: High'
  }
];

const VIBE_FILTERS: ScoreModifier[] = [
  // --- The 'Gross' Filter (Takeout Window Vibes) ---
  {
    keywords: ['no seating', 'bulletproof glass', 'takeout only', 'hole in the wall', 'dirty', 'grimy'],
    scoreChange: -15,
    reason: 'Vibe is too "takeout window"',
  },
  
  // --- The 'Too Traditional' Filter (Authenticity Penalty) ---
  {
    keywords: ['chicken feet', 'tripe', 'jellyfish', 'cold jelly', 'tendon', 'intestine', 'blood cake'],
    scoreChange: -20,
    reason: 'Too traditional (misses the Americanized Masterpiece sweet spot)',
  }
];

export const analyzeProfile = (text: string): ReviewAnalysis => {
  const lowerText = text.toLowerCase();
  let score = 50; // Base score
  let reasoningParts: string[] = [];
  let tags: string[] = [];

  // Apply Profile Rules
  PROFILE_RULES.forEach(rule => {
    if (rule.keywords.some(k => lowerText.includes(k))) {
      score += rule.scoreChange;
      if (!reasoningParts.includes(rule.reason)) {
        reasoningParts.push(rule.reason);
      }
      if (rule.tag && !tags.includes(rule.tag)) {
        tags.push(rule.tag);
      }
    }
  });

  // Apply Vibe Filters
  VIBE_FILTERS.forEach(filter => {
    if (filter.keywords.some(k => lowerText.includes(k))) {
      score += filter.scoreChange;
      if (!reasoningParts.includes(filter.reason)) {
        reasoningParts.push(filter.reason);
      }
    }
  });

  // Clamp Score
  score = Math.max(0, Math.min(100, score));

  // Default fallback if no specific traits found
  if (tags.length === 0) {
    tags.push('Profile: Generic');
    reasoningParts.push('Insufficient data for specific profile match');
  }

  return {
    matchScore: score,
    reasoning: reasoningParts.slice(0, 2).join('. '), // Return top 2 reasons
    tags: tags.slice(0, 3) // Return top 3 tags
  };
};