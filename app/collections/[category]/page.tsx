import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { posts, categoryMeta } from "@/lib/data";
import type { Category } from "@/lib/types";

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export default async function CollectionCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!(category in categoryMeta)) {
    notFound();
  }

  const meta = categoryMeta[category as Category];
  const categoryPosts = posts.filter((p) => p.category === category);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/collections"
          className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> All collections
        </Link>
        <h2 className={`text-2xl font-semibold tracking-tight ${meta.color}`}>{meta.label}</h2>
        <p className="text-sm text-muted-foreground">{categoryPosts.length} saved posts</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categoryPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
