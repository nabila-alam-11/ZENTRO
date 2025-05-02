import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "../src/css/styles.css";
import Leads from "./pages/Leads.jsx";
import Sales from "./pages/Sales.jsx";
import Agents from "./pages/Agents.jsx";
import Report from "./pages/Report.jsx";
import Settings from "./pages/Settings.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import AddLeadForm from "./components/AddLeadForm.jsx";
import { LeadProvider } from "./contexts/LeadContext.jsx";
import SalesAgentForm from "./components/SalesAgentForm.jsx";
import { AgentProvider } from "./contexts/AgentContext.jsx";
import { CommentProvider } from "./contexts/CommentContext.jsx";
import LeadStatusOverview from "./pages/LeadStatusOverview.jsx";
import LeadsBySalesAgent from "./pages/LeadsBySalesAgent.jsx";

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
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/lead/:leadId",
    element: <LeadDetails />,
  },
  {
    path: "/addLead",
    element: <AddLeadForm />,
  },
  {
    path: "/addAgent",
    element: <SalesAgentForm />,
  },
  {
    path: "/status/:leadStatus",
    element: <LeadStatusOverview />,
  },
  {
    path: "/leads/:agent",
    element: <LeadsBySalesAgent />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CommentProvider>
      <AgentProvider>
        <LeadProvider>
          <RouterProvider router={router} />
        </LeadProvider>
      </AgentProvider>
    </CommentProvider>
  </StrictMode>
);
