import React, {
    useContext,
    useEffect,
    useMemo,
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
import { useLog } from "../../Utils";

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
    }

    useEffect(() => {
        if (state.winner) {
            const result =
                state.winner === Winner.None
                    ? "Tie!"
                    : state.winner === Winner.Hare
                    ? `Winner: Hare-${hare.name}!`
                    : `Winner: Tortoise-${tortoise.name}!`;
            log({ sender: RefereeImg, message: result });
        }
    }, [state.winner]);

    return (
        <>
            {/* <PlayerSelector players={[Hare, Hare2]} /> */}
            <div className="container">
                <div className="row row-cols-1 gy-5">
                    <div className="col">
                        <RaceTrack progress={state.hareProgress} player={hare} />
                    </div>
                    <div className="col">
                        <RaceTrack progress={state.tortoiseProgress} player={tortoise} />
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <i
                        className="bi bi-arrow-clockwise"
                        style={{ fontSize: "5rem" }}
                        onClick={onReset}
                    ></i>
                    <i
                        className="bi bi-forward"
                        style={{ fontSize: "5rem"}}
                        onClick={onForward}
                    ></i>
                </div>
            </div>
        </>
    );
};

const PlayerSelector: React.FC<{players: PlayerEntity[]}> = ({players}) => {
    const defaultCount = 5;
    const unknownCount = Math.max(defaultCount - players.length, 0);

    return (
        <div className="btn-group" role="group" >
            {players.map((player) => (
                <div key={`player-${player.name}`}>
                    <input type="radio" className="btn-check" id={`player-${player.type}-${player.name}`} autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor={`player-${player.type}-${player.name}`}>
                        <img src={players[0].character} alt="" style={{opacity: 0.7, height: "6rem"}}/>
                    </label>
                </div>
            ))}
            {[Array(unknownCount).keys()].map((index) => (
                <div key={`unknown-${index}`}>
                    <input type="radio" className="btn-check" id={`unknown-${index}`} autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor={`unknown-${index}`}>
                        <i className="bi bi-question-lg" style={{color: "black"}}></i>
                    </label>
                </div>
            ))}
        </div>
    );
};
