import { recentWorkProjects, type Project } from './portfolio-data';

export type WorkStatus = 'Client Work' | 'In Progress' | 'Studio Concept';

export type SelectedWorkProject = Project & {
  status: WorkStatus;
  purpose: string;
  role: string;
  cta: 'View the case study' | 'View the project' | 'Explore the concept';
};

export const conceptDisclosure = 'A self-initiated WEBSTELL concept created to explore a possible digital direction for this industry. It is not commissioned client work.';

const selectedDetails = [
  { id: 'nomia', purpose: 'A conversational travel planner designed to turn one idea into a clear, living itinerary.', role: 'Concept strategy, UI/UX, visual direction and responsive prototyping.' },
  { id: 'the-stay', purpose: 'A calm destination experience designed to help guests understand the stay and enquire with confidence.', role: 'Concept strategy, art direction, UI/UX and responsive prototyping.' },
  { id: 'the-course', purpose: 'An editorial course guide designed to make a complex landscape easy to explore and plan around.', role: 'Information design, art direction, UI/UX and responsive prototyping.' },
  { id: 'ferea', purpose: 'A playful coffee storefront designed to connect distinctive character with a direct ordering journey.', role: 'Brand direction, ecommerce UI/UX and responsive prototyping.' },
  { id: 'vantage', purpose: 'An energetic programme experience designed to help players find the right training path quickly.', role: 'Product framing, UI/UX, visual direction and responsive prototyping.' },
  { id: 'gen-z', purpose: 'A bold editorial storefront designed to give product, identity and attitude equal presence.', role: 'Creative direction, ecommerce UI/UX and responsive prototyping.' },
] as const;

const projectById = new Map(recentWorkProjects.map((project) => [project.id, project]));

export const selectedWorkProjects: SelectedWorkProject[] = selectedDetails.map((details) => {
  const project = projectById.get(details.id);
  if (!project) throw new Error(`Missing selected work project: ${details.id}`);
  return { ...project, ...details, status: 'Studio Concept', cta: 'Explore the concept' };
});

const selectedIds = new Set(selectedDetails.map(({ id }) => id));
const selectedProjectById = new Map(selectedWorkProjects.map((project) => [project.id, project]));

export const orderedWorkProjects = [
  ...selectedWorkProjects,
  ...recentWorkProjects.filter((project) => !selectedIds.has(project.id as (typeof selectedDetails)[number]['id'])),
];

export function projectIntentMessage(project: Project) {
  return `Hi WEBSTELL! I would like to discuss the ${project.title} ${project.kind === 'Design concept' ? 'studio concept' : 'project'} and explore a direction for my business.`;
}

export function getWorkEditorial(project: Project): Pick<SelectedWorkProject, 'status' | 'purpose' | 'role' | 'cta'> {
  const selectedProject = selectedProjectById.get(project.id);
  if (selectedProject) return selectedProject;
  return {
    status: 'Studio Concept',
    purpose: project.description,
    role: 'Concept strategy, visual direction, UI/UX and responsive prototyping.',
    cta: 'Explore the concept',
  };
}
