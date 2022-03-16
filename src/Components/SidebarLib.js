import React from "react";
import Sidebar from "react-sidebar";
import "./SidebarLib.css";
import * as FaIcons from "react-icons/fa";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { SiderbarLibStyle } from "./SidebarLibStyle";
import { ipcRenderer } from "electron";

class SidebarLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <div className="navbar">
            <ul className="list-items">
              {SidebarData.map((item, index) => (
                <li key={index} className={item.cName}>
                  <p onClick={item.onClick} className="li-items">
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>

            <Link to="#" className="menu-bars"></Link>
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={SiderbarLibStyle}
        shadow={true}
      >
        <button
          className="sidebar-btn"
          onClick={() => this.onSetSidebarOpen(true)}
        >
          <FaIcons.FaBars />
        </button>
      </Sidebar>
    );
  }
}

export default SidebarLib;
