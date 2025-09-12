import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";

const IndexPage = lazy(() => import("./pages"));
const BrandDetailPage = lazy(() => import("./pages/brands/detail.page"));
const BrandListPage = lazy(() => import("./pages/brands/list.page"));
const NotFoundPage = lazy(() => import("./pages/not-found"));
const ProductDetailPage = lazy(() => import("./pages/products/detail.page"));
const ProductListPage = lazy(() => import("./pages/products/list.page"));

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
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
