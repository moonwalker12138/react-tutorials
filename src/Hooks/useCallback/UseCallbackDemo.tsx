import React, {
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { RaceTrack } from "../useCallback/RaceTrack";
import { Hare, Hare2, PlayerEntity, Tortoise, Tortoise2 } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";
import { Player } from "./Player";

/* Prevent re-rendering child unnecessarily when parent re-renders */
export const UseCallbackDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const [hare, setHare] = useState<PlayerEntity>(Hare);
    const switchHare = () => setHare(hare === Hare ? Hare2 : Hare);

    const [tortoise, setTortoise] = useState<PlayerEntity>(Tortoise);
    const switchTortoise = () => setTortoise(tortoise === Tortoise ? Tortoise2 : Tortoise);
    
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
            loggerRef?.current?.append({ sender: RefereeImg, message: result });
        }
    }, [state.winner]);

    return (
        <>
            <div className="d-flex justify-content-between m-3">
                <button className="btn btn-outline-primary" onClick={switchHare}>{"Switch Hare"}</button>
                <button className="btn btn-outline-primary" onClick={switchTortoise}>{"Switch Tortoise"}</button>
            </div>
            <Container
                hareRaceTrack={
                    <RaceTrack progress={state.hareProgress}>
                        <Player {...hare} />
                    </RaceTrack> 
                }
                tortoiseRaceTrack={
                    <RaceTrack progress={state.tortoiseProgress}>
                        <Player {...tortoise} />
                    </RaceTrack>
                }
                onForward={onForward}
                onReset={onReset}
            />
        </>
    );
};
