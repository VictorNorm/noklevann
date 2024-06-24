import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Bygg from "./routes/Bygg";
import Uteomraader from "./routes/Uteomraader";
import Regler from "./routes/Regler";
import Rapporter from "./routes/Rapporter";
import Praktisk from "./routes/Praktisk";
import ErrorPage from "./routes/Error-page";
import Hjem from "./routes/Hjem";
import Soknader from "./routes/Soknader";
import Details from "./routes/Details";
import Nokkelen from "./routes/Nokkelen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Hjem />,
      },
      {
        path: "bygg",
        element: <Bygg />,
      },
      {
        path: "uteomraader",
        element: <Uteomraader />,
      },
      {
        path: "regler",
        element: <Regler />,
      },
      {
        path: "rapporter",
        element: <Rapporter />,
      },
      {
        path: "praktisk",
        element: <Praktisk />,
      },
      {
        path: "soknader",
        element: <Soknader />,
      },
      {
        path: "nokkelen",
        element: <Nokkelen />,
      },
      {
        path: "nyhet",
        element: <Details />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
