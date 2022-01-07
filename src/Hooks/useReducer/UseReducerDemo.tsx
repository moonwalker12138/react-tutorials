import React, { useReducer } from "react";
import { CodePosition, CodeWrapper } from "../../Shared/CodeWrapper";
import { PageWrapper } from "../../Shared/PageWrapper";

enum ActionType {
    Like = "Like",
    Dislike = "Dislike",
}

interface IState {
    positiveCount: number;
    positiveRatio: number;
    negativeCount: number;
    negativeRatio: number;
    totalCount: number;
}

interface IAction {
    type: ActionType;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case ActionType.Like:
            return {
                positiveCount: state.positiveCount + 1,
                negativeCount: state.negativeCount,
                totalCount: state.totalCount + 1,
                positiveRatio:
                    ((state.positiveCount + 1) / (state.totalCount + 1)) ,
                negativeRatio:
                    (state.negativeCount / (state.totalCount + 1)) ,
            };
        case ActionType.Dislike:
            return {
                positiveCount: state.positiveCount,
                negativeCount: state.negativeCount + 1,
                totalCount: state.totalCount + 1,
                positiveRatio:
                    (state.positiveCount / (state.totalCount + 1)) ,
                negativeRatio:
                    ((state.negativeCount + 1) / (state.totalCount + 1)) ,
            };
        default:
            return state;
    }
};

const code = `
enum ActionType {
    Like = "Like",
    Dislike = "Dislike",
}

interface IState {
    positiveCount: number;
    positiveRatio: number;
    negativeCount: number;
    negativeRatio: number;
    totalCount: number;
}

interface IAction {
    type: ActionType;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case ActionType.Like:
            return {
                positiveCount: state.positiveCount + 1,
                negativeCount: state.negativeCount,
                totalCount: state.totalCount + 1,
                positiveRatio:
                    ((state.positiveCount + 1) / (state.totalCount + 1)) ,
                negativeRatio:
                    (state.negativeCount / (state.totalCount + 1)) ,
            };
        case ActionType.Dislike:
            return {
                positiveCount: state.positiveCount,
                negativeCount: state.negativeCount + 1,
                totalCount: state.totalCount + 1,
                positiveRatio:
                    (state.positiveCount / (state.totalCount + 1)) ,
                negativeRatio:
                    ((state.negativeCount + 1) / (state.totalCount + 1)) ,
            };
        default:
            return state;
    }
};

export const UseReducerDemo = () => {
    const [state, dispatch] = useReducer(reducer, {
        positiveCount: 0,
        positiveRatio: 0,
        negativeCount: 0,
        negativeRatio: 0,
        totalCount: 0,
    });

    const onLike = () => {
        dispatch({ type: ActionType.Like });
    };

    const onDislike = () => {
        dispatch({ type: ActionType.Dislike });
    };

    return (
        <PageWrapper>
            <CodeWrapper code="as" position={CodePosition.BottomLeft}>
                <LabeledProgress label={"Like"} count={state.positiveCount} percentage={state.positiveRatio} />
                <LabeledProgress label={"Dislike"} count={state.negativeCount} percentage={state.negativeRatio} />
                <Feedback onLike={onLike} onDislike={onDislike} />
            </CodeWrapper>
        </PageWrapper>
    );
};
`;

export const UseReducerDemo = () => {
    const [state, dispatch] = useReducer(reducer, {
        positiveCount: 0,
        positiveRatio: 0,
        negativeCount: 0,
        negativeRatio: 0,
        totalCount: 0,
    });

    const onLike = () => {
        dispatch({ type: ActionType.Like });
    };

    const onDislike = () => {
        dispatch({ type: ActionType.Dislike });
    };

    return (
        <PageWrapper>
            <CodeWrapper code={code} position={CodePosition.BottomLeft}>
                <LabeledProgress label={"Like"} count={state.positiveCount} percentage={state.positiveRatio} />
                <LabeledProgress label={"Dislike"} count={state.negativeCount} percentage={state.negativeRatio} />
                <Feedback onLike={onLike} onDislike={onDislike} />
            </CodeWrapper>
        </PageWrapper>
    );
};

interface IFeedbackProps {
    onLike: () => void;
    onDislike: () => void;
}

const Feedback: React.FC<IFeedbackProps> = ({onLike, onDislike}) => {
    return (
        <div className="container">
            <div className="row justify-content-end">
                <div className="col-1">
                    <button
                        className="btn btn-outline-primary"
                        onClick={onLike}
                    >
                        <h2>
                            <i className="bi bi-hand-thumbs-up"></i>
                        </h2>
                    </button>
                </div>
                <div className="col-1">
                    <button
                        className="btn btn-outline-primary"
                        onClick={onDislike}
                    >
                        <h2>
                            <i className="bi bi-hand-thumbs-down"></i>
                        </h2>
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ILabeledProgressProps extends IProgressProps {
    label: string;
}

const LabeledProgress: React.FC<ILabeledProgressProps> = ({label, count, percentage}) => {
    return (
        <div className="container mb-3">
            <div className="row">
                <div className="col-2 h1" style={{lineHeight: "100px"}}>
                    {label}
                </div>
                <div className="col">
                    <Progress count={count} percentage={percentage} />
                </div>
            </div>
        </div>
    );
};

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
                    {`${count} (${percentageStr})`}
                </h3>
            </div>
        </div>
    );
};
