import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import useFetch from "../useFetch";
import "../lead.styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Leads = () => {
  const { data, loading, error } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  // Search & filters by Lead
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLeads = data?.filter((lead) => {
    const matchesSearch = lead.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? lead.priority === priorityFilter
      : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading">Lead List</h3>
        </div>
        <h3 className="lead-overview">Lead Overview ({data.length})</h3>

        <div className="filters">
          <input
            placeholder="Search by lead..."
            className="searchLead"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="status-priority">
            <select
              id="filterByStatus"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">Filter By Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
            <select
              id="sortByPriority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">Sort By </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        {/* Container 1 */}
        <div className="leads-headings">
          <div>Lead Name</div>
          <div>Status</div>
          <div>Priority</div>
          <div className="time">Time To Close</div>
          <div>Sales Agent</div>
          <div>Actions</div>
        </div>
        <div className="leads-container">
          {filteredLeads?.map((lead) => (
            <div key={lead._id} className="leads-list">
              <div>
                <p className="lead-name">{lead.name}</p>
              </div>
              <div>
                <p>{lead.status}</p>
              </div>
              <div>
                <p>{lead.priority}</p>
              </div>
              <div>
                <p className="lead-time">{lead.timeToClose}</p>
              </div>
              <div>
                <p>{lead.salesAgent?.name}</p>
              </div>
              <Link to={`/lead/${lead._id}`}>Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Leads;
