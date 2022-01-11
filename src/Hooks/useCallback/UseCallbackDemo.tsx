import React, {
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { RaceTrack } from "../useCallback/RaceTrack";
import { Hare, Hare2, Player, Tortoise, Tortoise2 } from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { ActionType, Winner, getReducer } from "../useReducer/UseReducerDemo";
import RefereeImg from "../../Images/Referee.png";

/* Prevent re-rendering child unnecessarily when parent re-renders */
export const UseCallbackDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const [hare, setHare] = useState<Player>(Hare);
    const switchHare = () => setHare(hare === Hare ? Hare2 : Hare);

    const [tortoise, setTortoise] = useState<Player>(Tortoise);
    const switchTortoise = () => setTortoise(tortoise === Tortoise ? Tortoise2 : Tortoise);
    
    // const hare = Hare;
    // const tortoise = Tortoise;

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

    // useEffect(() => {
    //     loggerRef?.current?.append({
    //         sender: hare.character,
    //         message: hare.greeting,
    //     });
    //     loggerRef?.current?.append({
    //         sender: tortoise.character,
    //         message: tortoise.greeting,
    //     });
    // }, []);

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
        </>
    );
};
