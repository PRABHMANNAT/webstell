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
    id: 'nomia',
    title: 'Nomia',
    category: 'Travel & Lifestyle',
    description: 'A WEBSTELL travel-planning concept that turns one prompt into the beginning of a tailored journey.',
    image: '/assets/recent-work/nomia.png',
    kind: 'Design concept'
  },
  {
    id: 'the-stay',
    title: 'The Stay',
    category: 'Travel & Stays',
    description: 'A WEBSTELL stay concept that brings atmosphere, practical details and a clear booking path into one calm journey.',
    image: '/assets/recent-work/the-stay.png',
    kind: 'Design concept'
  },
  {
    id: 'the-course',
    title: 'The Course',
    category: 'Leisure & Hospitality',
    description: 'A WEBSTELL course concept that makes a complete landscape easy to understand, explore and plan around.',
    image: '/assets/recent-work/course.png',
    kind: 'Design concept'
  },
  {
    id: 'ferea',
    title: 'Ferea',
    category: 'Food & Drink',
    description: 'A WEBSTELL coffee concept where rich flavour, distinct character and quick ordering meet in one memorable storefront.',
    image: '/assets/recent-work/ferea.png',
    kind: 'Design concept'
  },
  {
    id: 'vantage',
    title: 'Vantage',
    category: 'Health & Fitness',
    description: 'A WEBSTELL performance concept that helps ambitious players find the right next step with energy and clarity.',
    image: '/assets/recent-work/vantage.png',
    kind: 'Design concept'
  },
  {
    id: 'gen-z',
    title: 'GEN-Z Dash',
    category: 'Fashion & Accessories',
    description: 'A WEBSTELL fashion concept where product, identity and attitude arrive with equal impact.',
    image: '/assets/recent-work/genz.png',
    kind: 'Design concept'
  },
  {
    id: 'wedding',
    title: 'W&R',
    category: 'Weddings & Events',
    description: 'A WEBSTELL wedding concept designed to carry the feeling of a celebration from first glance to RSVP.',
    image: '/assets/recent-work/wedding.png',
    kind: 'Design concept'
  },
  {
    id: 'fintechx',
    title: 'FintechX',
    category: 'Finance & Technology',
    description: 'A WEBSTELL finance concept that gives sophisticated tools an approachable, confidence-building digital home.',
    image: '/assets/recent-work/fintechx.png',
    kind: 'Design concept'
  },
  {
    id: 'noctra',
    title: 'Noctra',
    category: 'Culture & Hospitality',
    description: 'A WEBSTELL observatory concept that turns an after-dark visit into a sense of wonder and discovery.',
    image: '/assets/recent-work/noctra.png',
    kind: 'Design concept'
  },
  {
    id: 'above',
    title: 'Above',
    category: 'Property & Real Estate',
    description: 'A WEBSTELL property concept designed to make a residence feel as considered online as it is in person.',
    image: '/assets/recent-work/above.png',
    kind: 'Design concept'
  },
  {
    id: 'aeronis',
    title: 'Aeronis',
    category: 'Clean Energy',
    description: 'A WEBSTELL clean-energy concept that gives innovation, performance and long-term impact a focused stage.',
    image: '/assets/recent-work/aeronis.png',
    kind: 'Design concept'
  },
  {
    id: 'safario',
    title: 'Safario',
    category: 'Travel & Lifestyle',
    description: 'A WEBSTELL travel concept shaped to turn vivid safari inspiration into confident, considered itinerary enquiries.',
    image: '/assets/recent-work/safario.png',
    kind: 'Design concept'
  },
  {
    id: 'bakery-co',
    title: 'Bakery Co.',
    category: 'Food & Drink',
    description: 'A WEBSTELL bakery concept that pairs the warmth of a neighbourhood counter with a clear path to the daily menu.',
    image: '/assets/recent-work/bakery-co.png',
    kind: 'Design concept'
  },
  {
    id: 'twofive',
    title: 'Twofive',
    category: 'Food & Drink',
    description: 'A WEBSTELL coffee concept built around a crisp visual identity, opening hours and an unhurried morning ritual.',
    image: '/assets/recent-work/twofive.png',
    kind: 'Design concept'
  },
  {
    id: 'common-grounds',
    title: 'Common Grounds',
    category: 'Food & Drink',
    description: 'A WEBSTELL coffee concept that gives a simple cup, a strong message and local details equal presence.',
    image: '/assets/recent-work/common-grounds.png',
    kind: 'Design concept'
  },
  {
    id: 'harbor-favorites',
    title: 'Harbor Favorites',
    category: 'Food & Drink',
    description: 'A WEBSTELL menu concept that makes popular drinks feel instantly browseable across desktop and mobile.',
    image: '/assets/recent-work/harbor-favorites.png',
    kind: 'Design concept'
  },
  {
    id: 'deux',
    title: 'Deux',
    category: 'Food & Drink',
    description: 'A WEBSTELL bakery concept with expressive type, generous product photography and a playful shopfront energy.',
    image: '/assets/recent-work/deux.png',
    kind: 'Design concept'
  },
  {
    id: 'latte-haven',
    title: 'Latte Haven',
    category: 'Food & Drink',
    description: 'A WEBSTELL café concept that turns a good coffee, a welcoming room and the menu into one calm invitation.',
    image: '/assets/recent-work/latte-haven.png',
    kind: 'Design concept'
  },
  {
    id: 'latte-haven-journal',
    title: 'Latte Haven Journal',
    category: 'Food & Drink',
    description: 'A WEBSTELL editorial concept that lets a café extend its story through thoughtful origin notes and image-led articles.',
    image: '/assets/recent-work/latte-haven-journal.png',
    kind: 'Design concept'
  },
  {
    id: 'mewar',
    title: 'Mewar',
    category: 'Culture & Hospitality',
    description: 'A WEBSTELL fine-dining concept that brings heritage, craft and the dining experience together in a rich visual world.',
    image: '/assets/recent-work/mewar.png',
    kind: 'Design concept'
  },
  {
    id: 'velox',
    title: 'Velox',
    category: 'Logistics & Technology',
    description: 'A WEBSTELL port-technology concept that makes complex automation feel visible, immediate and ready to act on.',
    image: '/assets/recent-work/velox.png',
    kind: 'Design concept'
  },
  {
    id: 'altruist-mission',
    title: 'Altruist Mission',
    category: 'Nonprofit & Community',
    description: 'A WEBSTELL impact-report concept that uses vivid stories and clear goals to make progress feel tangible.',
    image: '/assets/recent-work/altruist-mission.png',
    kind: 'Design concept'
  },
  {
    id: 'altruist-impact',
    title: 'Altruist',
    category: 'Nonprofit & Community',
    description: 'A WEBSTELL giving concept designed to turn a shared purpose into a direct, human donation journey.',
    image: '/assets/recent-work/altruist-impact.png',
    kind: 'Design concept'
  },
  {
    id: 'matter',
    title: 'Matter',
    category: 'Creative Agency',
    description: 'A WEBSTELL studio concept that layers motion, playful objects and a direct point of view into a memorable introduction.',
    image: '/assets/recent-work/matter.png',
    kind: 'Design concept'
  },
  {
    id: 'agriculture-consulting',
    title: 'Agriculture Consulting',
    category: 'Agriculture & Sustainability',
    description: 'A WEBSTELL consultancy concept that gives practical farm guidance a confident, modern presentation.',
    image: '/assets/recent-work/agriculture-consulting.png',
    kind: 'Design concept'
  },
  {
    id: 'farmio',
    title: 'Farmio',
    category: 'Agriculture & Technology',
    description: 'A WEBSTELL agriculture concept that connects smart farming tools with a clear, growth-focused story.',
    image: '/assets/recent-work/farmio.png',
    kind: 'Design concept'
  },
  {
    id: 'alpine-planner',
    title: 'Alpine Planner',
    category: 'Travel & Lifestyle',
    description: 'A WEBSTELL trip-planning concept that maps a changing route, useful details and the feeling of the outdoors.',
    image: '/assets/recent-work/alpine-planner.png',
    kind: 'Design concept'
  },
  {
    id: 'nomia-plans',
    title: 'Nomia Plans',
    category: 'Travel & Lifestyle',
    description: 'A WEBSTELL travel-planning concept that makes every itinerary easy to shape, adjust and carry with you.',
    image: '/assets/recent-work/nomia-plans.png',
    kind: 'Design concept'
  },
  {
    id: 'nexura',
    title: 'Nexura',
    category: 'Technology & AI',
    description: 'A WEBSTELL AI-operations concept that makes an ambitious product story feel approachable from the first screen.',
    image: '/assets/recent-work/nexura.png',
    kind: 'Design concept'
  },
  {
    id: 'montana',
    title: 'Montana',
    category: 'Creative Agency',
    description: 'A WEBSTELL agency concept that gives bold strategy, editorial design and client proof an unmistakable stage.',
    image: '/assets/recent-work/montana.png',
    kind: 'Design concept'
  },
  {
    id: 'rumaya',
    title: 'Rumaya',
    category: 'Travel & Stays',
    description: 'A WEBSTELL retreat concept that turns rooms, stories and quiet hospitality into a considered booking journey.',
    image: '/assets/recent-work/rumaya.png',
    kind: 'Design concept'
  },
  {
    id: 'elian-valen',
    title: 'Elian Valen',
    category: 'Fashion & Accessories',
    description: 'A WEBSTELL fashion concept where a new collection reads with the focus and confidence of an editorial campaign.',
    image: '/assets/recent-work/elian-valen.png',
    kind: 'Design concept'
  },
  {
    id: 'fathom',
    title: 'Fathom',
    category: 'Creative Agency',
    description: 'A WEBSTELL marketing-agency concept that balances an artful visual world with confident, strategic positioning.',
    image: '/assets/recent-work/fathom.png',
    kind: 'Design concept'
  },
  {
    id: 'vinea-journal',
    title: 'Vinea Journal',
    category: 'Food, Drink & Culture',
    description: 'A WEBSTELL winery-journal concept that gives seasonal stories, place and product a soft, hand-crafted rhythm.',
    image: '/assets/recent-work/vinea-journal.png',
    kind: 'Design concept'
  },
  {
    id: 'kriste',
    title: 'Kristé',
    category: 'Beauty & Wellness',
    description: 'A WEBSTELL skincare concept that helps customers understand their routine and explore a curated product range.',
    image: '/assets/recent-work/kriste.png',
    kind: 'Design concept'
  },
  {
    id: 'echelon',
    title: 'Echelon',
    category: 'Creative Agency',
    description: 'A WEBSTELL digital-agency concept with a high-energy visual system built to make ambition impossible to miss.',
    image: '/assets/recent-work/echelon.png',
    kind: 'Design concept'
  },
  {
    id: 'ora',
    title: 'Ora',
    category: 'Fashion & Accessories',
    description: 'A WEBSTELL accessories concept that treats a sculptural product as the centrepiece of a polished shopping story.',
    image: '/assets/recent-work/ora.png',
    kind: 'Design concept'
  },
  {
    id: 'flow',
    title: 'Flow',
    category: 'Health & Fitness',
    description: 'A WEBSTELL wellbeing concept that makes finding balance, a class and a next step feel more personal.',
    image: '/assets/recent-work/flow.png',
    kind: 'Design concept'
  },
  {
    id: 'velour',
    title: 'Velour',
    category: 'Fashion & Accessories',
    description: 'A WEBSTELL fashion concept that brings motion, product details and contemporary styling into one clean collection view.',
    image: '/assets/recent-work/velour.png',
    kind: 'Design concept'
  },
  {
    id: 'zenova',
    title: 'Zenova',
    category: 'Health & Wellness',
    description: 'A WEBSTELL health concept that turns a personal care journey into an approachable, mobile-first experience.',
    image: '/assets/recent-work/zenova.png',
    kind: 'Design concept'
  },
  {
    id: 'velora',
    title: 'Velora',
    category: 'Home & Interiors',
    description: 'A WEBSTELL lighting concept that gives a statement piece the scale, atmosphere and detail of an object worth living with.',
    image: '/assets/recent-work/velora.png',
    kind: 'Design concept'
  },
  {
    id: 'averon',
    title: 'Averon',
    category: 'Fintech & Technology',
    description: 'A WEBSTELL payments concept that turns technical infrastructure into a sharp, direct B2B proposition.',
    image: '/assets/recent-work/averon.png',
    kind: 'Design concept'
  },
  {
    id: 'revolut-racing',
    title: 'Revolut Racing',
    category: 'Automotive & Technology',
    description: 'A WEBSTELL motorsport concept that uses pace, precision and a dramatic visual system to create instant impact.',
    image: '/assets/recent-work/revolut-racing.png',
    kind: 'Design concept'
  },
  {
    id: 'abnormal',
    title: 'Abnormal',
    category: 'Fashion & Accessories',
    description: 'A WEBSTELL fashion concept that lets a bold collection and its attitude lead the entire storefront.',
    image: '/assets/recent-work/abnormal.png',
    kind: 'Design concept'
  },
  {
    id: 'perf',
    title: 'Perf.',
    category: 'Beauty & Fragrance',
    description: 'A WEBSTELL fragrance concept that gives a considered catalogue the visual restraint and sensory depth it deserves.',
    image: '/assets/recent-work/perf.png',
    kind: 'Design concept'
  },
  {
    id: 'chalet',
    title: 'Chalet',
    category: 'Travel & Stays',
    description: 'A WEBSTELL mountain-stay concept that combines a cinematic alpine setting with an effortless route to book.',
    image: '/assets/recent-work/chalet.png',
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
