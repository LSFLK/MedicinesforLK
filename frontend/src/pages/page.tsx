import React from "react";

import "./page.css";

interface PageProps {

}

export function Page(params: PageProps) {
    return (
        <div className="page">
            <aside className="sidebarContainer">
                <div className="sidebar">
                    <nav className="menu thin-scrollbar">
                        <div className="sidemenu_top">
                            <ul className="menu__list">
                                <li className="menu__list-item">
                                    <div className="menu__list-item-container">
                                        <a href="#" className="menu__link menu__link--sublist">Aid Packages</a>
                                    </div>
                                </li>
                                <li className="menu__list-item">
                                    <div className="menu__list-item-container">
                                        <a href="#" className="menu__link menu__link--sublist menu__link--active">Suppliers</a>
                                    </div>
                                </li>
                                <li className="menu__list-item">
                                    <div className="menu__list-item-container">
                                        <a href="#" className="menu__link menu__link--sublist">Needs</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="sidemenu_bottom">
                            <ul className="menu__list">
                                <li className="menu__list-item">
                                    <div className="menu__list-item-container">
                                        <a href="#" className="menu__link menu__link--sublist">Analytics</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>
        </div>
    );
}