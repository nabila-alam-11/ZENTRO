import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "../src/styles.css";
import Leads from "./pages/Leads.jsx";
import Sales from "./pages/Sales.jsx";
import Agents from "./pages/Agents.jsx";
import Report from "./pages/Report.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/leads",
    element: <Leads />,
  },
  {
    path: "/sales",
    element: <Sales />,
  },
  {
    path: "/agents",
    element: <Agents />,
  },
  {
    path: "/report",
    element: <Report />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
