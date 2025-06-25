import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <h1>My Calendar App</h1>
      <img
        src="/ChatGPT Image Jun 25, 2025, 08_35_32 PM.png"  // Place your image in public/profile.jpg or update the path
        alt="Profile"
        className="topbar-profile"
      />
    </div>
  );
};

export default Topbar;
