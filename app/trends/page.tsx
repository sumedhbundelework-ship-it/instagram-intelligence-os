import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/sparkline";
import { trends } from "@/lib/data";
import { TrendingUp } from "lucide-react";

export default function TrendsPage() {
  const sorted = [...trends].sort((a, b) => b.trendScore - a.trendScore);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Trend Detector</h2>
        <p className="text-sm text-muted-foreground">
          Topics rising across the creators and categories you save from.
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map((trend) => (
          <Card key={trend.id}>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{trend.topic}</p>
                  <Badge variant="outline">{trend.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{trend.insight}</p>
              </div>

              <div className="flex items-center gap-4 sm:shrink-0">
                <Sparkline data={trend.sparkline} className="text-emerald-500" />
                <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-sm font-semibold">{trend.trendScore}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
