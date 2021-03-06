import React, {
    DependencyList,
    EffectCallback,
    useContext,
    useDebugValue,
    useEffect,
    useRef,
    useState,
} from "react";
import { IGameState, Winner } from "./CustomHooks";
import { IRecord } from "./PageWrapper/Billboard";
import { RefContext } from "./PageWrapper/PageWrapper";

export enum ActionType {
    Forward = "Forward",
    Reset = "Reset",
}

interface IAction {
    type: ActionType;
}

export function getCSSValue(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function asleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function sleep(milliseconds: number) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + milliseconds);
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomBoolean(): boolean {
    return Math.random() < 0.5;
}

export function isTimeConsuming(name: string): boolean {
    return name === "Bunny" || name === "Donatello";
}

export const getReducer = (
    hareStep: () => number,
    tortoiseStep: () => number
) => {
    const initialState: IGameState = {
        hareProgress: 0,
        tortoiseProgress: 0,
        winner: undefined,
    };

    const reducer = (state: IGameState, action: IAction) => {
        switch (action.type) {
            case ActionType.Forward:
                if (state.winner) {
                    return state;
                }
                const hareProgress = Math.min(
                    state.hareProgress + hareStep(),
                    10
                );
                const tortoiseProgress = Math.min(
                    state.tortoiseProgress + tortoiseStep(),
                    10
                );
                const winner = getWinner(hareProgress, tortoiseProgress);
                return {
                    hareProgress: hareProgress,
                    tortoiseProgress: tortoiseProgress,
                    winner: winner,
                };
            case ActionType.Reset:
                return initialState;
            default:
                return state;
        }
    };

    return reducer;
};

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

/* Custom Hooks */


/* Custom Hooks */
