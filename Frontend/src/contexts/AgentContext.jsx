import { createContext, useContext } from "react";

const AgentContext = createContext();

const useAgentContext = () => useContext(AgentContext);
export default useAgentContext;

export function AgentProvider({ children }) {
  const addAgent = async (newAgent) => {
    try {
      const response = await fetch(
        "https://anvaya-backend-theta.vercel.app/agents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAgent),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add agent.");
      }
      const addedAgent = await response.json();
      return addedAgent;
    } catch (error) {
      console.log("Error adding agent:", error);
    }
  };
  return (
    <AgentContext.Provider value={{ addAgent }}>
      {children}
    </AgentContext.Provider>
  );
}
