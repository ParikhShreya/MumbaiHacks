export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  relationship: string;
  avatar: string;
  prakriti?: 'vata' | 'pitta' | 'kapha' | 'vata-pitta' | 'pitta-kapha' | 'vata-kapha';
  conditions?: string[];
  createdAt: Date;
}

export interface HealthReport {
  id: string;
  memberId: string;
  type: string;
  date: Date;
  values: Record<string, number | string>;
  insights?: string[];
}

export interface MealPlan {
  id: string;
  memberId: string;
  date: Date;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string[];
  };
  groceryList: string[];
}

export interface DailyRoutine {
  id: string;
  memberId: string;
  tasks: RoutineTask[];
}

export interface RoutineTask {
  id: string;
  name: string;
  time: string;
  category: 'morning' | 'afternoon' | 'evening' | 'night';
  completed: boolean;
  description?: string;
}
