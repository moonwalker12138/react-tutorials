import React, {
    useContext,
    useEffect,
    useReducer,
} from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { RaceTrack } from "./RaceTrack";
import { Hare, Tortoise } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";

/* Update players' position during the race */
export const UseLayoutEffectDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const hare = Hare;
    const tortoise = Tortoise;

    const { loggerRef } = useContext(RefContext);

    const reducer = getReducer(hare.getStep, tortoise.getStep);
    const [state, dispatch] = useReducer(reducer, {
        hareProgress: 0,
        tortoiseProgress: 0,
        winner: undefined,
    });

    const onForward = () => {
        dispatch({ type: ActionType.Forward });
    };

    useEffect(() => {
        loggerRef?.current?.append({
            sender: hare.character,
            message: hare.greeting,
        });
        loggerRef?.current?.append({
            sender: tortoise.character,
            message: tortoise.greeting,
        });
    }, []);

    useEffect(() => {
        if (state.winner) {
            const result =
                state.winner === Winner.None
                    ? "Tie!"
                    : state.winner === Winner.Hare
                    ? `Winner: Hare-${hare.name}!`
                    : `Winner: Tortoise-${tortoise.name}!`;
            loggerRef?.current?.append({ sender: RefereeImg, message: result });
        }
    }, [state.winner]);

    return (
        <Container
            hareRaceTrack={
                <RaceTrack player={hare} progress={state.hareProgress} />
            }
            tortoiseRaceTrack={
                <RaceTrack
                    player={tortoise}
                    progress={state.tortoiseProgress}
                />
            }
            onForward={onForward}
        />
    );
};
