import { usePrefetch } from "@/hooks/use-prefetch";
import type { Brand } from "@/schemas/brand.schema";
import { Link } from "react-router";

type ProductBrandProps = {
  id: Brand["id"];
  logo: Brand["logo"];
  name: Brand["name"];
  country: Brand["country"];
  founded: Brand["founded"];
  description: Brand["description"];
};

export function ProductBrand({
  id,
  logo,
  name,
  country,
  founded,
  description,
}: ProductBrandProps) {
  const { prefetchBrandById } = usePrefetch();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-foreground text-2xl font-medium">Brand</h2>
      <div className="flex items-start gap-6">
        <img
          src={logo}
          alt={name}
          className="h-20 w-20 rounded-lg object-contain"
        />
        <div className="space-y-1">
          <h3 className="text-foreground hover:text-primary font-medium hover:underline">
            <Link
              to={`/brands/${id}`}
              onMouseEnter={() => prefetchBrandById(id)}
            >
              {name}
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm">
            {country} • Est. {founded}
          </p>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
