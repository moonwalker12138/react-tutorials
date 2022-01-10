import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Hare, Tortoise } from "../../Model/Player";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { reducer, ActionType, Winner } from "../useReducer/UseReducerDemo";
import { RaceTrack } from "./RaceTrack";
import RefereeImg from "../../Images/Referee.png";
import { Container } from "../../Shared/Container";

/* Calculate the width of the progress bar and the offset of the image to determine the updated position */
export const UseRefDemo = () => {
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
