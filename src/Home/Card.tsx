import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface IProps {
    title: string;
    link: string;
    style?: CSSProperties;
}

export const Card: React.FC<IProps> = ({ title, link, style }) => {
    const navigate = useNavigate();

    return (
        <div
            className="container btn border"
            onClick={() => navigate(link)}
            style={{ fontFamily: "Comic Sans MS", ...style }}
        >
            <div className="row align-items-center" style={{ height: "200px" }}>
                <div className="col">
                    <h1 className="my-auto">{title}</h1>
                </div>
            </div>
        </div>
    );
};
