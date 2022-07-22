import React from "react";

import { ChatIcon, ExitIcon, HomeIcon, MarketIcon, SearchIcon, SettingsIcon } from "icons";

import "./style.sass"

const SideMenu = () => (
    <div className="side-menu">
        <div className="side-menu__nav">
            <button 
                className="side-menu__button">
                    <HomeIcon/>
            </button>
            <button 
                className="side-menu__button is_active">
                    <MarketIcon/>
            </button>
            <button 
                className="side-menu__button">
                    <SearchIcon/>
            </button>
        </div>
        <div className="side-menu__nav">
            <button 
                className="side-menu__button">
                    <SettingsIcon/>
            </button>
            <button 
                className="side-menu__button">
                    <ChatIcon/> 
            </button>
            <button 
                className="side-menu__button">
                    <ExitIcon/>
            </button>
        </div>
    </div>
)

export { SideMenu };