"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { creators as initialCreators, formatDate } from "@/lib/data";
import type { CollabStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<CollabStatus, string> = {
  "Not Started": "text-muted-foreground",
  "In Talks": "text-amber-500",
  Collaborated: "text-emerald-500",
  Passed: "text-red-500",
};

export default function CrmPage() {
  const [creators, setCreators] = React.useState(initialCreators);

  function updateStatus(id: string, status: CollabStatus) {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, collabStatus: status } : c)));
  }

  function updateNotes(id: string, notes: string) {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, notes } : c)));
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Creator CRM</h2>
        <p className="text-sm text-muted-foreground">
          Track collab status and follow-ups with the {creators.length} creators you save from most.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Last DM</TableHead>
              <TableHead className="w-40">Collab status</TableHead>
              <TableHead className="min-w-64">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creators.map((creator) => (
              <TableRow key={creator.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.slice(1, 3).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{creator.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{creator.niche}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(creator.lastDmDate)}
                </TableCell>
                <TableCell>
                  <Select
                    value={creator.collabStatus}
                    onValueChange={(value) => updateStatus(creator.id, value as CollabStatus)}
                  >
                    <SelectTrigger className={cn("h-8 text-xs", statusStyles[creator.collabStatus])}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(["Not Started", "In Talks", "Collaborated", "Passed"] as CollabStatus[]).map(
                        (status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={creator.notes}
                    onChange={(e) => updateNotes(creator.id, e.target.value)}
                    className="h-8 text-xs"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
