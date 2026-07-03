import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { PostCard } from "@/components/post-card";
import { posts, creators, trends, categoryMeta, formatDate } from "@/lib/data";
import {
  BookMarked,
  Clapperboard,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const reelsCount = posts.filter((p) => p.type === "reel").length;
  const inTalks = creators.filter((c) => c.collabStatus === "In Talks").length;
  const topTrend = [...trends].sort((a, b) => b.trendScore - a.trendScore)[0];
  const recent = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  const categoryCounts = Object.entries(categoryMeta).map(([key, meta]) => ({
    key,
    label: meta.label,
    color: meta.color,
    count: posts.filter((p) => p.category === key).length,
  }));
  const maxCount = Math.max(...categoryCounts.map((c) => c.count));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back 👋</h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening across your saved Instagram content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Posts saved" value={posts.length} icon={BookMarked} hint="across 5 categories" />
        <StatCard label="Reels to summarize" value={reelsCount} icon={Clapperboard} hint="ready for AI summary" />
        <StatCard label="Rising trend" value={`${topTrend.trendScore}`} icon={TrendingUp} hint={topTrend.topic} />
        <StatCard label="Creators in talks" value={inTalks} icon={Users} hint={`${creators.length} tracked total`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Saves by category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryCounts.map((c) => (
              <Link
                key={c.key}
                href={`/collections/${c.key}`}
                className="block space-y-1 rounded-md p-1 hover:bg-accent"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className={c.color}>{c.label}</span>
                  <span className="text-muted-foreground">{c.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(c.count / maxCount) * 100}%` }}
                  />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Recently saved</CardTitle>
            <Link href="/search" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              Search all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {recent.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumbnail} alt={p.caption} className="h-12 w-12 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.caption}</p>
                    <p className="text-xs text-muted-foreground">{p.creator} · {formatDate(p.date)}</p>
                  </div>
                  <Badge variant="secondary" className={categoryMeta[p.category].color}>
                    {categoryMeta[p.category].label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">Fresh saves worth a look</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {recent.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
