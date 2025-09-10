import { Outlet } from "react-router";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
