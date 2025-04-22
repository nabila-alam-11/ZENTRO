import Lead from "../src/assets/lead (1).png";
import Agent from "../src/assets/user-headset.png";
import Dashboard from "../src/assets/dashboard.png";
import Report from "../src/assets/newspaper.png";
import Settings from "../src/assets/settings.png";
import Sales from "../src/assets/chart-line-up.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>ANVAYA</h3>
      <div className="line"></div>
      <h4>CLIENTS</h4>
      <ul>
        <li className="active">
          <img src={Dashboard} />
          Dashboard
        </li>
        <li>
          <img src={Lead} />
          Leads
        </li>
        <li>
          <img src={Sales} />
          Sales
        </li>
        <li>
          <img src={Agent} />
          Agents
        </li>
        <li>
          <img src={Report} />
          Reports
        </li>
        <li>
          <img src={Settings} />
          Settings
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
