import React, {
	useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { Hare, Hare2, PlayerEntity, Tortoise, Tortoise2 } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";
import { useLog } from "../../Utils";
import { RecordRegion } from "../../Shared/Billboard";
import { RaceTrack } from "./RaceTrack";

/* Broadcast global values through useContext  */
export const UseContextDemo = () => {
    return (
        <div className="m-2 p-2" style={{border: "solid blue"}}>
            <PageWrapper>
                <Game />
            </PageWrapper>
        </div>
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

    return (
        <div className="p-2" style={{border: "solid green"}}>
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
        </div>
    );
};