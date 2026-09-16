export type TeamMember = {
  name: string;
  role: string;
  image: string;
  value: string;
  bio: string;
  linkedin: string;
  instagram: string;
  github?: string;
};

export const team: TeamMember[] = [
  { name: 'Bhumi Kapoor', role: 'Brand & Growth Strategist', image: '/assets/team/bhumi-kapoor.png', value: 'Clarifies brands people choose.', bio: 'Turns products into brands people remember through positioning, content, storytelling, and growth-focused execution.', linkedin: 'https://www.linkedin.com/in/bhumikapoor/', instagram: 'https://www.instagram.com/bhumikapoor16/' },
  { name: 'Arnav Hooda', role: 'Frontend Engineer', image: '/assets/team/arnav-hooda.png', value: 'Builds fast, intuitive digital experiences.', bio: 'Creates responsive, scalable digital experiences with a strong understanding of modern software and AI-driven products.', linkedin: 'https://www.linkedin.com/in/arnav-hooda-87061486/', instagram: 'https://www.instagram.com/arnavhooda_7777/' },
  { name: 'Prabhmannat Singh', role: 'Forward Deployed Engineer', image: '/assets/team/prabhmannat-singh.png', value: 'Turns complex ideas into reliable products.', bio: 'Builds and deploys production-grade AI products, turning complex client problems into scalable software.', linkedin: 'https://www.linkedin.com/in/prabhmannat/', instagram: 'https://www.instagram.com/young.elonmusk/', github: 'https://github.com/PRABHMANNAT' },
  { name: 'Adhiraj Dogra', role: 'Senior AI/ML Engineer', image: '/assets/team/adhiraj-dogra.png', value: 'Makes intelligent systems useful in the real world.', bio: 'Designs intelligent systems spanning GenAI, RAG, multi-agent workflows, machine learning, and production software infrastructure.', linkedin: 'https://www.linkedin.com/in/adhiraj-dogra/', instagram: 'https://www.instagram.com/adirajdogra/', github: 'https://github.com/AdiBoi007' },
];
