import type { Brand } from "@/schemas/brand.schema";

type ProductBrandProps = {
  logo: Brand["logo"];
  name: Brand["name"];
  country: Brand["country"];
  founded: Brand["founded"];
  description: Brand["description"];
};

export function ProductBrand({
  logo,
  name,
  country,
  founded,
  description,
}: ProductBrandProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-foreground text-2xl font-medium">Brand</h2>
      <div className="flex items-start gap-6">
        <img
          src={logo}
          alt={name}
          className="h-24 w-24 rounded-lg object-contain"
        />
        <div className="space-y-2">
          <h3 className="text-foreground font-medium">{name}</h3>
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
