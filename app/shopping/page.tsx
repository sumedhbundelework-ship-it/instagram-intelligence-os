import Link from "next/link";
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
import { ArrowUpRight, TrendingDown, TrendingUp, Minus } from "lucide-react";

const products = getPostsByCategory("products");

function PriceChange({ change }: { change: number }) {
  if (change < 0) {
    return (
      <span className="flex items-center gap-1 text-emerald-500">
        <TrendingDown className="h-3.5 w-3.5" /> {change}%
      </span>
    );
  }
  if (change > 0) {
    return (
      <span className="flex items-center gap-1 text-red-500">
        <TrendingUp className="h-3.5 w-3.5" /> +{change}%
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-muted-foreground">
      <Minus className="h-3.5 w-3.5" /> steady
    </span>
  );
}

export default function ShoppingPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Shopping Assistant</h2>
        <p className="text-sm text-muted-foreground">
          {products.length} products saved from posts, with price tracking since you saved them.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Since saved</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.thumbnail}
                    alt={product.productName ?? product.caption}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-medium">{product.productName}</p>
                  <p className="text-xs text-muted-foreground">{product.creator}</p>
                </TableCell>
                <TableCell className="font-medium">
                  ${product.price?.toFixed(2)}
                </TableCell>
                <TableCell>
                  <PriceChange change={product.priceChange ?? 0} />
                </TableCell>
                <TableCell>
                  <Link
                    href={product.sourceUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    View <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" className="text-emerald-500">
          <TrendingDown className="mr-1 h-3 w-3" /> Price dropped
        </Badge>
        <Badge variant="outline" className="text-red-500">
          <TrendingUp className="mr-1 h-3 w-3" /> Price increased
        </Badge>
        <Badge variant="outline">
          <Minus className="mr-1 h-3 w-3" /> No change
        </Badge>
      </div>
    </div>
  );
}
