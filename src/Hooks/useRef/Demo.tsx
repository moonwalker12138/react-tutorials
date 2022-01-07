import React, { useRef } from "react";
import { useEffect } from "react";

const Demo = () => {
    const ref = useRef<HTMLDivElement>(null); // Create ref

    useEffect(() => {
        console.log("Mount...");
        setTimeout(() => {
            console.log("Update...");
            ref.current!.innerHTML = "Hello"; // Manipulate DOM directly through ref
        }, 3000);
    });

    console.log("Render...");
    return (
        <div ref={ref}>
            {" "}
            {/* Bind ref variable to a specific DOM node */}
            {"useRef demo"}
        </div>
    );
};
