import { AlertTriangle, ArrowLeft, Home, Search } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col">
      {/* Background gradient */}
      <div className="from-primary/5 to-accent/5 absolute inset-0 -z-10 bg-gradient-to-br via-transparent" />

      <div className="app-container flex flex-1 flex-col">
        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
          <div className="relative z-10">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <AlertTriangle className="h-4 w-4" />
              Page not found
            </div>

            <h1 className="from-foreground via-foreground to-foreground/80 mb-6 max-w-3xl bg-gradient-to-r bg-clip-text text-6xl font-extrabold tracking-tight text-balance text-transparent sm:text-7xl">
              404
            </h1>

            <h2 className="mb-6 text-3xl font-bold text-balance">
              Oops! This page doesn't exist
            </h2>

            <p className="text-muted-foreground mb-8 max-w-md text-lg leading-relaxed text-balance">
              The page you're looking for might have been moved, deleted, or
              doesn't exist. Let's get you back on track.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/">
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="group text-lg transition-all duration-300"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Products
                </Button>
              </Link>
            </div>

            <div className="mt-8">
              <Button
                variant="ghost"
                className="group text-lg transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Go Back
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
