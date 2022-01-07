import React, { Component, useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import "./UseStateDemo.css";
import { CodePosition, CodeWrapper } from "../../Shared/CodeWrapper";
import HareImg from "../../Images/Hare.png";
import TortoiseImg from "../../Images/Tortoise.png";
import { getRandomBoolean } from "../../Utils";

export const UseStateDemo = () => {
    return (
        <PageWrapper>
            <div className="container">
                <div className="row row-cols-1 gy-5">
                    <div className="col">
                        <Hare />
                    </div>
                    <div className="col">
                        <Tortoise />
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

    return (
        <CodeWrapper code={codeA}>
            <div className="blueCircle center relative">
                <span className="largeText">{count}</span>
                <i className="bi bi-plus-circle plusIcon" onClick={onClick}></i>
            </div>
        </CodeWrapper>
    );
};
`;

const Hare = () => {
    const [count, setCount] = useState(0);
    const onClick = () => {
        if (count === 10) return;
        const step = getRandomBoolean() ? 2 : 0;
        setCount(count + step);
    };

    return (
        // <CodeWrapper code={codeA} position={CodePosition.TopRight}>
            <Player img={HareImg} count={count} onClick={onClick} />
            // <div className="center relative" >
            //         <span className="largeText">{count}</span>
            //         <i className="bi bi-plus-circle plusIcon" onClick={onClick}></i>
            // </div>
        // </CodeWrapper>
    );
};

const codeB = `
interface ISate {
    count: number;
}

class B extends Component<{}, ISate> {
    constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }

    render(): React.ReactNode {
        const onClick = () => this.setState({ count: this.state.count + 1 });

        return (
            <CodeWrapper code={codeB}>
                <div className="orangeCircle center relative">
                    <span className="largeText">{this.state.count}</span>
                    <i
                        className="bi bi-plus-circle plusIcon"
                        onClick={onClick}
                    ></i>
                </div>
            </CodeWrapper>
        );
    }
}
`;

interface ISate {
    count: number;
}

class Tortoise extends Component<{}, ISate> {
    constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }

    render(): React.ReactNode {
        const onClick = () => this.setState({ count: this.state.count + 1 });

        return (
            // <CodeWrapper code={codeB} position={CodePosition.TopRight}>
                <Player img={TortoiseImg} count={this.state.count} onClick={onClick} />
                // <div className="orangeCircle center relative">
                //     <span className="largeText">{this.state.count}</span>
                //     <i
                //         className="bi bi-plus-circle plusIcon"
                //         onClick={onClick}
                //     ></i>
                // </div>
            // </CodeWrapper>
        );
    }
}

interface IProgressProps {
    count: number;
    percentage: number;
}

const Progress: React.FC<IProgressProps> = ({count, percentage}) => {
    const percentageStr = (percentage * 100).toFixed(2) + "%";

    return (
        <div className="progress" style={{height: "100px"}}>
            <div className="progress-bar" role="progressbar" style={{width: percentageStr}} aria-valuenow={percentage * 100} aria-valuemin={0} aria-valuemax={100}>
                <h3>
                    {`${count}`}
                </h3>
            </div>
        </div>
    );
};

interface IPlayerProps {
    img: string;
    count: number;
    onClick: () => void;
}

const Player: React.FC<IPlayerProps> = ({img, count, onClick}) => {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">
                    <img src={img} alt="" style={{opacity: 0.7, width: "100%"}}/>
                </div>
                <div className="col">
                    <div className="container">
                        <div className="row row-cols-1 align-items-center">
                            <div className="col">
                                <Progress count={count} percentage={count / 10} />
                            </div>
                            <div className="col">
                                <i className="bi bi-forward" style={{fontSize: "5rem"}} onClick={onClick}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
