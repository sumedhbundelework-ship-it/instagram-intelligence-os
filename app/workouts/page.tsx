import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getPostsByCategory } from "@/lib/data";

const fitnessPosts = getPostsByCategory("fitness");

const weekPlan = [
  { day: "Monday", focus: "Push Day", postId: "p02" },
  { day: "Tuesday", focus: "Pull Day", postId: "p03" },
  { day: "Wednesday", focus: "Leg Day", postId: "p04" },
  { day: "Thursday", focus: "Shoulders", postId: "p01" },
  { day: "Friday", focus: "Core Finisher", postId: "p06" },
  { day: "Saturday", focus: "Active Recovery", postId: "p05" },
  { day: "Sunday", focus: "Rest", postId: null },
];

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Workout Planner</h2>
        <p className="text-sm text-muted-foreground">
          Your {fitnessPosts.length} saved fitness posts, compiled into a weekly routine.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Day</TableHead>
              <TableHead className="w-40">Focus</TableHead>
              <TableHead>Exercises</TableHead>
              <TableHead className="w-40">Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weekPlan.map((entry) => {
              const post = fitnessPosts.find((p) => p.id === entry.postId);
              return (
                <TableRow key={entry.day}>
                  <TableCell className="font-medium">{entry.day}</TableCell>
                  <TableCell>{entry.focus}</TableCell>
                  <TableCell>
                    {post?.exercises ? (
                      <div className="space-y-1">
                        {post.exercises.map((ex) => (
                          <div key={ex.name} className="flex items-center justify-between gap-4 text-sm">
                            <span>{ex.name}</span>
                            <Badge variant="secondary" className="shrink-0">
                              {ex.sets} × {ex.reps}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Recovery — no exercises logged</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {post ? post.creator : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
