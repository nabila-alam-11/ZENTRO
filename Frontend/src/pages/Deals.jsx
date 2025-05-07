import MenuIcon from "../assets/menu.png";
import "../css/deals.css";
import useFetch from "../useFetch";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const Deals = () => {
  const { data, loading } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  const newDeals = data?.filter((lead) => lead.status === "New");
  const contacted = data?.filter((lead) => lead.status === "Contacted");
  const proposalSent = data?.filter((lead) => lead.status === "Proposal Sent");
  const closed = data?.filter((lead) => lead.status === "Closed");
  const qualified = data?.filter((lead) => lead.status === "Qualified");
  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading deal-heading">Deals</h3>
        </div>
        {!loading ? (
          <div className="deals-container">
            {/* New */}
            <div className="dd">
              <h3 className="deals-heading">New</h3>
              {newDeals.map((lead) => (
                <div key={lead._id} className="deals">
                  <h3>{lead.name}</h3>
                  <h3>$ 60,000</h3>
                  <p>Agent: {lead.salesAgent?.name}</p>
                  <div className="tags-box">
                    {lead.tags?.map((tag, index) => (
                      <p key={index} className="tag">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Contacted */}
            <div className="dd">
              <h3 className="deals-heading">Contacted</h3>
              {contacted.map((lead) => (
                <div key={lead._id} className="deals">
                  <h3>{lead.name}</h3>
                  <h3>$ 60,000</h3>
                  <p>Agent: {lead.salesAgent?.name}</p>
                  <div className="tags-box">
                    {lead.tags?.map((tag, index) => (
                      <p key={index} className="tag">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Qualified */}
            <div className="dd">
              <h3 className="deals-heading">Qualified</h3>
              {qualified.map((lead) => (
                <div key={lead._id} className="deals">
                  <h3>{lead.name}</h3>
                  <h3>$ 60,000</h3>
                  <p>Agent: {lead.salesAgent?.name}</p>
                  <div className="tags-box">
                    {lead.tags?.map((tag, index) => (
                      <p key={index} className="tag">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Proposal Sent */}
            <div className="dd">
              <h3 className="deals-heading">Proposal Sent</h3>
              {proposalSent.map((lead) => (
                <div key={lead._id} className="deals">
                  <h3>{lead.name}</h3>
                  <h3>$ 60,000</h3>
                  <p>Agent: {lead.salesAgent?.name}</p>
                  <div className="tags-box">
                    {lead.tags?.map((tag, index) => (
                      <p key={index} className="tag">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Closed */}
            <div className="dd">
              <h3 className="deals-heading">Closed</h3>
              {closed.map((lead) => (
                <div key={lead._id} className="deals">
                  <h3>{lead.name}</h3>
                  <h3>$ 60,000</h3>
                  <p>Agent: {lead.salesAgent?.name}</p>
                  <div className="display-flex tags-box">
                    {lead.tags?.map((tag, index) => (
                      <p key={index} className="tag">
                        {tag}
                      </p>
                    ))}
                  </div>
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
export default Deals;
