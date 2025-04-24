import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const LeadDetails = () => {
  const { data, loading, error } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );
  const { leadId } = useParams();
  const findLead = data?.filter((lead) => lead._id === leadId);
};
export default LeadDetails;
