"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPostsByCategory, formatDate } from "@/lib/data";
import { ChefHat, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const recipePosts = getPostsByCategory("recipes");

export default function RecipesPage() {
  const [selectedId, setSelectedId] = React.useState(recipePosts[0]?.id);
  const selected = recipePosts.find((p) => p.id === selectedId) ?? recipePosts[0];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Recipe Extractor</h2>
        <p className="text-sm text-muted-foreground">
          Pick a saved food post to see it broken down into ingredients and steps.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {recipePosts.map((post) => (
            <Card
              key={post.id}
              onClick={() => setSelectedId(post.id)}
              className={cn(
                "cursor-pointer overflow-hidden py-0 transition-shadow hover:shadow-md",
                selected?.id === post.id && "ring-2 ring-primary"
              )}
            >
              <CardContent className="flex items-center gap-3 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.thumbnail} alt={post.caption} className="h-14 w-14 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium">{post.caption}</p>
                  <p className="text-xs text-muted-foreground">{post.creator}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selected && (
          <Card>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.thumbnail}
                  alt={selected.caption}
                  className="h-40 w-full rounded-md object-cover sm:h-32 sm:w-32"
                />
                <div className="flex-1 space-y-2">
                  <p className="font-semibold">{selected.caption}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{selected.creator}</span>
                    <span>·</span>
                    <span>{formatDate(selected.date)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selected.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                    <ChefHat className="h-4 w-4" /> Ingredients
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    {selected.ingredients?.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                    <Clock className="h-4 w-4" /> Steps
                  </h3>
                  <ol className="space-y-2 text-sm">
                    {selected.steps?.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
