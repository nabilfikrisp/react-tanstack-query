import { Link, NavLink } from "react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 h-16 w-full border-b">
      <div className="app-container flex h-full items-center">
        <Link to="/">
          <span className="text-primary hover:text-primary/80 text-3xl font-bold tracking-tighter text-shadow-md">
            P&B
          </span>
        </Link>

        <nav className="text-muted-foreground ml-auto space-x-4 font-medium">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "hover:text-primary/80"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/brands"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "hover:text-primary/80"
            }
          >
            Brands
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
