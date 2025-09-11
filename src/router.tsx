import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { IndexPage } from "./pages";
import { BrandDetailPage } from "./pages/brands/detail.page";
import { BrandListPage } from "./pages/brands/list.page";
import { ProductDetailPage } from "./pages/products/detail.page";
import { ProductListPage } from "./pages/products/list.page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={<IndexPage />}
          />
          <Route path="products">
            <Route
              index
              element={<ProductListPage />}
            />
            <Route
              path=":id"
              element={<ProductDetailPage />}
            />
          </Route>
          <Route path="brands">
            <Route
              index
              element={<BrandListPage />}
            />
            <Route
              path=":id"
              element={<BrandDetailPage />}
            />
          </Route>
          <Route
            path="*"
            element={<div>404 Not Found</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
