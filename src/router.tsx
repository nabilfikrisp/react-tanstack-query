import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { IndexPage } from "./pages";
import { ProductListPage } from "./pages/products/list";

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
              element={<div>Product Detail Page</div>}
            />
          </Route>
          <Route path="brands">
            <Route
              index
              element={<div>Brand List Page</div>}
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
