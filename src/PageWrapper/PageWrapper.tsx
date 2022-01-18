import React, { createContext, RefObject, useRef, useState } from "react";
// import { PlayerType } from "../Model/Player";
import { Game } from "../Shared/Game";
import { IBillboardRef, Billboard } from "./Billboard";
import { Sidebar } from "./Sidebar";

export enum PlayerType {
    Hare = "Hare",
    Tortoise = "Tortoise",
}

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
    isUseMemoButtonVisible: boolean;
    isUseCallbackButtonVisible: boolean;
    enableLogLayout: boolean;
    enableUseMemo: {
        [PlayerType.Hare]: boolean;
        [PlayerType.Tortoise]: boolean;
    };
    enableRedundantRenderWarning: boolean;
}

interface IGameConfig {
    enableReducer: boolean;
    enableReferee: boolean;
    enableSwitchPlayer: boolean;
    enableUseCallback: {
        [PlayerType.Hare]: boolean;
        [PlayerType.Tortoise]: boolean;
    };
}

interface IPageWrapperConfig {
    showBillboard: boolean;
}

export interface IConfig {
    player: IPlayerConfig;
    raceTrack: IRaceTrackConfig;
    game: IGameConfig;
    pageWrapper: IPageWrapperConfig;
}

export interface IConfigContext {
    config: IConfig;
    setConfig: (config: IConfig) => void;
}

interface IPageWrapperProps {
    initialConfig?: IConfig;
}

export const RefContext = createContext<IRefContext>({ loggerRef: null });

export const DefaultConfig: IConfig = {
    player: {
        isTimeConsuming: false,
        enableGreeting: true,
        enableRedundantRenderWarning: false,
    },
    raceTrack: {
        isStatic: false,
        isUseMemoButtonVisible: false,
        isUseCallbackButtonVisible: false,
        enableLogLayout: false,
        enableUseMemo: { [PlayerType.Hare]: true, [PlayerType.Tortoise]: true },
        enableRedundantRenderWarning: false,
    },
    game: {
        enableReducer: true,
        enableReferee: true,
        enableSwitchPlayer: true,
        enableUseCallback: {
            [PlayerType.Hare]: true,
            [PlayerType.Tortoise]: true,
        },
    },
    pageWrapper: {
        showBillboard: true,
    },
};

export const ConfigContext = createContext<IConfigContext>({
    config: DefaultConfig,
    setConfig: () => {},
});

export const PageWrapper: React.FC<IPageWrapperProps> = ({
    initialConfig = DefaultConfig,
}) => {
    const loggerRef = useRef<IBillboardRef>(null);
    const [config, setConfig] = useState(initialConfig);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            <RefContext.Provider value={{ loggerRef: loggerRef }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-auto">
                            <Sidebar />
                        </div>
                        <div className="col">
                            <Game />
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
