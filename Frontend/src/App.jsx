import Sidebar from "../components/sidebar";
import MenuIcon from "../src/assets/menu.png";
import Lead from "../src/assets/lead.png";
import Report from "../src/assets/checklist-task-budget.png";
import Deals from "../src/assets/trust-alt.png";
import useFetch from "./useFetch";
import { useState } from "react";

const App = () => {
  const { data, loading, error } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  const leads = [...new Set(data?.map((lead) => lead.status))];

  // Priority
  const [selectedPriority, setSelectedPriority] = useState("High");
  const filteredPriority = data?.filter(
    (lead) => lead.priority === selectedPriority
  );

  const handlePriority = (priority) => {
    setSelectedPriority(priority);
    console.log(priority);
  };
  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="heading">Dashboard</h3>
        </div>
        <div className="line"></div>
        {/* container 1 */}
        <div className="display-flex container">
          <div>
            <h3>Monthly Forecast</h3>
            <p className="price">$220,0000</p>
            <p className="detail">Projected for this month</p>
          </div>
          <div>
            <h3>Deals Closed</h3>
            <p className="price">$60,000</p>
            <p className="detail">Active agents • 12 on active deals</p>
          </div>
          <div>
            <h3>Pipeline Status</h3>
            <p className="price">$1,081,000</p>
            <p className="detail">Active leads • 13 leads in pipeline</p>
          </div>
        </div>
        {/* Container 2  */}
        <div className="container-2">
          <h1>Lead Status Overview</h1>
          <div className="display-flex leads">
            {leads?.map((lead, index) => {
              const count = data?.filter((l) => l.status === lead).length || 0;
              return (
                <div className="lead-status" key={index}>
                  <h4>{lead}</h4>
                  <p>{count}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Container 3 */}
        <div className="container-3">
          <h1>Quick Actions</h1>
          <div className="display-flex actions">
            <div className="action">
              <div className="icon-wrapper">
                <img src={Lead} />
              </div>
              <h3>New Lead</h3>
              <p>Add new prospect</p>
            </div>
            <div className="action">
              <div className="icon-wrapper">
                <img src={Report} />
              </div>
              <h3>See Reports</h3>
              <p>View earnings</p>
            </div>
            <div className="action">
              <div className="icon-wrapper">
                <img src={Deals} />
              </div>
              <h3>View Deals</h3>
              <p>Search for new deals</p>
            </div>
          </div>
        </div>
        {/* Container 4 */}
        <div className="container-4">
          <h1>Quick Filters</h1>
          <div className="priority display-flex">
            <div className="priority-buttons">
              <button
                className="high"
                onClick={() => handlePriority("High")}
                type="button"
                style={{
                  backgroundColor:
                    selectedPriority === "High"
                      ? "rgb(224, 10, 10)"
                      : "rgb(245, 242, 242)",
                  color: selectedPriority === "High" ? "white" : "black",
                }}
              >
                High
              </button>
              <button
                className="medium"
                onClick={() => handlePriority("Medium")}
                style={{
                  backgroundColor:
                    selectedPriority === "Medium"
                      ? "goldenrod"
                      : "rgb(245, 242, 242)",
                  color: selectedPriority === "Medium" ? "white" : "black",
                }}
              >
                Medium
              </button>
              <button
                onClick={() => handlePriority("Low")}
                className="low"
                style={{
                  backgroundColor:
                    selectedPriority === "Low"
                      ? "#06275c"
                      : "rgb(245, 242, 242)",
                  color: selectedPriority === "Low" ? "white" : "black",
                }}
              >
                Low
              </button>
            </div>
            <h3>High Priority Leads</h3>
          </div>
          <div>
            {filteredPriority?.map((lead) => (
              <div className="display-flex filtered-priority" key={lead._id}>
                <h3>
                  {lead.name} ({lead.source})
                </h3>
                <button
                  style={{
                    backgroundColor:
                      selectedPriority === "High"
                        ? "rgb(224, 10, 10)"
                        : selectedPriority === "Medium"
                        ? "goldenrod"
                        : "#06275c",
                    color: "white",
                  }}
                >
                  {lead.priority}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
