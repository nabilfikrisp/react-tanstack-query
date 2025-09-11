import type { Brand } from "@/schemas/brand.schema";
import { format } from "date-fns";
import { Building2, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";

type BrandCardProps = {
  brand: Brand;
};

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <article className="group">
      <div className="bg-background ring-muted flex h-full flex-col rounded-lg shadow-lg ring-1 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
        {/* Brand Logo Section */}
        <div className="from-primary/5 to-primary/10 overflow-hidden rounded-t-lg bg-gradient-to-br p-6">
          <div className="flex justify-center">
            {brand.logo ? (
              <div className="h-20 w-20 overflow-hidden rounded-lg bg-white shadow-md">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-full w-full object-contain p-2"
                />
              </div>
            ) : (
              <div className="bg-primary/20 rounded-lg p-4">
                <Building2 className="text-primary h-12 w-12" />
              </div>
            )}
          </div>
        </div>

        {/* Brand Content Section */}
        <div className="flex-1 space-y-4 p-4">
          {/* Brand Info */}
          <div className="text-center">
            <h3 className="text-foreground group-hover:text-primary mb-1 text-lg font-bold transition-colors">
              {brand.name}
            </h3>
            <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{brand.country}</span>
            </div>
          </div>

          {/* Description */}
          {brand.description && (
            <p className="text-muted-foreground line-clamp-3 text-center text-sm leading-relaxed">
              {brand.description}
            </p>
          )}

          {/* Founded Year */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">Founded:</span>
            <span className="text-foreground font-semibold">
              {brand.founded}
            </span>
          </div>

          {/* Created At */}
          <div className="text-muted-foreground text-center text-sm">
            {format(new Date(brand.createdAt), "MMM dd, yyyy")}
          </div>
        </div>

        {/* Brand Action Section */}
        <div className="p-4 pt-0">
          <Button
            className="bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary w-full rounded-lg px-4 py-2 font-medium transition-all duration-200"
            asChild
          >
            <Link to={`/brands/${brand.id}`}> View Products</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
