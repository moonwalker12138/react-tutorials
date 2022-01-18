import { IConfig, PageWrapper } from "../../PageWrapper/PageWrapper";
import { PlayerType } from "../../Model/Player";

export const UseStateConfig: IConfig = {
    player: {
        enableGreeting: false,
        enableRedundantRenderWarning: false,
        isTimeConsuming: false,
    },
    raceTrack: {
        isStatic: true,
        isUseMemoButtonVisible: false,
        isUseCallbackButtonVisible: false,
        enableLogLayout: false,
        enableUseMemo: {
            [PlayerType.Hare]: false,
            [PlayerType.Tortoise]: false,
        },
        enableRedundantRenderWarning: false,
    },
    game: {
        enableReducer: false,
        enableReferee: false,
        enableSwitchPlayer: false,
        enableUseCallback: {
            [PlayerType.Hare]: false,
            [PlayerType.Tortoise]: false,
        },
    },
    pageWrapper: {
        showBillboard: false,
    },
};

/* Create players and race tracks */
export const UseStateDemo = () => {
    return <PageWrapper initialConfig={UseStateConfig} />;
};
