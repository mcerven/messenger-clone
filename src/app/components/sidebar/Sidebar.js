import React from 'react';
import './Sidebar.css';
import SidebarChannels from './SidebarChannels';
import SidebarHeader from './SidebarHeader';

function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarHeader />
            <SidebarChannels />
        </div>
    )
}

export default Sidebar;
