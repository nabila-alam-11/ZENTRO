import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Sidebar from "../components/Sidebar";
import MenuIcon from "../assets/menu.png";
import "../css/leadDetail.styles.css";

const LeadDetails = () => {
  const { data: leads } = useFetch(
    "https://anvaya-backend-theta.vercel.app/leads",
    []
  );

  const { leadId } = useParams();
  const leadData = leads?.filter((lead) => lead._id === leadId);

  const { data: comments } = useFetch(
    `https://anvaya-backend-theta.vercel.app/leads/${leadId}/comments`
  );

  return (
    <div className="display-flex">
      <Sidebar />
      <div className="main">
        <div className="display-flex navigation">
          <button className="menu-icon">
            <img src={MenuIcon} />
          </button>
          <h3 className="lead-heading">Lead Management: {leadData[0]?.name}</h3>
        </div>
        <div className="line"></div>
        <div className="lead-details display-flex">
          <h3>Lead Details</h3>
          <button>Edit Lead Details</button>
        </div>
        <div className="lead-details-box">
          <div className="data">
            <p className="data-heading">
              <strong>Lead Name</strong>
            </p>
            <p>{leadData[0]?.name}</p>
          </div>
          <div className="data">
            <p className="data-heading">
              <strong>Sales Agent</strong>
            </p>
            <p>{leadData[0]?.salesAgent?.name}</p>
          </div>
          <div className="data">
            <p className="data-heading">
              <strong>Lead Source</strong>
            </p>
            <p>{leadData[0]?.source}</p>
          </div>
          <div className="data">
            <p className="data-heading">
              <strong>Lead Status</strong>
            </p>
            <p>{leadData[0]?.status}</p>
          </div>
          <div className="data">
            <p className="data-heading">
              <strong>Priority</strong>
            </p>
            <p>{leadData[0]?.priority}</p>
          </div>
          <div className="data">
            <p className="data-heading">
              <strong>Time to Close</strong>
            </p>
            <p>{leadData[0]?.timeToClose}</p>
          </div>
        </div>
        {/* COMMENTS */}
        <div className="comments">
          <h3>Comments: </h3>
          <textarea
            className="comment-textarea"
            rows={8}
            placeholder="Add a new comment..."
          ></textarea>
          <button>Add Comment</button>
          <div className="comments-box">
            <div className="comment-text">
              {comments?.map((comment) => {
                const date = new Date(comment.createdAt);
                const formatted = date.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                });
                return (
                  <div key={comment._id} className="box">
                    <div className="display-flex comment-d">
                      <p>
                        <strong>{comment.author?.name} </strong>
                      </p>
                      <p> – </p>
                      <p className="formatted">{formatted}</p>
                    </div>
                    <p className="comment-t">{comment.commentText}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeadDetails;
