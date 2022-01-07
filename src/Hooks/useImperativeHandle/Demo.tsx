import { Button, Flex } from "@fluentui/react-northstar";
import React, { useImperativeHandle, useRef } from "react";

interface ChildRef {
    changeColor: () => void;
}

export const Demo = () => {
    const ref = useRef<ChildRef>(null);

    return (
        <div>
            <Child ref={ref} />
            <Button
                style={{ width: "20px", height: "20px" }}
                onClick={ref.current?.changeColor}
            />
        </div>
    );
};

const Child = React.forwardRef<ChildRef>((props, ref) => {
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        changeColor: () => {
            divRef.current!.style.background = "red";
        },
    }));

    return (
        <Flex>
            <div ref={divRef}>{"#1"}</div>
            <div>{"#2"}</div>
            <div>{"#3"}</div>
        </Flex>
    );
});
