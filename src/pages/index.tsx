import { Link } from "react-router";
import { Button } from "../components/ui/button";

import {
  ArrowRight,
  Package,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

export default function IndexPage() {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col">
      {/* Background gradient */}
      <div className="from-primary/5 to-accent/5 absolute inset-0 -z-10 bg-gradient-to-br via-transparent" />

      <div className="app-container flex flex-1 flex-col">
        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-12 text-center">
          <div className="absolute top-20 left-20 opacity-20">
            <ShoppingBag className="text-primary h-8 w-8 animate-bounce delay-0" />
          </div>
          <div className="absolute top-32 right-16 opacity-20">
            <Package className="text-accent h-6 w-6 animate-bounce delay-1000" />
          </div>
          <div className="absolute bottom-20 left-32 opacity-20">
            <Star className="text-primary h-7 w-7 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              Discover thousands of products
            </div>

            <h1 className="from-foreground via-foreground to-foreground/80 mb-6 max-w-5xl bg-gradient-to-r bg-clip-text text-5xl font-extrabold tracking-tight text-balance text-transparent sm:text-6xl">
              Discover Amazing{" "}
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                Products & Brands
              </span>
            </h1>

            <p className="text-muted-foreground mb-8 text-lg leading-relaxed text-balance">
              Explore a curated collection of exceptional products and trusted
              brands. Find what you need, discover what you love, and shop with
              confidence.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/products">
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/brands">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg transition-all duration-300"
                >
                  <Package className="mr-2 h-5 w-5" />
                  Explore Brands
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col items-center px-5 pt-12 pb-16 text-center">
          <div className="bg-accent/10 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Start exploring
          </div>

          <h3 className="mb-4 text-3xl font-bold">
            Ready to find your next favorite?
          </h3>

          <p className="text-muted-foreground mb-8 max-w-md text-balance">
            Browse our carefully selected products and discover brands that
            match your style and needs
          </p>

          <Link to="/products">
            <Button
              size="lg"
              variant="outline"
              className="group text-lg transition-all duration-300"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
