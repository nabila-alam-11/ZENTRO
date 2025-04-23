import Sidebar from "../components/sidebar";
import MenuIcon from "../src/assets/menu.png";
import useFetch from "./useFetch";

const App = () => {
  const { data, loading, error } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  const leads = [...new Set(data?.map((lead) => lead.status))];

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
      </div>
    </div>
  );
};
export default App;
