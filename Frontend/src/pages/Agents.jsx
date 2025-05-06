import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import "../css/agents.styles.css";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import NoResult from "../assets/no-result.png";

const Agents = () => {
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/agents"
  );

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="agents-container">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading">Sales Agent Management</h3>
        </div>
        <div className="line"></div>
        {!loading ? (
          <>
            <div className="display-flex add-agent">
              <h3 className="sales-agent-list">Sales Agent List</h3>
              <Link to="/addAgent" className="add-agent-link">
                + Add Sales Agent
              </Link>
            </div>
            {data?.length != 0 ? (
              <div>
                <div className="display-flex agent-list-headings">
                  <h3>Name</h3>
                  <h3 className="email">Email</h3>
                  <h3>Actions</h3>
                </div>
                <div className="agent-list-container">
                  {data?.map((agent) => (
                    <div key={agent._id} className="display-flex agent-list">
                      <div>
                        <p>{agent.name}</p>
                      </div>
                      <div>
                        <p>{agent.email}</p>
                      </div>
                      <Link to={`/leads/${agent.name}`}>Details</Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-leads">
                <img src={NoResult} />
                <h3>No Leads Found</h3>
                <p>We did not find any leads for your search.</p>
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
export default Agents;
