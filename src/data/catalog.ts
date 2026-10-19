import categoryConfig from './categories.json';
import softwareConfig from './software.json';
import { validateCatalog } from './validate-catalog.mjs';

export interface Category { id: string; name: string; icon: string; }
export interface Software {
  id: string;
  name: string;
  icon: string;
  color?: string;
  url: string;
  documentation?: string;
  description: string;
  instructions?: string;
  category: string;
  keywords?: string[];
}
validateCatalog(categoryConfig, softwareConfig);
export const categories: Category[] = categoryConfig;
export const software: Software[] = softwareConfig;
export const categoryName = (id: string) => categories.find(category => category.id === id)?.name ?? id;
