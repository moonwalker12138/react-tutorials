import React from "react";
import { REACT_BACKGROUND_COLOR, REACT_TEXT_COLOR } from "../Constants/Colors";
import logo from "../Images/logo192.png";

export const Header = () => {
    return (
        <div
            className="container-fluid mb-5 sticky-top"
            style={{ backgroundColor: REACT_BACKGROUND_COLOR }}
        >
            <div className="row justify-content-center">
                <div className="col-1">
                    <img src={logo} alt="" style={{width: "100%"}}/>
                </div>
                <div className="col-4">
                    <span
                        style={{
                            fontSize: "300%",
                            color: REACT_TEXT_COLOR,
                            fontFamily: "sans-serif",
                        }}
                    >
                        {"React Hooks"}
                    </span>
                </div>
            </div>
        </div>
    );
};
