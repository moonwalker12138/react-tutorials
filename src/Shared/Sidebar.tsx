import React from "react";
import { REACT_BACKGROUND_COLOR, REACT_TEXT_COLOR } from "../Constants/Colors";
import { UrlInfo } from "../Constants/UrlInfo";
import { HookNames } from "../Constants/HookNames";
import { useLocation, useNavigate } from "react-router";

export const Sidebar = () => {
    const navItems = [
        { name: HookNames.UseState, url: UrlInfo.UseState },
        { name: HookNames.UseReducer, url: UrlInfo.UseReducer },
        { name: HookNames.UseEffect, url: UrlInfo.UseEffect },
        { name: HookNames.UseLayoutEffect, url: UrlInfo.UseLayoutEffect },
        { name: HookNames.UseContext, url: UrlInfo.UseContext },
        { name: HookNames.UseRef, url: UrlInfo.UseRef },
        {
            name: HookNames.UseImperativeHandle,
            url: UrlInfo.UseImperativeHandle,
        },
        { name: HookNames.UseMemo, url: UrlInfo.UseMemo },
        { name: HookNames.UseCallback, url: UrlInfo.UseCallback },
        { name: HookNames.CustomHooks, url: UrlInfo.CustomHooks },
        { name: HookNames.UseDebugValue, url: UrlInfo.UseDebugValue },
    ];

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style={{ width: "280px", backgroundColor: REACT_BACKGROUND_COLOR }}
        >
            <NavHeader />
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {navItems.map((navItem) => (
                    <NavItem hookName={navItem.name} url={navItem.url} />
                ))}
            </ul>
        </div>
    );
};

const NavHeader = () => {
    const navigate = useNavigate();
    const onClick = () => navigate(UrlInfo.Home);

    return (
        <button
            className="btn d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            onClick={onClick}
        >
            <span className="fs-4">{"Home"}</span>
        </button>
    );
};

interface INavItemProps {
    hookName: HookNames;
    url: UrlInfo;
}

const NavItem: React.FC<INavItemProps> = ({ hookName, url }) => {
    const navigate = useNavigate();
    const onClick = () => navigate(url);
    const currentUrl = useLocation().pathname;

    return (
        <li className="nav-item">
            <button
                className={`btn nav-link text-white ${
                    currentUrl === url && "active"
                }`}
                onClick={onClick}
            >
                {hookName}
            </button>
        </li>
    );
};
