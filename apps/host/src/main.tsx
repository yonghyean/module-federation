import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const RemoteApp = React.lazy(() => import("remote/App"));

const router = createBrowserRouter([
  {
    index: true,
    element: <h2>hello world root 11</h2>,
  },
  {
    path: "/remote",
    element: (
      <Suspense fallback="loading...">
        <RemoteApp />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: <h2>test</h2>,
  },
  {
    path: "*",
    element: <h2>not foudn</h2>,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
