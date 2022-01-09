import React, { Children, createContext, useContext, useState } from "react";
import { ILoggerRef } from "../../Shared/Logger";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";

interface IBaseCubeProps {
    componentName: string;
}

interface ILoggerContext {
    pageName: string;
    logger?: ILoggerRef | null;
}

const LoggerContext = createContext<ILoggerContext>({
    pageName: "",
});

const PageName = "UseContextDemoPage";

export const UseContextDemo = () => {
    return (
        <PageWrapper>
            <LoggerContext.Provider value={{ pageName: PageName }}>
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <Cube />
                        </div>
                    </div>
                </div>
            </LoggerContext.Provider>
        </PageWrapper>
    );
};

const Cube = () => {
    return (
        <div className="container border border-5 p-5">
            <h1 className="text-center mb-5">{PageName}</h1>
            <A />
        </div>
    );
};

const A = () => {
    return (
        <BaseCube componentName="A">
            <B />
        </BaseCube>
    );
};

const B = () => {
    return (
        <BaseCube componentName="B">
            <C />
        </BaseCube>
    );
};

const C = () => {
    return (
        <BaseCube componentName="C">
            <D />
        </BaseCube>
    );
};

const D = () => {
    return (
        <BaseCube componentName="D">
            <E />
        </BaseCube>
    );
};

const E = () => {
    return <BaseCube componentName="E" />;
};

const BaseCube: React.FC<IBaseCubeProps> = ({ componentName, children }) => {
    const { pageName } = useContext(LoggerContext);
    const { loggerRef } = useContext(RefContext);

    const onClick = () => {
        const content = `Component Name: ${componentName}, Page Name: ${pageName}`;
        // loggerRef?.current?.say(content);
    };

    return (
        <div className="container border border-5 p-5 rounded-2">
            <div className="row justify-content-between align-items-center">
                <div className="col">
                    <h2>{componentName}</h2>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={onClick}>
                        {"Log"}
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
};
