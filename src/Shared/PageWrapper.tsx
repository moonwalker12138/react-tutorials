import React, { createContext, RefObject, useRef } from "react";
import { ILoggerRef, Billboard } from "./Billboard";
// import { ILoggerRef, Logger as Billboard } from "./Logger3";
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
                    <div className="col-auto">
                        <Sidebar />
                    </div>
                    <div className="col">{children}</div>
                    <div className="col-3">
                        <Billboard ref={loggerRef} />
                    </div>
                </div>
            </div>
        </RefContext.Provider>
    );
};
