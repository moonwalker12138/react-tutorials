import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { APPLE_RAINBOW_COLORS } from "../../Constants/Colors";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import "./UseCallbackDemo.css";
import VivaInsightsLogo from "../../Images/VivaInsightsLogo.svg";
import VivaInsightsLogo32 from "../../Images/VivaInsightsLogo32.png";
import Hare from "../../Images/Hare.png";
import Tortoise from "../../Images/Tortoise.png";
import { sleep, useLogging } from "../../Utils";
import { CodePosition, CodeWrapper } from "../../Shared/CodeWrapper";

export const UseCallbackDemo = () => {
    return (
        <PageWrapper>
            <CodeWrapper code={"ajsdlf"} position={CodePosition.BottomLeft}>
                <Parent />
            </CodeWrapper>
        </PageWrapper>
    );
};

const Parent = () => {
    const { loggerRef } = useContext(RefContext);

    const [count, setCount] = useState(0);
    const onChangeColor = () => setCount(count + 1);

    const [img, setImg] = useState(Hare);

    const [enableUseCallback, setEnableUseCallback] = useState(false);
    const onToggleHook = () => {
        setEnableUseCallback(!enableUseCallback);
        const content = enableUseCallback
            ? "< Disable useCallback >"
            : "< Enable useCallback >";
        // loggerRef?.current?.say(content);
    };

    const cb = (img: string) => setImg(img);
    const cb1 = useCallback(cb, []);
    const callback = enableUseCallback ? cb1 : cb;

    const backgroundColor =
        APPLE_RAINBOW_COLORS[count % APPLE_RAINBOW_COLORS.length];

    return (
        <div
            className="container p-5 rounded-4"
            style={{ backgroundColor: backgroundColor, height: "600px" }}
        >
            <div className="row">
                <div className="col-auto">
                    <div className="d-flex flex-column justify-content-start">
                        <h2>
                            <i
                                className="bi bi-palette"
                                onClick={onChangeColor}
                            ></i>
                        </h2>
                        <h2>
                            <img src={img} alt="" style={{ width: "32px" }} />
                        </h2>
                        <h2>
                            <i
                                className={`bi ${
                                    enableUseCallback
                                        ? "bi-toggle-on"
                                        : "bi-toggle-off"
                                }`}
                                onClick={onToggleHook}
                            ></i>
                        </h2>
                    </div>
                </div>
                <div className="col-auto ">
                    <Child callback={callback} />
                </div>
            </div>
        </div>
    );
};

const Child: React.FC<{ callback: (img: string) => void }> = React.memo(
    ({ callback }) => {
        useLogging("Render child component");

        const [isHare, setIsHare] = useState(true);
        const onClick = () => {
            setIsHare(!isHare);
            callback(isHare ? Tortoise : Hare);
        };

        if (!isHare) {
            sleep(2000);
        }

        return (
            <div
                style={{
                    border: "dotted 2px",
                    padding: "10px",
                    width: "1050px",
                }}
            >
                <div className="d-flex justify-content-center mb-3">
                    <img
                        src={isHare ? Hare : Tortoise}
                        alt=""
                        style={{
                            opacity: 0.7,
                            height: "400px",
                            filter: "invert(100%)",
                        }}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <h2>
                        <i
                            className="bi bi-arrow-right-circle"
                            onClick={onClick}
                        ></i>
                    </h2>
                </div>
            </div>
        );
    }
);

export default UseCallbackDemo;
