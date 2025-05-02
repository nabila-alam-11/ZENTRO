import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect } from "react";
import useFetch from "../useFetch";
import "../css/report.css";
import SimpleShimmerDashboard from "../components/SimpleShimmerDashboard";
import Loader from "../components/Loader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Report = () => {
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  useEffect(() => {
    return () => {
      // On unmount, destroy all active charts
      ChartJS.instances &&
        Object.values(ChartJS.instances).forEach((chart) => {
          chart.destroy();
        });
    };
  }, []);

  // Total Leads closed and in Pipeline
  const statusCount = data?.reduce((acc, item) => {
    const status = item.status === "Closed" ? "Closed" : "In Pipeline";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#16a7e0", "#ba0f9e"],
        borderWidth: 1,
      },
    ],
  };

  // Leads Status Distribution
  const statusDistributionCount = data?.reduce((acc, item) => {
    const status = item.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusDistributionData = {
    labels: Object.keys(statusDistributionCount),
    datasets: [
      {
        data: Object.values(statusDistributionCount),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#ebd234",
          "#1b4f33",
          "#4f2eab",
          "#ab2e8e",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Leads Closed by Sales Agent
  const allAgents = Array.from(
    new Set(data?.map((lead) => lead?.salesAgent?.name || "Unknown Agent"))
  );

  const closedLeadCounts = data
    ?.filter((lead) => lead.status === "Closed")
    .reduce((acc, lead) => {
      const agentName = lead.salesAgent?.name || "Unknown Agent";
      acc[agentName] = (acc[agentName] || 0) + 1;
      return acc;
    }, {});

  const finalLeadCounts = allAgents.reduce((acc, agent) => {
    acc[agent] = closedLeadCounts[agent] || 0;
    return acc;
  }, {});

  const closedLeadBarChart = {
    labels: Object.keys(finalLeadCounts),
    datasets: [
      {
        label: "Leads Closed",
        data: Object.values(finalLeadCounts),
        backgroundColor: ["#36A2EB"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main report">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} alt="Menu" />
          </button>
          <h3 className="lead-heading">CRM Reports</h3>
        </div>
        {!loading ? (
          <div>
            <h2 className="r-heading">Report Overview</h2>
            <div className="pie-chart-container">
              <p className="pie-chart-heading">
                Total Leads closed and in Pipeline
              </p>
              <Pie data={chartData} />
            </div>
            <div className="leads-closed-chart">
              <p className="pie-chart-heading">Leads Closed by Sales Agent</p>
              <Bar data={closedLeadBarChart} />
            </div>
            <div className="lead-status-distribution-chart">
              <p className="pie-chart-heading">Lead Status Distribution</p>
              <Pie data={statusDistributionData} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Report;
