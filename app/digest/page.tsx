import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { posts, categoryMeta, formatDate } from "@/lib/data";
import { Sparkles, BookMarked, Flame, Clapperboard } from "lucide-react";

function daysBetween(a: string, b: string) {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / (1000 * 60 * 60 * 24);
}

export default function DigestPage() {
  const sortedByDate = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const mostRecentDate = sortedByDate[0].date;
  const thisWeek = sortedByDate.filter((p) => daysBetween(p.date, mostRecentDate) <= 7);

  const categoryCounts = thisWeek.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
  const topCategoryEntry = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  const topCategory = topCategoryEntry?.[0] as keyof typeof categoryMeta | undefined;
  const reelsThisWeek = thisWeek.filter((p) => p.type === "reel").length;
  const topSaves = thisWeek.slice(0, 6);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Weekly AI Digest</h2>
        <p className="text-sm text-muted-foreground">
          Your Sunday recap, covering the 7 days ending {formatDate(mostRecentDate)}.
        </p>
      </div>

      <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-400/10">
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-purple-500" />
            AI insight
          </div>
          <p className="text-sm text-muted-foreground">
            {topCategory
              ? `You leaned heavily into ${categoryMeta[topCategory].label.toLowerCase()} content this week — ${
                  topCategoryEntry?.[1]
                } of your ${thisWeek.length} saves came from that category. `
              : ""}
            {reelsThisWeek > 0
              ? `${reelsThisWeek} of those saves were reels worth summarizing — check the Reel Summarizer to catch up fast.`
              : "Mostly static posts this week — nothing queued up in the Reel Summarizer."}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center gap-1 py-2 text-center">
            <BookMarked className="h-5 w-5 text-muted-foreground" />
            <p className="text-xl font-semibold">{thisWeek.length}</p>
            <p className="text-xs text-muted-foreground">Posts saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-1 py-2 text-center">
            <Flame className={topCategory ? categoryMeta[topCategory].color : ""} />
            <p className="text-xl font-semibold">
              {topCategory ? categoryMeta[topCategory].label : "—"}
            </p>
            <p className="text-xs text-muted-foreground">Top category</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-1 py-2 text-center">
            <Clapperboard className="h-5 w-5 text-muted-foreground" />
            <p className="text-xl font-semibold">{reelsThisWeek}</p>
            <p className="text-xs text-muted-foreground">Reels saved</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Top saves this week</h3>
        {topSaves.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center gap-3 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.thumbnail} alt={post.caption} className="h-12 w-12 shrink-0 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.caption}</p>
                <p className="text-xs text-muted-foreground">
                  {post.creator} · {formatDate(post.date)}
                </p>
              </div>
              <Badge variant="secondary" className={categoryMeta[post.category].color}>
                {categoryMeta[post.category].label}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
