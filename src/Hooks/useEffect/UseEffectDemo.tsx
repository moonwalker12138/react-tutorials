import { IConfig, PageWrapper } from "../../PageWrapper/PageWrapper";
import { UseReducerConfig } from "../useReducer/UseReducerDemo";

export const UseEffectConfig: IConfig = {
    ...UseReducerConfig,
    player: {
        ...UseReducerConfig.player,
        enableGreeting: true,
    },
    game: {
        ...UseReducerConfig.game,
        enableReferee: true,
    },
    pageWrapper: {
        ...UseReducerConfig.pageWrapper,
        showBillboard: true,
    },
};

/* Output players' greeting and the winner (once determined) to billboard */
export const UseEffectDemo = () => {
    return <PageWrapper initialConfig={UseEffectConfig} />;
};
