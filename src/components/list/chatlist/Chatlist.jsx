import { useState } from 'react';
import './chatlist.css';
import AddUser from './addUser/addUser';

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chatlist-container">
      <div className="search-bar">
        <div className="search-input">
          <img src="/search.png" alt="Search" />
          <input type="text" placeholder="Search" />
        </div>
        <button
          className={`add-button ${addMode ? 'active' : ''}`}
          onClick={() => setAddMode(prev => !prev)}
        >
          {addMode ? '-' : '+'}
        </button>
      </div>
      <div className="chatlist-items">
        <div className="chatlist-item">
          <img src="./avatar.png" alt="Avatar" />
          <div className="text-content">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="chatlist-item">
          <img src="./avatar.png" alt="Avatar" />
          <div className="text-content">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="chatlist-item">
          <img src="./avatar.png" alt="Avatar" />
          <div className="text-content">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default Chatlist;
