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
import { Hare, Hare2, PlayerEntity, Tortoise, Tortoise2 } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";
import { useLog } from "../../Utils";
import { RecordRegion } from "../../PageWrapper/Billboard";
import { RaceTrack } from "./RaceTrack";

/* Debug */
export const UseDebugValueDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const [hare, setHare] = useState<PlayerEntity>(Hare);
    const switchHare = useCallback(() => setHare(hare === Hare ? Hare2 : Hare), [hare]);

    const [tortoise, setTortoise] = useState<PlayerEntity>(Tortoise);
    const switchTortoise = useCallback(() => setTortoise(tortoise === Tortoise ? Tortoise2 : Tortoise), [tortoise]);

    const log = useLog();

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

    useEffect(() => {
        if (state.winner) {
            const result =
                state.winner === Winner.None
                    ? "Tie!"
                    : state.winner === Winner.Hare
                    ? `Winner: Hare-${hare.name}!`
                    : `Winner: Tortoise-${tortoise.name}!`;
            log({ sender: RefereeImg, message: result, region: RecordRegion.Chat });
        }
    }, [state.winner]);

    const prevProgress = useRef({hare: 0, tortoise: 0});
    useEffect(() => {
        if (state.tortoiseProgress > prevProgress.current.tortoise) {
            const hareStep = state.hareProgress - prevProgress.current.hare;
            const tortoiseStep = state.tortoiseProgress - prevProgress.current.tortoise;
            log({sender: hare.character, message: hareStep === 0 ? "Sleep" : `Forward ${hareStep} step(s)`, region: RecordRegion.HarePlayer });
            log({sender: tortoise.character, message: `Forward ${tortoiseStep} step(s)`, region: RecordRegion.TortoisePlayer });
        }
        prevProgress.current = {hare: state.hareProgress, tortoise: state.tortoiseProgress};
    });

    return (
        <Container
            hareRaceTrack={
                <RaceTrack player={hare} progress={state.hareProgress} onSwitchPlayer={switchHare} />
            }
            tortoiseRaceTrack={
                <RaceTrack
                    player={tortoise}
                    progress={state.tortoiseProgress}
                    onSwitchPlayer={switchTortoise}
                />
            }
            onForward={onForward}
            onReset={onReset}
        />
    );
};