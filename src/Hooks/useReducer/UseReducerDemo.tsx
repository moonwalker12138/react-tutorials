import React, { useReducer } from "react";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { getRandomBoolean } from "../../Utils";
import { Container } from "../../Shared/Container";
// import { RaceTrack } from "../useState/RaceTrack";
import { RaceTrack } from "../../Shared/RaceTrack";
import { Hare, Tortoise } from "../../Model/Player";

export enum Winner {
    Hare = "Hare",
    Tortoise = "Tortoise",
    None = "None", // Tie
}

export interface IGameState {
    hareProgress: number;
    tortoiseProgress: number;
    winner?: Winner;
}

export enum ActionType {
    Forward = "Forward",
    Reset = "Reset",
}

interface IAction {
    type: ActionType;
}

/* Determine if the game is over and who is the winner */
export const UseReducerDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const InitialState: IGameState = {
    hareProgress: 0,
    tortoiseProgress: 0,
    winner: undefined,
}

const Game = () => {
    const hare = Hare;
    const tortoise = Tortoise;
    const reducer = getReducer(hare.getStep, tortoise.getStep);

    const [state, dispatch] = useReducer(reducer, InitialState);

    const onForward = () => {
        dispatch({ type: ActionType.Forward });
    };

    const onReset = () => {
        dispatch({ type: ActionType.Reset });
    };

    return (
        <Container
            hareRaceTrack={
                <RaceTrack player={hare} progress={state.hareProgress} isStatic />
            }
            tortoiseRaceTrack={
                <RaceTrack
                    player={tortoise}
                    progress={state.tortoiseProgress}
                    isStatic
                />
            }
            onForward={onForward}
            onReset={onReset}
        />
    );
};

export const getReducer = (hareStep: () => number, tortoiseStep: () => number) => {
    const reducer = (state: IGameState, action: IAction) => {
        switch (action.type) {
            case ActionType.Forward:
                if (state.winner) {
                    return state;
                }
                const hareProgress = Math.min(state.hareProgress + hareStep(), 10);
                const tortoiseProgress = Math.min(state.tortoiseProgress + tortoiseStep(), 10);
                const winner = getWinner(hareProgress, tortoiseProgress);
                return {
                    hareProgress: hareProgress,
                    tortoiseProgress: tortoiseProgress,
                    winner: winner,
                };
            case ActionType.Reset:
                return InitialState;
            default:
                return state;
        }
    };

    return reducer;
}

const getWinner = (
    hareProgress: number,
    tortoiseProgress: number
): Winner | undefined => {
    let winner: Winner | undefined = undefined;
    if (hareProgress === 10) {
        if (tortoiseProgress === 10) {
            winner = Winner.None;
        } else {
            winner = Winner.Hare;
        }
    } else {
        if (tortoiseProgress === 10) {
            winner = Winner.Tortoise;
        }
    }

    return winner;
};
