import useFetch from "../useFetch";
import "../css/addLeadForm.css";
import Sidebar from "./Sidebar";
import MenuIcon from "../assets/menu.png";
import useLeadContext from "../contexts/LeadContext";
import { useState } from "react";
import Select from "react-select";

const AddLeadForm = () => {
  const { data: agents } = useFetch(
    "https://anvaya-backend-theta.vercel.app/agents"
  );
  const { data: leads } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads"
  );

  const { addLead } = useLeadContext();

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    source: "Website",
    tags: [],
    salesAgent: "",
    status: "New",
    priority: "Medium",
    timeToClose: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLead = {
      name: formData.name,
      source: formData.source,
      tags: Array.isArray(formData.tags)
        ? formData.tags.map((tag) => tag.value)
        : [],
      salesAgent: formData.salesAgent,
      status: formData.status,
      priority: formData.priority,
      timeToClose: formData.timeToClose,
    };

    try {
      await addLead(newLead);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 1000);

      setFormData({
        name: "",
        source: "Website",
        tags: [],
        salesAgent: "",
        status: "New",
        priority: "Medium",
        timeToClose: 1,
      });
    } catch (error) {
      console.error("Failed to add lead", error);
      alert("Error adding lead!");
    }
  };

  const allTags = leads
    ?.map((lead) => lead.tags)
    .reduce((acc, tags) => acc.concat(tags), []);

  const uniqueTags = Array.from(new Set(allTags));

  const tagOptions = uniqueTags?.map((tag) => ({
    value: tag,
    label: tag,
  }));

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main leadForm">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} alt="Menu" />
          </button>
          <h3 className="lead-heading">Add Lead</h3>
        </div>
        {success && <p className="success">Lead added successfully</p>}
        <form id="add-lead" onSubmit={handleSubmit}>
          <h2>Add New Lead</h2>
          <div className="linee"></div>

          <label htmlFor="nameInput" className="label">
            Lead Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="source">Lead Source: </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
          </select>

          <label htmlFor="tags">Tags: </label>
          <Select
            isMulti
            id="tags"
            name="tags"
            options={tagOptions}
            value={formData.tags}
            onChange={(selectedOptions) => {
              setFormData((prevData) => ({
                ...prevData,
                tags: selectedOptions || [],
              }));
            }}
          ></Select>

          <label htmlFor="salesAgent">Sales Agent: </label>
          <select
            id="salesAgent"
            name="salesAgent"
            value={formData.salesAgent}
            onChange={handleChange}
          >
            <option value="">--Sales Agent--</option>
            {agents?.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>

          <label htmlFor="status">Status: </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
          <label htmlFor="timeToClose">Time to Close</label>
          <input
            id="timeToClose"
            type="number"
            name="timeToClose"
            value={formData.timeToClose}
            onChange={handleChange}
          />
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="submit" className="add-lead-button">
            Add Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeadForm;
