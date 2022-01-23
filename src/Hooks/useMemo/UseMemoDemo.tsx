import { PlayerType } from "../../Model/Player";
import { IConfig } from "../../PageWrapper/Config";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { UseLayoutEffectConfig } from "../useLayoutEffect/UseLayoutEffectDemo";

export const UseMemoConfig: IConfig = {
    ...UseLayoutEffectConfig,
    raceTrack: {
        ...UseLayoutEffectConfig.raceTrack,
        isUseMemoButtonVisible: true,
        enableUseMemo: {
            [PlayerType.Hare]: false,
            [PlayerType.Tortoise]: false,
        },
    },
    player: {
        ...UseLayoutEffectConfig.player,
        enableRedundantRenderWarning: true,
    },
    game: {
        ...UseLayoutEffectConfig.game,
        enableSwitchPlayer: true,
    },
};

/* Prevent redundant computation when component renders */
export const UseMemoDemo = () => {
    return <PageWrapper initialConfig={UseMemoConfig} />;
};
