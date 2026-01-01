import { Dish } from './types';

// Mock database simulating search results
export const MOCK_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Spicy Braised Chicken',
    subTitle: 'The Lacquer Style',
    description: 'Crispy skin with a deep, reduced glaze.',
    imageUrl: 'https://picsum.photos/id/1080/600/400',
    reviews: "Best spicy braised in the city. The skin is lacquered and sticky, not that gross syrupy breaded stuff. Good wok hei. Definitely no bulletproof glass here, nice seating.",
    vibe: {
      type: 'Trending',
      text: 'Legit crispy skin',
      iconColor: 'bg-orange-600'
    },
    stats: {
      label: 'Rating',
      value: '"Legit crispy skin"',
      icon: 'R',
      color: 'bg-orange-500'
    }
  },
  {
    id: '2',
    name: 'Dark Fried Rice',
    subTitle: 'The Umami Deep Soy',
    description: 'Deep mahogany color, individual grains, no clumps.',
    imageUrl: 'https://picsum.photos/id/488/600/400', // Rice-ish texture
    reviews: "This is the real deal. Dark brown color, molasses notes, smells like breath of wok. Not that yellow fried rice garbage with seasoning salt. Dry texture, not oily.",
    vibe: {
      type: 'Classic',
      text: 'Just like Yen Ching',
      iconColor: 'bg-red-600'
    },
    stats: {
      label: 'Review',
      value: '"Just like Yen Ching"',
      icon: 'R',
      color: 'bg-primary'
    }
  },
  {
    id: '3',
    name: 'Mongolian Beef',
    subTitle: 'The Seared Allium',
    description: 'Heavy on the green onions, seared meat.',
    imageUrl: 'https://picsum.photos/id/292/600/400', // Meat/Food
    reviews: "Lots of green onion and seared beef. Garlic heavy. A bit on the sweet side but acceptable. Waitlist is crazy though.",
    vibe: {
      type: 'Waitlist',
      text: 'Waitlist only',
      iconColor: 'bg-black'
    },
    stats: {
      label: 'Rating',
      value: '4.8 Stars (2k+)',
      icon: 'G',
      color: 'bg-blue-500'
    }
  },
  {
    id: '4',
    name: 'Lucky Dragon Takeout',
    subTitle: 'Quick Corner Spot',
    description: 'Fast service, standard menu.',
    imageUrl: 'https://picsum.photos/id/225/600/400',
    reviews: "It's okay for a quick bite. Bulletproof glass at the counter. The rice is bright yellow and the sauce is very syrupy and gloopy. No seating available.",
    vibe: {
      type: 'Hidden Gem',
      text: 'Late night spot',
      iconColor: 'bg-purple-600'
    },
    stats: {
      label: 'Rating',
      value: '3.2 Stars',
      icon: 'Y',
      color: 'bg-red-500'
    }
  },
  {
    id: '5',
    name: 'Golden Palace Authentic',
    subTitle: 'Traditional Cantonese',
    description: 'Serving traditional cuts and dim sum.',
    imageUrl: 'https://picsum.photos/id/493/600/400',
    reviews: "Very authentic. They serve chicken feet and tripe here. The jelly fish salad is popular. Not your typical American chinese spot.",
    vibe: {
      type: 'Classic',
      text: 'Dim Sum Weekends',
      iconColor: 'bg-yellow-500'
    },
    stats: {
      label: 'Rating',
      value: '4.9 Stars',
      icon: 'G',
      color: 'bg-green-600'
    }
  }
];