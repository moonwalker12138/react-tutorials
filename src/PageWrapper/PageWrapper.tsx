import React, { createContext, RefObject, useRef } from "react";
import { IBillboardRef, Billboard } from "./Billboard";
import { Sidebar } from "./Sidebar";

interface IRefContext {
    loggerRef: RefObject<IBillboardRef> | null;
}

interface IPlayerConfig {
    enableGreeting: boolean;
    enableRedundantRenderWarning: boolean;
    isTimeConsuming: boolean;
}

interface IRaceTrackConfig {
    isStatic: boolean;
    enableUseMemo: boolean;
    enableRedundantRenderWarning: boolean,
}

interface IGameConfig {
    enableReferee: boolean;
    enableSwitchPlayer: boolean;
    enableUseCallback: boolean;
}

interface IPageWrapperConfig {
    showBillboard: boolean;
}

export interface IConfigContext {
    player: IPlayerConfig;
    raceTrack: IRaceTrackConfig;
    game: IGameConfig;
    pageWrapper: IPageWrapperConfig;
}

interface IPageWrapperProps {
    config?: IConfigContext;
}


export const RefContext = createContext<IRefContext>({ loggerRef: null });

export const DefaultConfig: IConfigContext = {
    player: {
        isTimeConsuming: false,
        enableGreeting: true,
        enableRedundantRenderWarning: false,
    },
    raceTrack: {
        isStatic: false,
        enableUseMemo: false,
        enableRedundantRenderWarning: false,
    },
    game: {
        enableReferee: true,
        enableSwitchPlayer: true,
        enableUseCallback: false,
    },
    pageWrapper: {
        showBillboard: true,
    },
};

export const ConfigContext = createContext<IConfigContext>(DefaultConfig);

export const PageWrapper: React.FC<IPageWrapperProps> = ({config=DefaultConfig, children }) => {
    const loggerRef = useRef<IBillboardRef>(null);

    return (
        <ConfigContext.Provider value={config}>
            <RefContext.Provider value={{ loggerRef: loggerRef }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-auto">
                            <Sidebar />
                        </div>
                        <div className="col">{children}</div>
                        <div className="col-4" style={{visibility: config.pageWrapper.showBillboard ? "visible" : "hidden"}}>
                            <Billboard ref={loggerRef} />
                        </div>
                    </div>
                </div>
            </RefContext.Provider>
        </ConfigContext.Provider>
    );
};
