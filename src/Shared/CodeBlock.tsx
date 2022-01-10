import React from "react";
import Highlight from "react-highlight";

export const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    return (
        <div className="h5" style={{ maxHeight: "200px" }}>
            <Highlight className="typescript">{code}</Highlight>
        </div>
    );
};
