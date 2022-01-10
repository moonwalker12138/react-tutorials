import React, { useContext, useEffect, useReducer } from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { RaceTrack } from "../useState/RaceTrack";
import RefereeImg from "../../Images/Referee.png";
import { Container } from "../../Shared/Container";
import { Hare, Tortoise } from "../../Model/Player";
import { ActionType, reducer, Winner } from "../useReducer/UseReducerDemo";

/* Output the winner to billboard once determined */
export const UseEffectDemo = () => {
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

    useEffect(() => {
        loggerRef?.current?.append([
            { sender: hare.character, message: hare.greeting },
            { sender: tortoise.character, message: tortoise.greeting },
        ]);
    }, []);

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
