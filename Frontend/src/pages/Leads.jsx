import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/menu.png";
import NoResult from "../assets/no-result.png";
import "../css/lead.styles.css";
import useFetch from "../useFetch";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const Leads = () => {
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

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
            <img src={MenuIcon} alt="menu" />
          </button>
          <h3 className="lead-heading">Lead List</h3>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="display-flex add-lead">
              <h3 className="lead-overview">
                Lead Overview ({filteredLeads.length})
              </h3>
              <Link to="/addLead">+ Add Lead</Link>
            </div>

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
                  <option value="">Sort By</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            {filteredLeads.length > 0 && (
              <div className="leads-headings">
                <div>Lead Name</div>
                <div>Status</div>
                <div>Priority</div>
                <div className="time">Time To Close</div>
                <div>Sales Agent</div>
                <div>Actions</div>
              </div>
            )}
            <div className="leads-container">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
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
                    <Link to={`/lead/leadDetails/${lead._id}`}>Details</Link>
                  </div>
                ))
              ) : (
                <div className="no-leads">
                  <img src={NoResult} />
                  <h3>No Leads Found</h3>
                  <p>We did not find any leads for your search.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leads;
