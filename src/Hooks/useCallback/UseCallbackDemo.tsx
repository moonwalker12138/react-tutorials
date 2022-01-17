import React, {
	useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { PageWrapper, RefContext } from "../../PageWrapper/PageWrapper";
import { Hare, Hare2, IPlayerEntity, Tortoise, Tortoise2 } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";
import { useLog } from "../../Utils";
import { RaceTrack } from "./RaceTrack";
import { RecordRegion } from "../../PageWrapper/Billboard";
import { useReferee } from "../../CustomHooks";

/* Prevent re-rendering child unnecessarily when parent re-renders */
export const UseCallbackDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
	const [enableHareUseCallback, setEnableHareUseCallback] = useState(false);
	const toggleHareUseCallback = useCallback(() => setEnableHareUseCallback(!enableHareUseCallback), [enableHareUseCallback]);

	const [enableTortoiseUseCallback, setEnableTortoiseUseCallback] = useState(false);
	const toggleTortoiseCallback = useCallback(() => setEnableTortoiseUseCallback(!enableTortoiseUseCallback), [enableTortoiseUseCallback]);

    const [hare, setHare] = useState<IPlayerEntity>(Hare);
    const onSwitchHare = () => setHare(hare === Hare ? Hare2 : Hare);
	const memoriedSwitchHare = useCallback(onSwitchHare, [hare]);
	const switchHare = enableHareUseCallback ? memoriedSwitchHare : onSwitchHare;

    const [tortoise, setTortoise] = useState<IPlayerEntity>(Tortoise);
    const onSwitchTortoise = () => setTortoise(tortoise === Tortoise ? Tortoise2 : Tortoise);
	const memoriedSwitchTortoise = useCallback(onSwitchTortoise, [tortoise]);
	const switchTortoise = enableTortoiseUseCallback ? memoriedSwitchTortoise : onSwitchTortoise;
    
    const reducer = getReducer(hare.getStep, tortoise.getStep);
    const [state, dispatch] = useReducer(reducer, {
        hareProgress: 0,
        tortoiseProgress: 0,
        winner: undefined,
    });

    const onForward = () => {
        dispatch({ type: ActionType.Forward });
    };

    const onReset = () => {
        dispatch({ type: ActionType.Reset });
    }

    useReferee(state, hare, tortoise);

    return (
        <Container
            hareRaceTrack={
                <RaceTrack player={hare} progress={state.hareProgress} onSwitchPlayer={switchHare} toggleUseCallback={toggleHareUseCallback} />
            }
            tortoiseRaceTrack={
                <RaceTrack
                    player={tortoise}
                    progress={state.tortoiseProgress}
                    onSwitchPlayer={switchTortoise}
					toggleUseCallback={toggleTortoiseCallback}
                />
            }
            onForward={onForward}
            onReset={onReset}
        />
    );
};