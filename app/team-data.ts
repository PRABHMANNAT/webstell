export type TeamMember = {
  name: string;
  role: string;
  image: string;
  value: string;
};

export const team: TeamMember[] = [
  { name: 'Bhumi Kapoor', role: 'Brand & Growth Strategist', image: '/assets/team/bhumi-kapoor.png', value: 'Clarifies brands people choose.' },
  { name: 'Arnav Hooda', role: 'Frontend Engineer', image: '/assets/team/arnav-hooda.png', value: 'Builds fast, intuitive digital experiences.' },
  { name: 'Prabhmannat Singh', role: 'Forward Deployed Engineer', image: '/assets/team/prabhmannat-singh.png', value: 'Turns complex ideas into reliable products.' },
  { name: 'Adhiraj Dogra', role: 'Senior AI/ML Engineer', image: '/assets/team/adhiraj-dogra.png', value: 'Makes intelligent systems useful in the real world.' },
];
