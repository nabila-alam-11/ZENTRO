import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LeadProvider } from "./contexts/LeadContext.jsx";
import { AgentProvider } from "./contexts/AgentContext.jsx";
import { CommentProvider } from "./contexts/CommentContext.jsx";
import "../src/css/styles.css";
import App from "./App.jsx";
import Leads from "./pages/Leads.jsx";
import Sales from "./pages/Sales.jsx";
import Agents from "./pages/Agents.jsx";
import Report from "./pages/Report.jsx";
import Settings from "./pages/Settings.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import AddLeadForm from "./components/AddLeadForm.jsx";
import SalesAgentForm from "./components/SalesAgentForm.jsx";
import LeadStatusOverview from "./pages/LeadStatusOverview.jsx";
import LeadsBySalesAgent from "./pages/LeadsBySalesAgent.jsx";
import EditLeadForm from "./components/EditLeadForm.jsx";
import Deals from "./pages/Deals.jsx";

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
    path: "lead/leadDetails/:leadId",
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
  {
    path: "/lead/:id",
    element: <EditLeadForm />,
  },
  {
    path: "/deals",
    element: <Deals />,
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
