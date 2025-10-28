/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 28/10/2025 - 12:10:45
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 28/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import React, { useState, useEffect } from "react";

function FeedbacksPage() {
  const [convs, setConvs] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("conversations") || "[]");
    setConvs(existing);
  }, []);

  const feedbacks = convs.filter((c) => !filter || c.raging === filter);
  return (
    <div style={{ padding: 24 }}>
      <h2>All Feedbacks</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Filter by rating: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(Number(e.target.value))}
        >
          <option value={0}>All</option>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {feedbacks.length === 0 && <div>No feedbacks found.</div>}
        {feedbacks.map((f) => (
          <div
            key={f.id}
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 8,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              Conversation on {new Date(f.createdAt).toLocaleString()}
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>
              Rating: {f.rating || "—"}
            </div>
            <div style={{ marginTop: 8 }}>{f.comment || <i>No comment</i>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbacksPage;
