import React, { createContext, RefObject, useRef } from "react";
import { IBillboardRef, Billboard } from "./Billboard";
// import { ILoggerRef, Logger as Billboard } from "./Logger3";
import { Sidebar } from "./Sidebar";

interface IRefContext {
    loggerRef: RefObject<IBillboardRef> | null;
}
interface IPageWrapperProps {
    showBillboard?: boolean;
}

export const RefContext = createContext<IRefContext>({ loggerRef: null });

export const PageWrapper: React.FC<IPageWrapperProps> = ({ showBillboard=true, children }) => {
    const loggerRef = useRef<IBillboardRef>(null);

    return (
        <RefContext.Provider value={{ loggerRef: loggerRef }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto">
                        <Sidebar />
                    </div>
                    <div className="col">{children}</div>
                    {showBillboard && 
                        <div className="col-3">
                            <Billboard ref={loggerRef} />
                        </div>
                    }
                </div>
            </div>
        </RefContext.Provider>
    );
};
