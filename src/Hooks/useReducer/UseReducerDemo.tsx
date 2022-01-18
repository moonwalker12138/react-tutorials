import { IConfig, PageWrapper } from "../../PageWrapper/PageWrapper";
import { UseStateConfig } from "../useState/UseStateDemo";

export const UseReducerConfig: IConfig = {
    ...UseStateConfig,
    game: {
        ...UseStateConfig.game,
        enableReducer: true,
    },
};

/* Determine if the game is over and who is the winner */
export const UseReducerDemo = () => {
    return <PageWrapper initialConfig={UseReducerConfig} />;
};
