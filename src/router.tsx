import { BrowserRouter, Route, Routes } from "react-router";
import { IndexPage } from "./pages";
import { ProductListPage } from "./pages/products/list";
import { Layout } from "./components/layout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="products">
            <Route index element={<ProductListPage />} />
            <Route path=":id" element={<div>Product Detail Page</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
