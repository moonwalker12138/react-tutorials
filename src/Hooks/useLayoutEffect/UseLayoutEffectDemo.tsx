import { IConfig } from "../../PageWrapper/Config";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { UseRefConfig } from "../useRef/UseRefDemo";

export const UseLayoutEffectConfig: IConfig = {
    ...UseRefConfig,
    raceTrack: {
        ...UseRefConfig.raceTrack,
        isStatic: false,
        enableLogLayout: false,
    },
};

/* Update players' position during the race */
export const UseLayoutEffectDemo = () => {
    return <PageWrapper initialConfig={UseLayoutEffectConfig} />;
};
