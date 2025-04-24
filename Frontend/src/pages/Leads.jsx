import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import useFetch from "../useFetch";
import "../lead.styles.css";
import { Link } from "react-router-dom";

const Leads = () => {
  const { data, loading, error } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  console.log(data.salesAgent?.name);

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="heading">Lead Overview ({data.length})</h3>
        </div>
        <div className="line"></div>
        {/* Container 1 */}
        <div className="lead-heading"></div>
        <div className="leads-container">
          {data?.map((lead) => (
            <div key={lead._id} className="leads-list">
              <p className="lead-name">{lead.name}</p>
              <p>{lead.status}</p>
              <p>{lead.priority}</p>
              <p className="lead-time">{lead.timeToClose}</p>
              <p>{lead.salesAgent?.name}</p>
              <Link>Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Leads;
