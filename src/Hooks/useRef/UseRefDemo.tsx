import { IConfig } from "../../PageWrapper/Config";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { UseEffectConfig } from "../useEffect/UseEffectDemo";

export const UseRefConfig: IConfig = {
    ...UseEffectConfig,
    raceTrack: {
        ...UseEffectConfig.raceTrack,
        enableLogLayout: true,
    },
};

/* Calculate the width of the progress bar and the offset of the image to determine the updated position */
export const UseRefDemo = () => {
    return <PageWrapper initialConfig={UseRefConfig} />;
};
