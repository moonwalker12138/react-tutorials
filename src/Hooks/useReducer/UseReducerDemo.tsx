import React, { useReducer } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import { getRandomBoolean } from "../../Utils";
import { Container } from "../../Shared/Container";
import { RaceTrack } from "../useState/RaceTrack";
import { Hare, Tortoise } from "../../Model/Player";

export enum Winner {
    Hare = "Hare",
    Tortoise = "Tortoise",
    None = "None", // Tie
}

interface IState {
    hareProgress: number;
    tortoiseProgress: number;
    winner?: Winner;
}

export enum ActionType {
    Forward = "Forward",
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

const Game = () => {
    const hare = Hare;
    const tortoise = Tortoise;
    const reducer = getReducer(hare.getStep, tortoise.getStep);

    const [state, dispatch] = useReducer(reducer, {
        hareProgress: 0,
        tortoiseProgress: 0,
        winner: undefined,
    });

    const onForward = () => {
        dispatch({ type: ActionType.Forward });
    };

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

export const getReducer = (hareStep: () => number, tortoiseStep: () => number) => {
    const reducer = (state: IState, action: IAction) => {
        switch (action.type) {
            case ActionType.Forward:
                if (state.winner) {
                    return state;
                }
                const hareProgress = Math.min(state.hareProgress + hareStep(), 10);
                const tortoiseProgress = Math.min(state.tortoiseProgress + tortoiseStep());
                const winner = getWinner(hareProgress, tortoiseProgress);
                return {
                    hareProgress: hareProgress,
                    tortoiseProgress: tortoiseProgress,
                    winner: winner,
                };
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
