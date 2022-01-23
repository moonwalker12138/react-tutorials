import { IConfig } from "../../PageWrapper/Config";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { UseLayoutEffectConfig } from "../useLayoutEffect/UseLayoutEffectDemo";

export const UseImperativeHandleConfig: IConfig = {
    ...UseLayoutEffectConfig,
    pageWrapper: {
        ...UseLayoutEffectConfig.pageWrapper,
        enableUseImperativeHandleMode: true,
    }
};

export const UseImperativeHandleDemo = () => {
    return <PageWrapper initialConfig={UseImperativeHandleConfig} />;
};
