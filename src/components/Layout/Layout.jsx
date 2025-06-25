import React from 'react';
import Sidebar from '../Sidebar/SideBar';
import Topbar from '../Topbar/TopBar';
import MainContent from '../MainContent/MainContent';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <MainContent />
      </div>
    </div>
  );
};

export default Layout;
