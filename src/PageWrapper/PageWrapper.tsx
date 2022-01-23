import React, { createContext, RefObject, useRef, useState } from "react";
import { Game } from "../Shared/Game";
import { IBillboardRef, Billboard } from "./Billboard";
import { Code } from "./Code";
import { ConfigContext, DefaultConfig, IConfig } from "./Config";
import { Sidebar } from "./Sidebar";

interface IRefContext {
    loggerRef: RefObject<IBillboardRef> | null;
}

export const RefContext = createContext<IRefContext>({ loggerRef: null });

interface IPageWrapperProps {
    initialConfig?: IConfig;
}

export const PageWrapper: React.FC<IPageWrapperProps> = ({
    initialConfig = DefaultConfig,
}) => {
    const loggerRef = useRef<IBillboardRef>(null);
    const [config, setConfig] = useState(initialConfig);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            <RefContext.Provider value={{ loggerRef }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-auto">
                            <Sidebar />
                        </div>
                        <div className="col">
                            <Game />
                            <Code />
                        </div>
                        <div
                            className="col-4"
                            style={{
                                visibility: initialConfig.pageWrapper
                                    .showBillboard
                                    ? "visible"
                                    : "hidden",
                            }}
                        >
                            <Billboard ref={loggerRef} />
                        </div>
                    </div>
                </div>
            </RefContext.Provider>
        </ConfigContext.Provider>
    );
};
