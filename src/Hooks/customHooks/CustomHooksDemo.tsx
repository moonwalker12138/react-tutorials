import React, { Component, useContext, useState } from "react";
import { APPLE_RAINBOW_COLORS } from "../../Constants/Colors";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import {
    useForceUpdate,
    useMountEffect,
    useUnmountEffect,
    useUpdateEffect,
} from "../../Utils";

export const CustomHooksDemo = () => {
    return (
        <PageWrapper>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <Parent />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const Parent = () => {
    const [shouldShowChild, setShouldShowChild] = useState(false);

    return (
        <div className="container border p-3">
            <div className="row">
                <div className="col">
                    <h1>{"Parent"}</h1>
                </div>
                <div className="col">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShouldShowChild(!shouldShowChild)}
                    >
                        <h4>{shouldShowChild ? "Hide child" : "Show child"}</h4>
                    </button>
                </div>
            </div>
            {shouldShowChild && <Child2 />}
        </div>
    );
};

const Child = () => {
    const logger = useContext(RefContext).loggerRef?.current;
    const [index, setIndex] = useState(0);
    const forceUpdate = useForceUpdate();

    const backgroundColor =
        APPLE_RAINBOW_COLORS[index % APPLE_RAINBOW_COLORS.length];

    // const isInitialMount = useRef(true);
    // useEffect(() => {
    // 	if (isInitialMount.current) {
    // 		logger?.logging("Child mounted");
    // 		isInitialMount.current = false;
    // 	} else {
    // 		logger?.logging("Child updated");
    // 	}

    // 	return () => {
    // 		logger?.logging("Child cleanup");
    // 	};
    // }, [index]);

    // useMountEffect(() => logger?.say("Mounted"));
    // useUpdateEffect(() => logger?.say("Updated"));
    // useUnmountEffect(() => logger?.say("Unmounted"));

    return (
        <div
            className="container border p-3"
            style={{ backgroundColor: backgroundColor }}
        >
            <div className="row">
                <div className="col">
                    <h2>{"Child"}</h2>
                </div>
                <div className="col">
                    <button
                        className="btn btn-primary"
                        onClick={() => setIndex(index + 1)}
                    >
                        <h5>{"Change color"}</h5>
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={forceUpdate}>
                        <h5>{"Force update"}</h5>
                    </button>
                </div>
            </div>
        </div>
    );
};

class Child2 extends Component<{}, { index: number }> {
    static contextType = RefContext;

    constructor(props: {}) {
        super(props);
        this.state = { index: 0 };
    }

    componentDidMount() {
        const logger = this.context.loggerRef?.current;
        logger?.logging("Child mounted");
    }

    componentDidUpdate() {
        const logger = this.context.loggerRef?.current;
        logger?.logging("Child updated");
    }

    componentWillUnmount() {
        const logger = this.context.loggerRef?.current;
        logger?.logging("Child unmounted");
    }

    render(): React.ReactNode {
        const backgroundColor =
            APPLE_RAINBOW_COLORS[
                this.state.index % APPLE_RAINBOW_COLORS.length
            ];

        return (
            <div
                className="container border p-3"
                style={{ backgroundColor: backgroundColor }}
            >
                <div className="row">
                    <div className="col">
                        <h2>{"Child"}</h2>
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({ index: this.state.index + 1 })
                            }
                        >
                            <h5>{"Change color"}</h5>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
