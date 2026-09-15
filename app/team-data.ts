export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  note: string;
  linkedin: string;
  instagram: string;
  github?: string;
};

export const team: TeamMember[] = [
  { name: 'Bhumi Kapoor', role: 'Business Data and Marketing Strategist', image: '/assets/team/bhumi-kapoor.png', bio: 'Turns products into brands people remember through positioning, content, storytelling, and growth-focused execution.', note: 'She combines creative storytelling with brand strategy and market understanding to make ideas clearer, more relevant, and more memorable.', linkedin: 'https://www.linkedin.com/in/bhumikapoor/', instagram: 'https://www.instagram.com/bhumikapoor16/' },
  { name: 'Arnav Hooda', role: 'Frontend Engineer', image: '/assets/team/arnav-hooda.png', bio: 'Creates responsive, scalable digital experiences with a strong understanding of modern software and AI-driven products.', note: 'He brings together frontend development, product thinking, and an understanding of intelligent systems to make complex products feel simple and effortless to use.', linkedin: 'https://www.linkedin.com/in/arnav-hooda-87061486/', instagram: 'https://www.instagram.com/arnavhooda_7777/' },
  { name: 'Prabhmannat Singh', role: 'Senior Full-Stack & FDE', image: '/assets/team/prabhmannat-singh.png', bio: 'Builds and deploys production-grade AI products, turning complex client problems into scalable software.', note: 'Working at the intersection of product, engineering, and AI, he focuses on making sophisticated technology practical, reliable, and ready for real users.', linkedin: 'https://www.linkedin.com/in/prabhmannat/', instagram: 'https://www.instagram.com/young.elonmusk/', github: 'https://github.com/PRABHMANNAT' },
  { name: 'Adhiraj Dogra', role: 'Senior AI/ML Engineer', image: '/assets/team/adhiraj-dogra.png', bio: 'Designs intelligent systems spanning GenAI, RAG, multi-agent workflows, machine learning, and production software infrastructure.', note: 'He builds AI systems that move beyond prototypes, combining model intelligence with strong software architecture for dependable real-world workflows.', linkedin: 'https://www.linkedin.com/in/adhiraj-dogra/', instagram: 'https://www.instagram.com/adirajdogra/', github: 'https://github.com/AdiBoi007' },
];
