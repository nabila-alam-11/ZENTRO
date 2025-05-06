import { createContext, useContext, useState } from "react";

const LeadContext = createContext();
const useLeadContext = () => useContext(LeadContext);
export default useLeadContext;

export function LeadProvider({ children }) {
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
      return addedLead;
    } catch (err) {
      console.error("Error adding lead:", err);
      setError(err.message);
    }
  };

  const editLead = async (id, updatedData) => {
    try {
      const response = await fetch(
        `https://anvaya-backend-theta.vercel.app/leads/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      console.log(updatedData);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("API error details: ", errorData);
        throw new Error(
          errorData.message ||
            `Failed to update lead..... Status: ${response.status}`
        );
      }
      const updatedLead = await response.json();
      return updatedLead;
    } catch (err) {
      console.log("Error editing lead: ", err);
      setError(err.message);
      throw err;
    }
  };

  return (
    <LeadContext.Provider value={{ addLead, error, editLead }}>
      {children}
    </LeadContext.Provider>
  );
}
