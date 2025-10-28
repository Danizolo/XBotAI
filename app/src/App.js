/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 28/10/2025 - 11:48:59
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 28/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "./index.css";
import { Routes, Route, Link } from "react-router-dom";
import ChatPage from "./ChatPage.js";
import HistoryPage from "./HistoryPage.js";
import FeedbacksPage from "./FeedbacksPage.js";

function App() {
  return (
    <div className="App">
      <aside className="sidebar">
        <div className="logo">
          <Link to="/"> New Chat</Link>
          <Link to="/history">Past Conversations</Link>
          <Link to="/feedbacks"> All Feedbacks</Link>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>XBOT-AI</h1>
        </header>

        <Routes>
          <Route path="/" element={<ChatPage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/feedbacks" element={<FeedbacksPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
