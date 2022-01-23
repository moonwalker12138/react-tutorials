import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { PlayerType } from "../../Model/Player";
import { IConfig } from "../../PageWrapper/Config";

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
        enableUseImperativeHandleMode: false,
    },
};

/* Create players and race tracks */
export const UseStateDemo = () => {
    return <PageWrapper initialConfig={UseStateConfig} />;
};
