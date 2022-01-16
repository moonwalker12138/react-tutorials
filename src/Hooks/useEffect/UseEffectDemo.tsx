import React, { useContext, useEffect, useReducer } from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { RaceTrack } from "../useState/RaceTrack";
import RefereeImg from "../../Images/Referee.png";
import { Container } from "../../Shared/Container";
import { Hare, Tortoise } from "../../Model/Player";
import { ActionType, getReducer, Winner } from "../useReducer/UseReducerDemo";
import { useLog } from "../../Utils";
import { RecordRegion } from "../../Shared/Billboard";

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
    };

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

    useEffect(() => {
        log({ sender: hare.character, message: hare.greeting, region: RecordRegion.Chat });
        log({ sender: tortoise.character, message: tortoise.greeting, region: RecordRegion.Chat });
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
            onReset={onReset}
        />
    );
};
