import { Button, Flex } from "@fluentui/react-northstar";
import React, { useCallback, useState } from "react";

interface IProps {
    callback: () => void;
}

const UseCallbackDemo = () => {
    const [count, setCount] = useState(0);

    // const callback = useCallback(() => {
    // 	console.log("Button clicked");
    // }, []);
    const callback = () => {
        console.log("Button clicked");
    };

    return (
        <Flex>
            <Button
                onClick={() => setCount(count + 1)}
            >{`Count: ${count}`}</Button>
            <MemoChild callback={callback} />
            {/* <Child callback={callback} /> */}
        </Flex>
    );
};

const Child = (props: IProps) => {
    console.log("Child component re-render");

    return <Button onClick={props.callback}>{"Click"}</Button>;
};

const MemoChild = React.memo(Child);
