import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { categoryMeta, formatDate } from "@/lib/data";
import type { Post } from "@/lib/types";
import { Clapperboard } from "lucide-react";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden pt-0 transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.thumbnail}
          alt={post.caption}
          className="h-full w-full object-cover"
        />
        {post.type === "reel" && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            <Clapperboard className="h-3 w-3" />
            Reel
          </div>
        )}
      </div>
      <CardContent className="space-y-2 px-4">
        <p className="line-clamp-2 text-sm font-medium">{post.caption}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.creator}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Badge variant="secondary" className={categoryMeta[post.category].color}>
            {categoryMeta[post.category].label}
          </Badge>
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
