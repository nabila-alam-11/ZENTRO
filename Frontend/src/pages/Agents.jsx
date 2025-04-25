import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import "../agents.styles.css";
import useFetch from "../useFetch";

const Agents = () => {
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/agents"
  );

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading">Sales Agent Management</h3>
        </div>
        <div className="line"></div>
        <h3 className="sales-agent-list">Sales Agent List</h3>
        <div className="display-flex agent-list-headings">
          <h3>Name</h3>
          <h3>Email</h3>
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
              <button>Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Agents;
