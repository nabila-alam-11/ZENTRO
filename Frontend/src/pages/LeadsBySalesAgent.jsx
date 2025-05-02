import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import "../css/leadListByAgent.styles.css";
import { useState } from "react";
import Loader from "../components/Loader";

const LeadsBySalesAgent = () => {
  const { agent } = useParams();
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads"
  );

  const [filterLeadByStatus, setFilterLeadByStatus] = useState("");
  const [filterByPriority, setFilterByPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const status = [...new Set(data?.map((lead) => lead.status))];
  const priority = [...new Set(data?.map((lead) => lead.priority))];

  const filteredAndSortedLeads = data
    ?.filter((lead) => lead.salesAgent?.name === agent)
    ?.filter((lead) =>
      filterLeadByStatus ? lead.status === filterLeadByStatus : true
    )
    ?.filter((lead) =>
      filterByPriority ? lead.priority === filterByPriority : true
    )
    ?.sort((a, b) => {
      if (sortOrder === "asc") return a.timeToClose - b.timeToClose;
      if (sortOrder === "desc") return b.timeToClose - a.timeToClose;
      return 0;
    });

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main agent-leads">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading">Leads by Sales Agent</h3>
        </div>
        <div className="line"></div>
        {!loading ? (
          <div className="lead-list-by-agent-container">
            <h2>Lead List by Agent</h2>
            <div className="filterAndSorted">
              <div>
                <select onChange={(e) => setFilterLeadByStatus(e.target.value)}>
                  <option value="">Filter by Status</option>
                  {status.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select onChange={(e) => setFilterByPriority(e.target.value)}>
                  <option value="">Filter by Priority</option>
                  {priority.map((p, index) => (
                    <option key={index} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Sort by Time to Close</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <h3 className="agent-name">
              Sales Agent: <span>{agent}</span>
            </h3>
            <div className="display-flex list-by-agent-heading">
              <h3>Lead Name</h3>
              <h3>Status</h3>
            </div>
            <div className="lead-list-by-agent">
              {filteredAndSortedLeads?.map((lead) => (
                <div className="display-flex list-by-agent" key={lead._id}>
                  <div>{lead.name}</div>
                  <div className="lead--status">{lead.status}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
export default LeadsBySalesAgent;
