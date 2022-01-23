import { PlayerType } from "../../Model/Player";
import { IConfig } from "../../PageWrapper/Config";
import { PageWrapper, } from "../../PageWrapper/PageWrapper";
import { UseMemoConfig } from "../useMemo/UseMemoDemo";

export const UseCallbackConfig: IConfig = {
    ...UseMemoConfig,
    game: {
        ...UseMemoConfig.game,
        enableUseCallback: {
            [PlayerType.Hare]: false,
            [PlayerType.Tortoise]: false,
        },
    },
    raceTrack: {
        ...UseMemoConfig.raceTrack,
        isUseCallbackButtonVisible: true,
        enableRedundantRenderWarning: true,
    },
};

/* Prevent re-rendering child unnecessarily when parent re-renders */
export const UseCallbackDemo = () => {
    return <PageWrapper initialConfig={UseCallbackConfig} />;
};
