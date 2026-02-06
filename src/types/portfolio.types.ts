export type Timeline = 'past' | 'present' | 'future';
export type Context = 'work' | 'projects' | 'leisure';
export type Language = 'es' | 'en';

export interface Experience {
  id: string;
  title: string;
  company?: string;
  description: string;
  period: string;
  technologies: string[];
  highlights?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  gallery?: string[];
}

export interface Hobby {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TimelineData {
  work: Experience[];
  projects?: Project[];
  leisure?: Hobby[];
}

export interface AvatarConfig {
  timeline: Timeline;
  context: Context;
  url: string;
}

export interface PortfolioState {
  timeline: Timeline;
  context: Context;
  language: Language;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
