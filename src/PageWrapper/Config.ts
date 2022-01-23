import { createContext } from "react";
import { PlayerType } from "../Model/Player";

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
	enableUseImperativeHandleMode: boolean;
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
		enableUseImperativeHandleMode: false,
    },
};

export const ConfigContext = createContext<IConfigContext>({
    config: DefaultConfig,
    setConfig: () => {},
});