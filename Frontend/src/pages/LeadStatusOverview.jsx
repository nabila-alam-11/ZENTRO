import { useState } from "react";
import { useParams } from "react-router-dom";
import MenuIcon from "../assets/menu.png";
import NoResult from "../assets/no-result.png";
import "../css/leadListByStatus.styles.css";
import useFetch from "../useFetch";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const LeadStatusOverview = () => {
  const { leadStatus } = useParams();

  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  const leads = data?.filter((lead) => lead.status === leadStatus);
  const priority = [...new Set(data?.map((lead) => lead.priority))];
  const agents = [...new Set(data?.map((lead) => lead.salesAgent?.name))];

  const [filterByAgent, setFilterByAgent] = useState("");
  const [filterByPriority, setFilterByPriority] = useState("");
  const [sortTimeToClose, setSortTimeToClose] = useState("");

  const filterAndSortedArray = leads
    ?.filter((lead) =>
      filterByAgent ? lead.salesAgent?.name === filterByAgent : true
    )
    ?.filter((lead) =>
      filterByPriority ? lead.priority === filterByPriority : true
    )
    ?.sort((a, b) => {
      if (sortTimeToClose === "asc") return a.timeToClose - b.timeToClose;
      if (sortTimeToClose === "desc") return b.timeToClose - a.timeToClose;
      return 0;
    });

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main lead_list_status">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="heading">Lead by Status</h3>
        </div>
        <div className="line"></div>
        <div className="lead-list-by-status">
          <h2>Lead List by Status</h2>
          {!loading ? (
            <div>
              <h3>
                Status: <span className="ss">{leadStatus}</span>
              </h3>
              <div className="filterAndSorted">
                <div>
                  <select onChange={(e) => setFilterByAgent(e.target.value)}>
                    <option value="">Filter by Sales Agent</option>
                    {agents?.map((agent, index) => (
                      <option value={agent} key={index}>
                        {agent}
                      </option>
                    ))}
                  </select>
                  <select onChange={(e) => setFilterByPriority(e.target.value)}>
                    <option value="">Filter by Priority</option>
                    {priority?.map((p, index) => (
                      <option value={p} key={index}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <select onChange={(e) => setSortTimeToClose(e.target.value)}>
                  <option value="">Sort by Time to Close</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              {filterAndSortedArray.length != 0 ? (
                <div>
                  <div className="display-flex lead-by-status-heading">
                    <h3>Lead Name</h3>
                    <h3>Sales Agent</h3>
                  </div>
                  <div className="lead-by-status-container">
                    {filterAndSortedArray?.map((lead) => (
                      <div key={lead._id} className="lead-by-status">
                        <p>{lead.name}</p>
                        <p>{lead.salesAgent?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-leads no-result">
                  <img src={NoResult} />
                  <h3>No Leads Found</h3>
                  <p>We did not find any leads for your search.</p>
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
export default LeadStatusOverview;
