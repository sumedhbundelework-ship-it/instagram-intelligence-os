"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPostsByCategory } from "@/lib/data";
import { MapPin, Sparkles, Plane } from "lucide-react";

const travelPosts = getPostsByCategory("travel");

const dayTemplates = [
  {
    title: "Arrival & orientation",
    activities: [
      "Check in and drop bags, then take a slow walk around the neighborhood to get oriented",
      "Scope out a nearby café for tomorrow's early start",
      "Light dinner close to where you're staying — no need to rush on day one",
    ],
  },
  {
    title: "Signature sights",
    activities: [
      "Hit the must-see spot from the saved post early, before the crowds arrive",
      "Wander the surrounding area on foot — this is where the best photos happen",
      "Take a long lunch break somewhere with local specialties",
    ],
  },
  {
    title: "Local flavor",
    activities: [
      "Follow the food recommendations from the saved post for lunch",
      "Spend the afternoon exploring a market or neighborhood you haven't seen yet",
      "Book a table somewhere the locals actually eat, not the tourist strip",
    ],
  },
  {
    title: "Slow down day",
    activities: [
      "Sleep in — you've earned it after two full days of exploring",
      "Pick one thing from your saved tags to prioritize today",
      "End with a sunset viewpoint or waterfront walk",
    ],
  },
];

export default function TravelPlannerPage() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [itinerary, setItinerary] = React.useState<typeof travelPosts | null>(null);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function generate() {
    const chosen = travelPosts.filter((p) => selected.includes(p.id));
    setItinerary(chosen);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Travel Planner</h2>
        <p className="text-sm text-muted-foreground">
          Select the saved travel posts you want to build a trip around, then generate a day-by-day itinerary.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {travelPosts.map((post) => (
          <Card
            key={post.id}
            className={`cursor-pointer overflow-hidden pt-0 transition-shadow hover:shadow-md ${
              selected.includes(post.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => toggle(post.id)}
          >
            <div className="relative aspect-video w-full bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.thumbnail} alt={post.caption} className="h-full w-full object-cover" />
              <div className="absolute right-2 top-2">
                <Checkbox checked={selected.includes(post.id)} onCheckedChange={() => toggle(post.id)} />
              </div>
            </div>
            <CardContent className="space-y-1">
              <p className="line-clamp-2 text-sm font-medium">{post.caption}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {post.location}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={generate} disabled={selected.length === 0}>
        <Sparkles className="mr-1 h-4 w-4" />
        Generate itinerary ({selected.length} selected)
      </Button>

      {itinerary && itinerary.length > 0 && (
        <Card>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-sky-500" />
              <h3 className="text-sm font-semibold">
                {itinerary.map((p) => p.location).join(" → ")} — {itinerary.length * 2}-day itinerary
              </h3>
            </div>

            {itinerary.map((post, i) => {
              const dayIndex = i % dayTemplates.length;
              const template = dayTemplates[dayIndex];
              const nextTemplate = dayTemplates[(dayIndex + 1) % dayTemplates.length];
              return (
                <div key={post.id} className="space-y-3 border-l-2 border-primary/30 pl-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Day {i * 2 + 1} · {post.location}
                    </p>
                    <p className="text-sm font-semibold">{template.title}</p>
                    <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {template.activities.map((a, j) => (
                        <li key={j}>{a}</li>
                      ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Based on: &ldquo;{post.caption}&rdquo; — {post.creator}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Day {i * 2 + 2} · {post.location}
                    </p>
                    <p className="text-sm font-semibold">{nextTemplate.title}</p>
                    <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {nextTemplate.activities.map((a, j) => (
                        <li key={j}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
