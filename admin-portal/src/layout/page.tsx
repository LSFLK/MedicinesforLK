import React from "react";
import { NavLink } from "react-router-dom";

import "./page.css";

interface PageProps {
  children: React.ReactElement;
  className?: string;
}

export default function Page(props: PageProps) {
  const { children, className } = props;

  return (
    <div className="page">
      <aside className="sidebarContainer">
        <div className="sidebar">
          <nav className="menu thin-scrollbar">
            <div className="sidemenu_top">
              <ul className="menu__list">
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink
                      exact
                      to="/"
                      className="menu__link"
                      activeClassName="menu__link menu__link--active"
                    >
                      Aid Packages
                    </NavLink>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink
                      exact
                      to="/creation"
                      className="menu__link"
                      activeClassName="menu__link menu__link--active"
                    >
                      Create Aid Package
                    </NavLink>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink
                      exact
                      to="/supplierQuotationUpload"
                      className="menu__link"
                      activeClassName="menu__link menu__link--active"
                    >
                      Suppliers
                    </NavLink>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <NavLink
                      exact
                      to="/needUpload"
                      className="menu__link"
                      activeClassName="menu__link menu__link--active"
                    >
                      Needs
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
      <main className={`docMainContainer ${className}`}>{children}</main>
    </div>
  );
}
