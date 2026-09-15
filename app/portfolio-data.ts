export type Project = { id:string; title:string; category:string; image:string; description:string; url?:string; kind:'Website'|'Design concept'|'Featured design' };
export const industryProjects:Project[] = [
  {
    "id": "coffee",
    "title": "A better first sip",
    "category": "Food & Drink",
    "description": "A welcoming café website with your menu, location and a clear reason to visit.",
    "image": "/assets/refresh/local/coffee.webp",
    "kind": "Design concept"
  },
  {
    "id": "restaurant",
    "title": "Bring the table to life",
    "category": "Food & Drink",
    "description": "Make your menu easy to explore and your next table easy to book.",
    "image": "/assets/refresh/local/restaurant.webp",
    "kind": "Design concept"
  },
  {
    "id": "bakery",
    "title": "Fresh from the oven",
    "category": "Food & Drink",
    "description": "A warm storefront for daily bakes and neighbourhood favourites.",
    "image": "/assets/refresh/local/bakery.webp",
    "kind": "Design concept"
  },
  {
    "id": "beauty",
    "title": "Care, beautifully presented",
    "category": "Beauty & Grooming",
    "description": "A considered shopping experience for skincare and everyday rituals.",
    "image": "/assets/refresh/local/beauty.webp",
    "kind": "Design concept"
  },
  {
    "id": "fashion",
    "title": "Make your collection the story",
    "category": "Fashion & Accessories",
    "description": "An editorial storefront that gives your collection room to shine.",
    "image": "/assets/refresh/local/fashion.webp",
    "kind": "Design concept"
  },
  {
    "id": "wellness",
    "title": "A calmer way to connect",
    "category": "Health & Fitness",
    "description": "Explain your approach and make appointments simple.",
    "image": "/assets/refresh/local/wellness.webp",
    "kind": "Design concept"
  },
  {
    "id": "fitness",
    "title": "Turn interest into attendance",
    "category": "Health & Fitness",
    "description": "Introduce your trainers and help people find the right class.",
    "image": "/assets/refresh/local/fitness.webp",
    "kind": "Design concept"
  },
  {
    "id": "travel",
    "title": "The next great escape",
    "category": "Travel & Stays",
    "description": "Inspire a journey with clear itineraries and an easy enquiry.",
    "image": "/assets/refresh/local/travel.webp",
    "kind": "Design concept"
  },
  {
    "id": "retreat",
    "title": "A stay worth slowing down for",
    "category": "Travel & Stays",
    "description": "Give guests a feel for your property before they arrive.",
    "image": "/assets/refresh/local/retreat.webp",
    "kind": "Design concept"
  },
  {
    "id": "interiors",
    "title": "Spaces with a point of view",
    "category": "Home & Interiors",
    "description": "A visual portfolio for architecture and thoughtful living.",
    "image": "/assets/refresh/local/interiors.webp",
    "kind": "Design concept"
  },
  {
    "id": "furniture",
    "title": "Thoughtful interiors, clearly presented",
    "category": "Home & Interiors",
    "description": "Present your approach, materials and spaces in a thoughtful visual portfolio.",
    "image": "/assets/refresh/local/furniture.webp",
    "kind": "Design concept"
  },
  {
    "id": "software",
    "title": "Make a complex product clear",
    "category": "Tech & Software",
    "description": "Explain your software and guide visitors towards a demo.",
    "image": "/assets/refresh/local/software.webp",
    "kind": "Design concept"
  },
  {
    "id": "portfolio",
    "title": "Your work, your introduction",
    "category": "Personal Portfolios",
    "description": "A focused home for your skills, projects and next opportunity.",
    "image": "/assets/refresh/local/portfolio.webp",
    "kind": "Design concept"
  },
  {
    "id": "agency",
    "title": "A studio with something to say",
    "category": "Creative Agencies",
    "description": "Bring your positioning and creative work into one distinct presence.",
    "image": "/assets/refresh/local/agency.webp",
    "kind": "Design concept"
  },
  {
    "id": "wedding",
    "title": "Every detail, beautifully together",
    "category": "Weddings & Events",
    "description": "A personal space for the story, celebration and guest information.",
    "image": "/assets/refresh/local/wedding.webp",
    "kind": "Design concept"
  },
  {
    "id": "photography",
    "title": "Stories worth looking closer at",
    "category": "Photography & Film",
    "description": "An image-led portfolio for photographers and wedding storytellers.",
    "image": "/assets/refresh/local/photography.webp",
    "kind": "Design concept"
  },
  {
    "id": "education",
    "title": "Make the next step easy to learn",
    "category": "Education & Courses",
    "description": "Explain your courses and simplify student enquiries.",
    "image": "/assets/refresh/local/education.webp",
    "kind": "Design concept"
  },
  {
    "id": "property",
    "title": "Help people find their place",
    "category": "Real Estate",
    "description": "Organise property highlights and viewing requests.",
    "image": "/assets/refresh/local/property.webp",
    "kind": "Design concept"
  },
  {
    "id": "finance",
    "title": "Clarity builds confidence",
    "category": "Professional Services",
    "description": "Explain your expertise and make the first conversation easy.",
    "image": "/assets/refresh/local/finance.webp",
    "kind": "Design concept"
  },
  {
    "id": "art",
    "title": "A home for the unexpected",
    "category": "Art & Lifestyle",
    "description": "A characterful shop or portfolio for art and independent makers.",
    "image": "/assets/refresh/local/art.webp",
    "kind": "Design concept"
  }
];
export const recentWorkProjects:Project[] = [
  {
    id: 'safario',
    title: 'Safario',
    category: 'Travel & Lifestyle',
    description: 'A warm safari travel concept that puts remarkable African journeys and easy discovery at the centre.',
    image: '/assets/recent-work/safario.png',
    kind: 'Design concept'
  },
  {
    id: 'nomia',
    title: 'Nomia',
    category: 'Travel & Lifestyle',
    description: 'A conversational travel planner that turns one idea into a living itinerary.',
    image: '/assets/recent-work/nomia.png',
    kind: 'Design concept'
  },
  {
    id: 'the-stay',
    title: 'The Stay',
    category: 'Travel & Stays',
    description: 'A calming, destination-led experience for a stay worth planning around.',
    image: '/assets/recent-work/the-stay.png',
    kind: 'Design concept'
  },
  {
    id: 'wedding',
    title: 'W&R',
    category: 'Weddings & Events',
    description: 'A warm, personal space for a celebration, its story and every important detail.',
    image: '/assets/recent-work/wedding.png',
    kind: 'Design concept'
  },
  {
    id: 'ferea',
    title: 'Ferea',
    category: 'Food & Drink',
    description: 'A playful specialty coffee brand built around rich flavour and a direct order flow.',
    image: '/assets/recent-work/ferea.png',
    kind: 'Design concept'
  },
  {
    id: 'fintechx',
    title: 'FintechX',
    category: 'Finance & Technology',
    description: 'A clear financial platform that makes sophisticated tools feel welcoming.',
    image: '/assets/recent-work/fintechx.png',
    kind: 'Design concept'
  },
  {
    id: 'noctra',
    title: 'Noctra',
    category: 'Culture & Hospitality',
    description: 'An atmospheric digital experience for an observatory under the night sky.',
    image: '/assets/recent-work/noctra.png',
    kind: 'Design concept'
  },
  {
    id: 'vantage',
    title: 'Vantage',
    category: 'Health & Fitness',
    description: 'An energetic programme site for players ready to raise their baseline.',
    image: '/assets/recent-work/vantage.png',
    kind: 'Design concept'
  },
  {
    id: 'gen-z',
    title: 'GEN-Z',
    category: 'Fashion & Accessories',
    description: 'A bold editorial storefront where product, identity and attitude meet.',
    image: '/assets/recent-work/genz.png',
    kind: 'Design concept'
  },
  {
    id: 'the-course',
    title: 'The Course',
    category: 'Leisure & Hospitality',
    description: 'A refined course guide with an immersive view of the full landscape.',
    image: '/assets/recent-work/course.png',
    kind: 'Design concept'
  },
  {
    id: 'above',
    title: 'Above',
    category: 'Property & Real Estate',
    description: 'A cinematic residential showcase made to turn a home into a destination.',
    image: '/assets/recent-work/above.png',
    kind: 'Design concept'
  },
  {
    id: 'aeronis',
    title: 'Aeronis',
    category: 'Clean Energy',
    description: 'A focused introduction to modern wind technology, performance and impact.',
    image: '/assets/recent-work/aeronis.png',
    kind: 'Design concept'
  }
];

export const recentProjects:Project[] = [
  {
    "id": "maverick",
    "title": "Maverick & Farmer",
    "category": "Coffee · India",
    "url": "https://www.maverickandfarmer.com/",
    "description": "Specialty coffee with a distinctive voice, from farm to online shop.",
    "image": "/assets/refresh/sites/maverick.jpg",
    "kind": "Website"
  },
  {
    "id": "noto",
    "title": "NOTO Botanics",
    "category": "Beauty & Grooming",
    "url": "https://notobotanics.com/",
    "description": "Multi-use beauty with bold photography and a direct shopping journey.",
    "image": "/assets/refresh/sites/noto.jpg",
    "kind": "Website"
  },
  {
    "id": "naivo",
    "title": "Naivo",
    "category": "Coffee · India",
    "url": "https://naivo.in/",
    "description": "A colourful introduction to specialty coffee and brewing essentials.",
    "image": "/assets/refresh/sites/naivo.jpg",
    "kind": "Website"
  },
  {
    "id": "folk",
    "title": "folk",
    "category": "Tech & Software",
    "url": "https://www.folk.app/",
    "description": "A clear product story that puts customer relationships at the centre.",
    "image": "/assets/refresh/sites/folk.jpg",
    "kind": "Website"
  },
  {
    "id": "journeys",
    "title": "Extraordinary Journeys",
    "category": "Travel & Stays",
    "url": "https://extraordinaryjourneys.com/",
    "description": "Destination-led storytelling for travellers looking for something personal.",
    "image": "/assets/refresh/sites/journeys.jpg",
    "kind": "Website"
  },
  {
    "id": "monastery",
    "title": "Monastery",
    "category": "Beauty & Grooming",
    "url": "https://monasterymade.com/",
    "description": "A tactile, carefully composed home for botanical skincare.",
    "image": "/assets/refresh/sites/monastery.jpg",
    "kind": "Website"
  },
  {
    "id": "friedhats",
    "title": "Friedhats",
    "category": "Food & Drink",
    "url": "https://friedhats.com/",
    "description": "Independent coffee culture with bold type and playful packaging.",
    "image": "/assets/refresh/sites/friedhats.jpg",
    "kind": "Website"
  },
  {
    "id": "tanat",
    "title": "TANAT",
    "category": "Food & Drink",
    "url": "https://tanat.coffee/",
    "description": "Expressive colour and distinctive coffee in an energetic storefront.",
    "image": "/assets/refresh/sites/tanat.jpg",
    "kind": "Website"
  },
  {
    "id": "bluetit",
    "title": "Blue Tit London",
    "category": "Beauty & Grooming",
    "url": "https://bluetitlondon.com/",
    "description": "Explore a salon collective, from the spaces to the people behind them.",
    "image": "/assets/refresh/sites/bluetit.jpg",
    "kind": "Website"
  },
  {
    "id": "tana",
    "title": "Tana",
    "category": "Tech & Software",
    "url": "https://tana.inc/",
    "description": "Turning meetings and notes into useful work.",
    "image": "/assets/refresh/sites/tana.jpg",
    "kind": "Website"
  },
  {
    "id": "attio",
    "title": "Attio",
    "category": "Tech & Software",
    "url": "https://attio.com/platform/workflows",
    "description": "Connected customer data and automated workflows, clearly explained.",
    "image": "/assets/refresh/sites/attio.jpg",
    "kind": "Website"
  },
  {
    "id": "lusion",
    "title": "Lusion",
    "category": "Creative Agencies",
    "url": "https://lusion.co/",
    "description": "An immersive studio portfolio built around digital craft.",
    "image": "/assets/refresh/sites/lusion.jpg",
    "kind": "Website"
  },
  {
    "id": "loveness",
    "title": "Loveness Lee",
    "category": "Fashion & Accessories",
    "url": "https://www.lovenesslee.com/",
    "description": "Sculptural jewellery and expressive editorial styling.",
    "image": "/assets/refresh/sites/loveness.jpg",
    "kind": "Website"
  },
  {
    "id": "alighieri",
    "title": "Alighieri",
    "category": "Fashion & Accessories",
    "url": "https://www.alighieri.com/",
    "description": "Jewellery, objects and stories in a distinctive visual world.",
    "image": "/assets/refresh/sites/alighieri.jpg",
    "kind": "Website"
  },
  {
    "id": "underdog",
    "title": "Studio Underd0g",
    "category": "Fashion & Accessories",
    "url": "https://underd0g.com/",
    "description": "An unconventional introduction to independent watchmaking.",
    "image": "/assets/refresh/sites/underdog.jpg",
    "kind": "Website"
  },
  {
    "id": "daphnis",
    "title": "Daphnis and Chloe",
    "category": "Food & Drink",
    "url": "https://daphnisandchloe.com/",
    "description": "Herbs, ingredients and their origins, presented with warmth.",
    "image": "/assets/refresh/sites/daphnis.jpg",
    "kind": "Website"
  },
  {
    "id": "brightland",
    "title": "Brightland",
    "category": "Food & Drink",
    "url": "https://brightland.co/",
    "description": "A bright shopping experience for everyday cooking rituals.",
    "image": "/assets/refresh/sites/brightland.jpg",
    "kind": "Website"
  },
  {
    "id": "graza",
    "title": "Graza",
    "category": "Food & Drink",
    "url": "https://www.graza.co/",
    "description": "Confident packaging and a simple path from discovery to checkout.",
    "image": "/assets/refresh/sites/graza.jpg",
    "kind": "Website"
  }
];
export const featuredDesigns:Project[] = [
  {
    "id": "monastery",
    "title": "A study in texture",
    "category": "Skincare · Monastery",
    "description": "Rich colour and tactile details make an everyday product memorable.",
    "url": "https://monasterymade.com/",
    "image": "/assets/refresh/featured/monastery.webp",
    "kind": "Featured design"
  },
  {
    "id": "tanat",
    "title": "The ritual of coffee",
    "category": "Coffee · TANAT",
    "description": "Warm light and the craft behind a good cup.",
    "url": "https://tanat.coffee/",
    "image": "/assets/refresh/featured/tanat.webp",
    "kind": "Featured design"
  },
  {
    "id": "brightland",
    "title": "Colour with a purpose",
    "category": "Food · Brightland",
    "description": "A playful still life that puts the product first.",
    "url": "https://brightland.co/",
    "image": "/assets/refresh/featured/brightland.webp",
    "kind": "Featured design"
  },
  {
    "id": "underdog",
    "title": "Small details. Strong character.",
    "category": "Watches · Studio Underd0g",
    "description": "Precise product photography with a distinctive point of view.",
    "url": "https://underd0g.com/",
    "image": "/assets/refresh/featured/underdog.webp",
    "kind": "Featured design"
  },
  {
    "id": "alighieri",
    "title": "Objects with a story",
    "category": "Objects · Alighieri",
    "description": "Sculptural shapes with space to appreciate the details.",
    "url": "https://www.alighieri.com/",
    "image": "/assets/refresh/featured/alighieri.webp",
    "kind": "Featured design"
  }
];
