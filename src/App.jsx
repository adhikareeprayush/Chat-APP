import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const App = () => {
  const user = true;

  return (
    <Router>
      <div className="app">
        <div className="left">
          <List />
        </div>
        <div className="right">
          <Routes>
            <Route path="/" element={<Detail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </div>
      </div>
      <ToastContainer /> {/* Render the ToastContainer */}
    </Router>
  );
};

export default App;