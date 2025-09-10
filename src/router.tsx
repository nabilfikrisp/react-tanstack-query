import { BrowserRouter, Route, Routes } from "react-router";
import { IndexPage } from "./pages";
import { ProductListPage } from "./pages/products/list";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="products" element={<ProductListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
