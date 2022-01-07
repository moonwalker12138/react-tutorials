import React, { Component, useContext, useEffect, useState } from "react";
import { CodePosition, CodeWrapper } from "../../Shared/CodeWrapper";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { useForceUpdate, useUpdateRefs } from "../../Utils";

export const UseEffectDemo = () => {
    useUpdateRefs();

    return (
        <PageWrapper>
            <div className="container">
                <div className="row row-cols-1 gy-5">
                    <div className="col">
                        <A />
                    </div>
                    <div className="col">
                        <B />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const codeA = `
const A = () => {
    const [count, setCount] = useState(0);
    const onClick = () => setCount(count + 1);
    const {loggerRef} = useContext(RefContext);

    useEffect(() => {
        const logger = loggerRef?.current;
        logger?.logging(\`[A] Open the session with ID \${count}\`);
        return () => {
            logger?.logging(\`[A] Close the session with ID \${count}\`);
        }
    }, [count, loggerRef]);

    return (
        <CodeWrapper code={codeA} position={CodePosition.TopRight}>
            <div className="blueCircle center relative">
                <span className="largeText">{count}</span>
                <i className="bi bi-plus-circle plusIcon" onClick={onClick}></i>
            </div>
        </CodeWrapper>
    );
};
`;

const A = () => {
    const [count, setCount] = useState(0);
    const onClick = () => setCount(count + 1);
    const {loggerRef} = useContext(RefContext);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const logger = loggerRef?.current;
        logger?.logging(`[A] Open the session with ID ${count}`);
        return () => {
            logger?.logging(`[A] Close the session with ID ${count}`);
        }
    }, [count]);

    return (
        <CodeWrapper code={codeA} position={CodePosition.TopRight}>
            <div className="blueCircle center relative">
                <span className="largeText">{count}</span>
                <i className="bi bi-plus-circle plusIcon" onClick={onClick}></i>
                {/* <i className="bi bi-arrow-clockwise refreshIcon" onClick={undefined}></i> */}
            </div>
        </CodeWrapper>
    );
};

interface ISate {
    count: number;
}

class B extends Component<{}, ISate> {
    static contextType = RefContext;

    constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }

    componentDidMount() {
        console.log("YF mount ", this.context.loggerRef?.current);
        // const logger = this.context.loggerRef?.current;
        this.context.loggerRef?.current?.logging(`[B] Open the session with ID ${this.state.count}`);
    }

    componentDidUpdate(_prevProps: {}, prevState: ISate) {
        const logger = this.context.loggerRef?.current;
        if (prevState.count !== this.state.count) {
            logger?.logging(`[B] Close the session with ID ${prevState.count}`);
            logger?.logging(`[B] Open the session with ID ${this.state.count}`);
        }
    }

    componentWillUnmount() {

    }

    render(): React.ReactNode {
        const onClick = () => this.setState({ count: this.state.count + 1 });

        return (
            <CodeWrapper code={""} position={CodePosition.TopRight}>
                <div className="orangeCircle center relative">
                    <span className="largeText">{this.state.count}</span>
                    <i
                        className="bi bi-plus-circle plusIcon"
                        onClick={onClick}
                    ></i>
                    {/* <i className="bi bi-arrow-clockwise refreshIcon" onClick={() => this.setState({count: this.state.count})}></i> */}
                </div>
            </CodeWrapper>
        );
    }
}
