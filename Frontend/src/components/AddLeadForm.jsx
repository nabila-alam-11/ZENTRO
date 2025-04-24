const AddLeadForm = () => {
  return (
    <form>
      <label htmlFor="nameInput">Name: </label>
      <input type="text" id="nameInput" />
      <label htmlFor="source">Source: </label>
      <select id="source">
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Cold Call">Cold Call</option>
        <option value="Adverstisement">Adverstisement</option>
      </select>
      <label htmlFor="status">Status: </label>
      <select id="status">
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Closed">Closed</option>
      </select>
      <label htmlFor="priority">Priority</label>
      <select id="priority">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </form>
  );
};
export default AddLeadForm;
