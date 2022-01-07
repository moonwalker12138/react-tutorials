import React, { createContext, RefObject, useRef } from "react";
import { CodeBlock } from "./CodeBlock";
import { ILoggerRef, Logger } from "./Logger";
import { Sidebar } from "./Sidebar";

interface IRefContext {
    loggerRef: RefObject<ILoggerRef> | null;
}

export const RefContext = createContext<IRefContext>({ loggerRef: null });

export const PageWrapper: React.FC<{}> = ({ children }) => {
    const loggerRef = useRef<ILoggerRef>(null);

    return (
        <RefContext.Provider value={{ loggerRef: loggerRef }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col">{children}</div>
                    <div className="col-2">
                        <Logger ref={loggerRef} />
                    </div>
                </div>
            </div>
        </RefContext.Provider>
    );
};
