import Lead from "../assets/lead (1).png";
import Agent from "../assets/user-headset.png";
import Dashboard from "../assets/dashboard.png";
import Report from "../assets/newspaper.png";
import Settings from "../assets/settings.png";
import Sales from "../assets/chart-line-up.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>ANVAYA</h3>
      <div className="line"></div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={Dashboard} />
            <span style={{ color: "#fff" }}>Dashboard</span>
          </NavLink>
        </li>

        <li className="">
          <NavLink
            to="/leads"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={Lead} />
            <span style={{ color: "#fff" }}>Leads</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/sales"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={Sales} />
            <span style={{ color: "#fff" }}>Sales</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/agents"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={Agent} />
            <span style={{ color: "#fff" }}>Agents</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={Report} />
            <span style={{ color: "#fff" }}>Report</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={Settings} />
            <span style={{ color: "#fff" }}>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
