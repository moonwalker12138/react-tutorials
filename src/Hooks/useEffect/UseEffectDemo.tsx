import React, { useContext, useEffect, useReducer } from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { RaceTrack } from "../useLayoutEffect/RaceTrack";
import RefereeImg from "../../Images/Referee.png";
import { getRandomBoolean } from "../../Utils";
import { Container } from "../../Shared/Container";
import { Hare, Tortoise } from "../../Model/Player";


enum ActionType {
    Forward = "Forward",
}

interface IState {
    hareProgress: number;
    tortoiseProgress: number;
    winner: string | undefined;
}

interface IAction {
    type: ActionType;
}

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

    const {loggerRef} = useContext(RefContext);

    const [state, dispatch] = useReducer(reducer, {
        hareProgress: 0,
        tortoiseProgress: 0,
        winner: undefined,
    });

    const onForward = () => {
        dispatch({type: ActionType.Forward});
    }

    useEffect(() => {
        if (state.winner) {
            loggerRef?.current?.say(RefereeImg, `Winner: ${state.winner}`);
        }
    }, [state.winner]);

    return (
        <Container 
            hareRaceTrack={<RaceTrack character={hare.character} progress={state.hareProgress}/>}
            tortoiseRaceTrack={<RaceTrack character={tortoise.character} progress={state.tortoiseProgress}/>}
            onForward={onForward}
        />
    );
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case ActionType.Forward:
            if (state.winner) {
                return state;
            }
            const hareStep = getRandomBoolean() ? 2 : 0;
            const hareProgress = state.hareProgress + hareStep;
            const tortoiseStep = 1;
            const tortoiseProgress = state.tortoiseProgress + tortoiseStep;
            const winner = getWinner(hareProgress, tortoiseProgress);
            console.log("YF [reducer] winner: ", winner);
            return {
                hareProgress: hareProgress,
                tortoiseProgress: tortoiseProgress,
                winner: winner,
            }
        default:
            return state;
    }
};

const getWinner = (hareProgress: number, tortoiseProgress: number): string | undefined => {
    let winner: string | undefined = undefined;
    if (hareProgress === 10) {
        if (tortoiseProgress === 10) {
            winner = "Tie";
        } else {
            winner = "Hare";
        }
    } else {
        if (tortoiseProgress === 10) {
            winner = "Tortoise";
        } 
    }

    return winner;
};
