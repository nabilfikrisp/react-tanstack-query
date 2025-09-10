export function Navbar() {
  return (
    <header className="w-full border-b">
      <div className="app-container flex items-center">
        <div className="text-xl font-bold">MyApp</div>

        <nav className="ml-auto space-x-4">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </header>
  );
}
