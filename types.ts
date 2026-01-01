export interface ReviewAnalysis {
  matchScore: number;
  reasoning: string;
  tags: string[];
}

export interface Dish {
  id: string;
  name: string;
  subTitle: string;
  description: string;
  imageUrl: string;
  reviews: string; // Raw text to be analyzed
  vibe: {
    type: 'Trending' | 'Hidden Gem' | 'Waitlist' | 'Classic';
    text: string;
    iconColor: string;
  };
  stats: {
    label: string;
    value: string;
    icon: string;
    color: string;
  };
  // Properties populated after analysis
  analysis?: ReviewAnalysis;
}

export enum TagType {
  WOK_HEI = 'Wok Hei',
  SOY = 'Soy',
  TEXTURE = 'Texture',
  ALLIUM = 'Allium',
  SWEETNESS = 'Sweetness',
  UMAMI = 'Umami'
}