/**
    * @description      : 
    * @author           : DHANUSH
    * @group            : 
    * @created          : 28/10/2025 - 13:00:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/10/2025
    * - Author          : DHANUSH
    * - Modification    : 
**/
import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [convs, setConvs] = useState([]);
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("conversations") || "[]");
    setConvs(existing);
  }, []);

  function viewConv(conv) {
    // show details in an alert for simplicity
    const lines = conv.messages.map(
      (m) =>
        `${m.from.toUpperCase()}: ${m.text}${
          m.from === "ai" && m.liked !== null
            ? " (" + (m.liked ? "liked" : "disliked") + ")"
            : ""
        }`
    );
    alert(
      lines.join("\n") +
        "\n\nRating: " +
        (conv.rating || "None") +
        "\nComment: " +
        (conv.comment || "")
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Past Conversations</h2>
      <div className="history-list">
        {convs.length === 0 && <div>No saved conversations yet.</div>}
        {convs.map((c) => (
          <div key={c.id} className="history-item">
            <div>
              <div style={{ fontWeight: 600 }}>
                Conversation {new Date(c.createdAt).toLocaleString()}
              </div>
              <div style={{ fontSize: 13, color: "#666" }}>
                {c.messages.length} messages • Rating: {c.rating || "—"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => viewConv(c)}>View</button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(c));
                  alert("Copied conversation JSON to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
