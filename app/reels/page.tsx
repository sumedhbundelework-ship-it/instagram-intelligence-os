"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getReels, categoryMeta, formatDate } from "@/lib/data";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";

const reels = getReels();

export default function ReelsPage() {
  const [summarizing, setSummarizing] = React.useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = React.useState<Record<string, boolean>>({});

  function handleSummarize(id: string) {
    setSummarizing((s) => ({ ...s, [id]: true }));
    setTimeout(() => {
      setSummarizing((s) => ({ ...s, [id]: false }));
      setRevealed((r) => ({ ...r, [id]: true }));
    }, 800);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Reel Summarizer</h2>
        <p className="text-sm text-muted-foreground">
          Turn saved reels into quick, skimmable takeaways. {reels.length} reels saved.
        </p>
      </div>

      <div className="space-y-4">
        {reels.map((reel) => {
          const isSummarizing = summarizing[reel.id];
          const isRevealed = revealed[reel.id];

          return (
            <Card key={reel.id}>
              <CardContent className="flex flex-col gap-4 sm:flex-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={reel.thumbnail}
                  alt={reel.caption}
                  className="h-40 w-full shrink-0 rounded-md object-cover sm:h-32 sm:w-32"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{reel.caption}</p>
                      <p className="text-xs text-muted-foreground">
                        {reel.creator} · {formatDate(reel.date)}
                      </p>
                    </div>
                    <Badge variant="secondary" className={categoryMeta[reel.category].color}>
                      {categoryMeta[reel.category].label}
                    </Badge>
                  </div>

                  {!isRevealed && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isSummarizing}
                      onClick={() => handleSummarize(reel.id)}
                    >
                      {isSummarizing ? (
                        <>
                          <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> Summarizing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-1 h-3.5 w-3.5" /> Summarize
                        </>
                      )}
                    </Button>
                  )}

                  {isRevealed && reel.summary && (
                    <div className="space-y-1 rounded-md border bg-muted/40 p-3">
                      <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Key takeaways
                      </p>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        {reel.summary.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
