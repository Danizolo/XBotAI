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
import { useState, useRef, useEffect } from "react";
import sampleData from "./Data/sampleData.json";

const findResponse = (query) => {
  if (!query) return null;

  const q = query.trim().toLowerCase();
  let found = sampleData.find((s) => s.question.toLowerCase() === q);
  if (!found)
    found = sampleData.find((s) => q.includes(s.questions.toLowerCase()));
  if (!found) found = sampleData.find((s) => s.question.includes(q));

  return found ? found.response : "Sorry, Did not understand your query!";
};
function ChatPage() {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]); // {from:'user'|'ai', text, liked: null|true|false}
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [conversationSaved, setConversationSaved] = useState(false);

  useEffect(() => {
    // initial cards on home as example quick prompts
    if (messages.length === 0) {
      const quick = [
        "Hi, what is the weather",
        "Hi, what is my location",
        "Hi, what is the temperature",
        "Hi, how are you",
      ];
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const RATINGS = [1, 2, 3, 4, 5];

  const toggleLike = (id, val) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: val } : m))
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    const userMsg = {
      from: "user",
      text: q,
      id: Date.now() + Math.random(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const resp = findResponse(q);
      const aiMsg = {
        from: "ai",
        text: resp,
        id: Date.now() + Math.random(),
        liked: null,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 300);
  };
  const handleSave = () => {
    const conv = {
      id: Date.now(),
      messages,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("conversations") || "[]");
    existing.unshift(conv);
    localStorage.setItem("conversations", JSON.stringify(existing));
    setConversationSaved(true);
    alert("Conversation saved! You can view it at Past Conversation.");
  };

  return (
    <div className="chat-container">
      <div className="hero">
        <h2>How Can I Help You Today?</h2>
        <div style={{ fontSize: 28, marginTop: 8 }}>
          <span>Soul AI</span>
        </div>
      </div>

      <div className="cards" aria-hidden>
        <div className="card">
          Hi, what is the weather
          <br />
          <small>Get immediate AI generated response</small>
        </div>
        <div className="card">
          Hi, what is the location
          <br />
          <small>Get immediate AI generated response</small>
        </div>
        <div className="card">
          Hi, what is the temparature
          <br />
          <small>Get immediate AI generated response</small>
        </div>
        <div className="card">
          Hi, How are you
          <br />
          <small>Get immediate AI generated response</small>
        </div>
      </div>

      <div ref={scrollRef} className="chat-area" role="logo" aria-live="polite">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`message ${m.from === "user" ? "user" : "ai"}`}
          >
            {m.from === "ai" ? (
              <>
                <p>{m.text}</p>
              </>
            ) : (
              <div>{m.text}</div>
            )}

            {m.from === "ai" && (
              <div className="feedback-floater" aria-hidden>
                <button
                  onClick={() => toggleLike(m.id, true)}
                  className="feedback-btn"
                >
                  👍
                </button>

                <button
                  onClick={() => toggleLike(m.id, false)}
                  className="feedback-btn"
                >
                  👎
                </button>
              </div>
            )}

            {m.from === "ai" && m.liked !== null && (
              <div style={{ fontSize: 12, marginTop: 6 }}>
                {m.liked ? "You liked this answer" : "you disliked this answer"}
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="conversation-actions">
          <button type="submit" className="ask">
            Ask
          </button>
          <button type="submit" className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>

      <div
        style={{
          padding: 12,
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 6 }}>Rate this conversation:</div>
          <div className="rating" role="radiogroup" aria-label="Rating">
            {RATINGS.map((ele) => (
              <div
                key={ele}
                className="star"
                onClick={() => setRating(ele)}
                aria-checked={rating === ele}
                role="radio"
              >
                {ele <= rating ? "★" : "☆"}
              </div>
            ))}
          </div>

          <textarea
            placeholder="Share your thoughts..."
            style={{
              width: "100%",
              marginTop: 8,
              padding: 8,
              borderRadius: 6,
              border: "1px solid var(--border)",
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
