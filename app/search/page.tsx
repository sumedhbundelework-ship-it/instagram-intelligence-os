"use client";

import * as React from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/post-card";
import { searchPosts, posts } from "@/lib/data";

const exampleQueries = [
  "quick dinner recipes",
  "shoulder workout",
  "budget travel japan",
  "newsletter growth",
  "gear for recovery",
];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const results = React.useMemo(() => searchPosts(query), [query]);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">AI Saved Search</h2>
        <p className="text-sm text-muted-foreground">
          Ask for anything across your {posts.length} saved posts — captions, creators, and tags are all searched.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "one pan dinner" or "leg day workout"...'
          className="h-11 pl-9"
        />
      </div>

      {!hasQuery && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Try searching for</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((q) => (
              <Badge
                key={q}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setQuery(q)}
              >
                {q}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {hasQuery && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          {results.length > 0
            ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
            : `No matches for "${query}" — try a different keyword`}
        </div>
      )}

      {hasQuery && results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
