import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const CommentContext = createContext();
const useCommentContext = () => useContext(CommentContext);
export default useCommentContext;

export function CommentProvider({ children }) {
  const [commentsData, setCommentsData] = useState([]);

  const { leadId } = useParams();
  const addComment = async (newComment) => {
    try {
      const response = await fetch(
        `https://anvaya-backend-theta.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add comment.");
      }
      const addedComment = await response.json();
      setCommentsData((prevComments) => [...prevComments, addedComment]);
    } catch (error) {
      console.error("Error adding comment:", err);

      console.log(error.message);
    }
  };

  return (
    <CommentContext.Provider value={{ addComment }}>
      {children}
    </CommentContext.Provider>
  );
}
