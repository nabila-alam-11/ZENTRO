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
  const { data: agents } = useFetch(
    "https://anvaya-backend-theta.vercel.app/agents"
  );

  const lead = leads?.find((lead) => lead._id === id);

  const [name, setName] = useState(lead?.name || "");
  const [source, setSource] = useState(lead?.source || "");
  const [salesAgent, setSalesAgent] = useState(lead?.salesAgent?._id || "");
  const [status, setStatus] = useState(lead?.status || "");
  const [timeToClose, setTimeToClose] = useState(lead?.timeToClose || 0);
  const [priority, setPriority] = useState(lead?.priority || "Medium");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setSource(lead.source);
      setSalesAgent(lead.salesAgent?._id);
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
        salesAgent,
        status,
        timeToClose,
        priority,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
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
        {success && <p className="success">Lead updated successfully</p>}
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

          <label htmlFor="salesAgent">Sales Agent: </label>
          <select
            id="salesAgent"
            value={salesAgent}
            onChange={(e) => setSalesAgent(e.target.value)}
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
