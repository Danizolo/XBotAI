/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 28/10/2025 - 16:08:01
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 28/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
/**
 * @description      : Displays list of past saved conversations
 * @author           : DHANUSH
 * @created          : 28/10/2025
 */

import { useEffect, useState } from "react";

function HistoryPage() {
  const [conversations, setConversations] = useState([]);

  // ✅ Load from localStorage (persistent)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations") || "[]");
    setConversations(saved);
  }, []);

  return (
    <div className="history-container">
      <h2>Past Conversations</h2>
      {conversations.length === 0 ? (
        <p>No saved conversations found.</p>
      ) : (
        <div className="history-list">
          {conversations.map((conv) => (
            <div key={conv.id} className="history-card">
              <div className="history-header">
                <strong>Conversation ID:</strong> {conv.id}
                <br />
                <small>
                  {new Date(conv.createdAt).toLocaleString() || "Unknown date"}
                </small>
              </div>

              <div className="history-messages">
                {conv.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`message ${m.from === "user" ? "user" : "ai"}`}
                  >
                    {m.from === "ai" ? <p>{m.text}</p> : <div>{m.text}</div>}
                    {m.from === "ai" && m.liked !== null && (
                      <small>{m.liked ? "👍 Liked" : "👎 Disliked"}</small>
                    )}
                  </div>
                ))}
              </div>

              <div className="history-feedback">
                <p>
                  <strong>Rating:</strong> {conv.rating || "Not rated"}
                </p>
                {conv.comment && (
                  <p>
                    <strong>Feedback:</strong> {conv.comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
