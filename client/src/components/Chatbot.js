import React from 'react';
import '../App.css';

function Sidebar() {
  return (
    <div className=''>
      <input
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <p>User: {userPrompt}</p>
        <p>AI: {reply}</p>
      </div>
    </div>
  );
};

export default Sidebar;