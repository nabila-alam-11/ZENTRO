import Sidebar from "./Sidebar";
import MenuIcon from "../assets/menu.png";
import "../css/addAgentForm.css";
import useAgentContext from "../contexts/AgentContext";
import { useState } from "react";

const SalesAgentForm = () => {
  const { addAgent } = useAgentContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAgent = {
      name: formData.name,
      email: formData.email,
    };
    try {
      await addAgent(newAgent);
      alert("Agent Added Successfully.");
    } catch (error) {
      console.log("Failed to add agent");
      alert("error adding agent");
    }
  };
  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main add-new-sales-agent-container">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="heading">New Sales Agent</h3>
        </div>
        <div className="line"></div>
        <form className="add-new-agent-form" onSubmit={handleSubmit}>
          <h2>Add New Sales Agent</h2>
          <div className="linee"></div>
          <label htmlFor="name">Agent Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email Address: </label>
          <input
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit" className="add-agent-button">
            Add Sales Agent
          </button>
        </form>
      </div>
    </div>
  );
};
export default SalesAgentForm;
