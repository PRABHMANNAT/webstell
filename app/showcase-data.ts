import { industryProjects } from './portfolio-data';
export type WorkCategory = string;
export const workFilters = ['All', ...Array.from(new Set(industryProjects.map(project=>project.category)))];
export const workGallery = industryProjects.map((project,index)=>({...project,meta:project.category,shape:['portrait','landscape','square'][index%3]}));
