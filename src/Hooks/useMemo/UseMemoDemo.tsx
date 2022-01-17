import React, {
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { PageWrapper,  } from "../../PageWrapper/PageWrapper";
import { RaceTrack } from "./RaceTrack";
import { Hare, Hare2, IPlayerEntity, Tortoise, Tortoise2 } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";
import { Player } from "../../Shared/Player";
import { useLog } from "../../Utils";
import { RecordRegion } from "../../PageWrapper/Billboard";

/* Prevent redundant computation when component renders */
export const UseMemoDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const [hare, setHare] = useState<IPlayerEntity>(Hare);
    const switchHare = () => setHare(hare === Hare ? Hare2 : Hare);

    const [tortoise, setTortoise] = useState<IPlayerEntity>(Tortoise);
    const switchTortoise = () => setTortoise(tortoise === Tortoise ? Tortoise2 : Tortoise);
    
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