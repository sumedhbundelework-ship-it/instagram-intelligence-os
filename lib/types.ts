export type Category = "fitness" | "recipes" | "travel" | "business" | "products";
export type PostType = "post" | "reel";

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface Post {
  id: string;
  thumbnail: string;
  caption: string;
  creator: string;
  category: Category;
  tags: string[];
  date: string;
  type: PostType;
  summary?: string[];
  exercises?: Exercise[];
  ingredients?: string[];
  steps?: string[];
  location?: string;
  productName?: string;
  price?: number;
  priceChange?: number;
  sourceUrl?: string;
}

export type CollabStatus = "Not Started" | "In Talks" | "Collaborated" | "Passed";

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  lastDmDate: string;
  collabStatus: CollabStatus;
  notes: string;
}

export interface Trend {
  id: string;
  topic: string;
  category: string;
  trendScore: number;
  sparkline: number[];
  insight: string;
}

export interface SeedData {
  posts: Post[];
  creators: Creator[];
  trends: Trend[];
}
