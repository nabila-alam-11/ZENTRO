import { createContext, useContext, useState } from "react";

const LeadContext = createContext();
const useLeadContext = () => useContext(LeadContext);
export default useLeadContext;

export function LeadProvider({ children }) {
  const [leadsData, setLeadsData] = useState([]);
  const [error, setError] = useState(null);

  const addLead = async (newLead) => {
    try {
      const response = await fetch(
        "https://anvaya-backend-theta.vercel.app/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLead),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add lead");
      }

      const addedLead = await response.json();
      setLeadsData((prevLeads) => [...prevLeads, addedLead]);
    } catch (err) {
      console.error("Error adding lead:", err);
      setError(err.message);
    }
  };

  return (
    <LeadContext.Provider value={{ leadsData, addLead, error }}>
      {children}
    </LeadContext.Provider>
  );
}
