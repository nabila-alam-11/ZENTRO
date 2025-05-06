import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import useFetch from "../useFetch";
import useLeadContext from "../contexts/LeadContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditLeadForm = () => {
  const { id } = useParams();
  const { data: leads } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads"
  );

  const lead = leads?.find((lead) => lead._id === id);

  const allTags = leads
    ?.map((lead) => lead.tags)
    .reduce((acc, tags) => acc.concat(tags), []);

  const uniqueTags = Array.from(new Set(allTags));

  const allAgents = [...new Set(leads?.map((lead) => lead.salesAgent?.name))];

  const [name, setName] = useState(lead?.name || "");
  const [source, setSource] = useState(lead?.source || "");
  const [tag, setTag] = useState(lead?.tags?.[0] || "");
  const [salesAgent, setSalesAgent] = useState(lead?.salesAgent?.name || "");
  const [status, setStatus] = useState(lead?.status || "");
  const [timeToClose, setTimeToClose] = useState(lead?.timeToClose || 0);
  const [priority, setPriority] = useState(lead?.priority || "Medium");

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setSource(lead.source);
      setTag(lead.tags?.[0]);
      setSalesAgent(lead.salesAgent?.name);
      setStatus(lead.status);
      setTimeToClose(lead.timeToClose);
      setPriority(lead.priority);
    }
  }, [lead]);

  const { editLead } = useLeadContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editLead(id, {
        name,
        source,
        tags: [tag],
        salesAgent,
        status,
        timeToClose,
        priority,
      });
    } catch (error) {
      console.log("Edit lead failed:", error.message);
    }
  };

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} alt="menu" />
          </button>
          <h3 className="lead-heading">Edit Lead</h3>
        </div>
        <form id="add-lead" onSubmit={handleSubmit}>
          <h2>Edit Lead</h2>
          <div className="linee"></div>

          <label htmlFor="nameInput" className="label">
            Lead Name:
          </label>
          <input
            type="text"
            id="name"
            className="input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="source">Lead Source: </label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
          </select>

          <label htmlFor="tags">Tags: </label>
          <select
            id="tags"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">Select..</option>
            {uniqueTags?.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <label htmlFor="salesAgent">Sales Agent: </label>
          <select
            id="salesAgent"
            value={salesAgent}
            onChange={(e) => setSalesAgent(e.target.value)}
          >
            <option value="">--Sales Agent--</option>
            {allAgents?.map((agent, index) => (
              <option key={index} value={agent}>
                {agent}
              </option>
            ))}
          </select>

          <label htmlFor="status">Status: </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={timeToClose}
            onChange={(e) => setTimeToClose(e.target.value)}
          />
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button type="submit" className="add-lead-button">
            Save
          </button>
        </form>{" "}
      </div>
    </div>
  );
};
export default EditLeadForm;
