import { useState } from "react";
import MenuIcon from "../assets/menu.png";
import "../css/addAgentForm.css";
import Sidebar from "./Sidebar";
import useAgentContext from "../contexts/AgentContext";

const SalesAgentForm = () => {
  const [success, setSuccess] = useState(false);

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

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);

      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      console.log("Failed to add agent");
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
        {success && (
          <p className="success">
            {formData.name ? formData.name : "Sales Agent"} added successfully
          </p>
        )}
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
