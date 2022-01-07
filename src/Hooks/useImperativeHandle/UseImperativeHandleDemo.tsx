import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { APPLE_RAINBOW_COLORS } from "../../Constants/Colors";
import { PageWrapper } from "../../Shared/PageWrapper";
import { useUpdateRefs } from "../../Utils";

interface IChildRef {
    changeColor: () => void;
}

export const UseImperativeHandleDemo = () => {
    return (
        <PageWrapper>
            <Parent />
        </PageWrapper>
    );
};

const Parent: React.FC<{}> = () => {
    const [count, setCount] = useState(0);
    const childRef = useRef<IChildRef>(null);

    const onClick = () => {
        childRef.current?.changeColor();
        console.log("YF childRef ", childRef.current);
    };

    useUpdateRefs();

    return (
        <div className="container border border-5 p-3 rounded-2">
            <div className="row justify-content-between align-items-center">
                <div className="col-4">
                    <h2>{"Parent"}</h2>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={onClick}>
                        {"Change color"}
                    </button>
                </div>
            </div>
            <Child ref={childRef} />
        </div>
    );
};

const Child = React.forwardRef<IChildRef>((_props, ref) => {
    const [index, setIndex] = useState(0);

    const backgroundColor =
        APPLE_RAINBOW_COLORS[index % APPLE_RAINBOW_COLORS.length];

    const changeColor = () => {
        setIndex(index + 1);
    };

    useImperativeHandle(ref, () => ({
        changeColor: changeColor,
    }));

    return (
        <div
            className="container border border-5 myContainer"
            style={{
                height: "400px",
                width: "50%",
                backgroundColor: backgroundColor,
            }}
        >
            <div className="row justify-content-between align-items-center">
                <div className="col-4">
                    <h2>{"Child"}</h2>
                </div>
                <div className="col-3">
                    <h5>{`count: ${index}`}</h5>
                </div>
                <div className="col-3">
                    <button className="btn btn-primary" onClick={changeColor}>
                        {"Change color"}
                    </button>
                </div>
            </div>
        </div>
    );
});
