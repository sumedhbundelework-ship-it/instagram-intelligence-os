import seed from "@/lib/data/seed.json";
import type { SeedData, Category } from "@/lib/types";

const data = seed as SeedData;

export const posts = data.posts;
export const creators = data.creators;
export const trends = data.trends;

export const categoryMeta: Record<Category, { label: string; color: string }> = {
  fitness: { label: "Fitness", color: "text-orange-500" },
  recipes: { label: "Recipes", color: "text-emerald-500" },
  travel: { label: "Travel", color: "text-sky-500" },
  business: { label: "Business", color: "text-violet-500" },
  products: { label: "Products", color: "text-pink-500" },
};

export function getPostsByCategory(category: Category) {
  return posts.filter((p) => p.category === category);
}

export function getReels() {
  return posts.filter((p) => p.type === "reel");
}

export function searchPosts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return posts
    .map((post) => {
      const haystack = [
        post.caption,
        post.creator,
        post.category,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();
      const matches = terms.filter((t) => haystack.includes(t)).length;
      return { post, matches };
    })
    .filter((r) => r.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .map((r) => r.post);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
