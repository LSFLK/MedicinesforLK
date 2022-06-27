import React from "react";
import { PageSelection } from "../types/pages";

import "./page.css";

interface PageProps {
  children: React.ReactElement;
  selection: PageSelection;
}

export function Page(props: PageProps) {
  const { children, selection } = props;

  let homeClassName =
    selection === PageSelection.HOME
      ? "menu__link menu__link--active"
      : "menu__link";
  let packagesClassName =
    selection === PageSelection.PACKAGE_CREATION
      ? "menu__link menu__link--active"
      : "menu__link";
  let supplierClassName =
    selection === PageSelection.UPLOAD_SUPPLIERS
      ? "menu__link menu__link--active"
      : "menu__link";
  let needsClassName =
    selection === PageSelection.UPLOAD_NEEDS
      ? "menu__link menu__link--active"
      : "menu__link";

  return (
    <div className="page">
      <aside className="sidebarContainer">
        <div className="sidebar">
          <nav className="menu thin-scrollbar">
            <div className="sidemenu_top">
              <ul className="menu__list">
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <a href="/" className={homeClassName}>
                      Home
                    </a>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <a href="/creation" className={packagesClassName}>
                      Aid Packages
                    </a>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <a href="#" className={supplierClassName}>
                      Suppliers
                    </a>
                  </div>
                </li>
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <a href="/needsupload" className={needsClassName}>
                      Needs
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="sidemenu_bottom">
              <ul className="menu__list">
                <li className="menu__list-item">
                  <div className="menu__list-item-container">
                    <a href="#" className="menu__link">
                      Analytics
                    </a>
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
