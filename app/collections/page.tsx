import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { posts, categoryMeta } from "@/lib/data";
import { Dumbbell, ChefHat, Plane, Briefcase, ShoppingBag, type LucideIcon } from "lucide-react";
import type { Category } from "@/lib/types";

const folderIcons: Record<Category, LucideIcon> = {
  fitness: Dumbbell,
  recipes: ChefHat,
  travel: Plane,
  business: Briefcase,
  products: ShoppingBag,
};

const folderDescriptions: Record<Category, string> = {
  fitness: "Workouts, routines, and training tips you've saved",
  recipes: "Dishes, meal preps, and cooking tutorials",
  travel: "Itineraries, destinations, and travel guides",
  business: "Growth tactics, creator economy, and startup lessons",
  products: "Gear and products worth buying",
};

export default function CollectionsPage() {
  const categories = Object.keys(categoryMeta) as Category[];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Smart Collections</h2>
        <p className="text-sm text-muted-foreground">
          Your saves, auto-sorted into topic folders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const meta = categoryMeta[category];
          const Icon = folderIcons[category];
          const categoryPosts = posts.filter((p) => p.category === category);
          const cover = categoryPosts[0]?.thumbnail;

          return (
            <Link key={category} href={`/collections/${category}`}>
              <Card className="overflow-hidden pt-0 transition-shadow hover:shadow-md">
                <div className="relative h-32 w-full bg-muted">
                  {cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt={meta.label} className="h-full w-full object-cover opacity-80" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 flex items-center gap-2 text-white">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{meta.label}</span>
                  </div>
                </div>
                <CardContent className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{folderDescriptions[category]}</p>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                    {categoryPosts.length}
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
