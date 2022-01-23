import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import "./CodeWrapper.css";

export enum CodePosition {
    TopRight = "TopRight",
    BottomLeft = "BottomLeft",
}

interface ICodeWrapperProps {
    code: string;
    position: CodePosition;
}

export const CodeWrapper: React.FC<ICodeWrapperProps> = ({
    code,
    position,
    children,
}) => {
    const [showCode, setShowCode] = useState(false);
    const toggle = () => setShowCode(!showCode);

    switch (position) {
        case CodePosition.TopRight:
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="wrapper">
                                <i
                                    className="bi bi-code-slash codeIcon topRight"
                                    onClick={toggle}
                                ></i>
                                {children}
                            </div>
                        </div>
                        <div className="col-8">
                            {showCode && <CodeBlock code={code} />}
                        </div>
                    </div>
                </div>
            );
        case CodePosition.BottomLeft:
            return (
                <div className="container">
                    <div className="row row-cols-1 gy-5">
                        <div className="col">
                            <div className="wrapper">
                                <i
                                    className="bi bi-code-slash codeIcon bottomLeft"
                                    onClick={toggle}
                                ></i>
                                {children}
                            </div>
                        </div>
                        <div className="col">
                            {showCode && <CodeBlock code={code} />}
                        </div>
                    </div>
                </div>
            );
        default:
            return <></>;
    }
};
