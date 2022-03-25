import React from "react";
import Sidebar from "react-sidebar";
import "./SidebarLib.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { SiderbarLibStyle } from "./SidebarLibStyle";
import { ipcRenderer } from "electron";
import { FiSettings } from "react-icons/fi";
import logo from "../images/logo.png";

class SidebarLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
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
              <div sidebar-top>
                <img className="sidebar-logo" src={logo} />
                <h1 className="sidebar-heading"> Star Board</h1>
              </div>
              <hr />
              {SidebarData.map((item, index) => (
                <li key={index} className={item.cName}>
                  <p onClick={item.onClick} className="li-items">
                    {item.icon} {item.title}
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
