import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./page.css";

interface PageProps {
  children: React.ReactElement;
}

export function Page(props: PageProps) {
  const { children } = props;

  return (
    <div className="page">
      <aside className="sidebarContainer">
        <div className="sidebar">
          <nav className="menu thin-scrollbar">
            <div className="sidemenu_top">
              <ul className="menu__list">
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink exact to="/" className="menu__link" activeClassName="menu__link menu__link--active">
                      Home
                    </NavLink>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink exact to={"/creation"} className="menu__link" activeClassName="menu__link menu__link--active">
                      Aid Packages
                    </NavLink>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink exact to="/suppliers" className="menu__link" activeClassName="menu__link menu__link--active">
                      Suppliers
                    </NavLink>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink exact to="/needsupload" className="menu__link" activeClassName="menu__link menu__link--active">
                      Needs
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
            <div className="sidemenu_bottom">
              <ul className="menu__list">
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink exact to="/analytics" className="menu__link" activeClassName="menu__link menu__link--active">
                      Analytics
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
      <main className="docMainContainer">{children}</main>
    </div>
  );
}
