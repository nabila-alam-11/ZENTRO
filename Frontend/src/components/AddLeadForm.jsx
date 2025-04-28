import useFetch from "../useFetch";

const AddLeadForm = () => {
  const { data } = useFetch("https://anvaya-backend-theta.vercel.app/agents");

  return (
    <form>
      <label htmlFor="nameInput">Lead Name: </label>
      <input type="text" id="nameInput" />
      <br />
      <br />
      <label htmlFor="source">Source: </label>
      <select id="source">
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Cold Call">Cold Call</option>
        <option value="Adverstisement">Adverstisement</option>
      </select>
      <br />
      <br />
      <label htmlFor="agentInput">Sales Agent: </label>
      <select id="agentInput">
        <option value="">--Sales Agent--</option>
        {data?.map((agent) => (
          <option value={agent.name} key={agent._id}>
            {agent.name}
          </option>
        ))}
      </select>

      <br />
      <br />
      <label htmlFor="status">Status: </label>
      <select id="status">
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Closed">Closed</option>
      </select>
      <br />
      <br />
      <label htmlFor="priority">Priority</label>
      <select id="priority">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <br />
      <br />
    </form>
  );
};
export default AddLeadForm;
