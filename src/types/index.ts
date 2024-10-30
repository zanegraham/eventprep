export interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  available: number;
  notes?: string;
  lastUsed?: Date;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  type: 'party' | 'concert' | 'wedding' | 'other';
  categories: string[];
  items: string[];
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  type: string;
  checklist: {
    itemId: string;
    completed: boolean;
  }[];
}