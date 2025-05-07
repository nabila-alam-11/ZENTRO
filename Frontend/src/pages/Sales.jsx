import { useState } from "react";
import MenuIcon from "../assets/menu.png";
import "../css/sales.css";
import useFetch from "../useFetch";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader.jsx";

const Sales = () => {
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads"
  );
  console.log(loading);
  const [searchQuery, setSearchQuery] = useState("");

  const leads = data?.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main sales">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading">Sales Overview</h3>
        </div>
        {!loading ? (
          <>
            <div className="line"></div>
            <input
              placeholder="Search by lead..."
              type="text"
              className="search-by-lead"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />

            <div className="sales-container">
              {leads?.map((lead) => (
                <div key={lead._id} className="lead-data">
                  <h3>{lead.name}</h3>
                  <p className="budget">
                    <strong className="head">Budget: </strong> $ 6500
                  </p>
                  <p>Time To Close: {lead.timeToClose}</p>
                  <p>Sales Agent: {lead.salesAgent?.name}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
export default Sales;
