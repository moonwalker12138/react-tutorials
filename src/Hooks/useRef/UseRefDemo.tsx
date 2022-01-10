import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Hare, Tortoise } from "../../Model/Player";
import { PageWrapper, RefContext } from "../../Shared/PageWrapper";
import { reducer, ActionType, Winner } from "../useReducer/UseReducerDemo";
import { RaceTrack } from "./RaceTrack";
import RefereeImg from "../../Images/Referee.png";
import { Container } from "../../Shared/Container";
import SystemImg from "../../Images/System.png";

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

    const {loggerRef} = useContext(RefContext);
    const hareProgressBarRef = useRef<HTMLDivElement>(null);
    const tortoiseProgressBarRef = useRef<HTMLDivElement>(null);

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
            const result = state.winner === Winner.None ? "Tie!" : (state.winner === Winner.Hare ? `Winner: Hare-${hare.name}!` :  `Winner: Tortoise-${tortoise.name}!`);
            loggerRef?.current?.append({sender: RefereeImg, message: result});
        }
    }, [state.winner]);

    useEffect(() => {
        loggerRef?.current?.append([
            {sender: hare.character, message: hare.greeting},
            {sender: tortoise.character, message: tortoise.greeting},
        ]);
    }, []);

	useEffect(() => {
		const getLayoutInfo = () => {
            // if (state.hareProgress === 0 || state.tortoiseProgress === 0) return;
            const hareOffset = getOffset(hareProgressBarRef, state.hareProgress);
            const tortoiseOffset = getOffset(tortoiseProgressBarRef, state.tortoiseProgress);

            loggerRef?.current?.append({
                sender: SystemImg, 
                message: `Offset of ${hare.type}: ${hareOffset.toFixed(0)}px, Offset of ${tortoise.type}: ${tortoiseOffset.toFixed(0)}px`
            });
		}

		window.addEventListener("resize", getLayoutInfo);
		getLayoutInfo();
		return () => window.removeEventListener("resize", getLayoutInfo);
	}, [state.hareProgress, state.tortoiseProgress]);

    return (
        <Container 
            hareRaceTrack={<RaceTrack player={hare} progress={state.hareProgress} progressBarRef={hareProgressBarRef}/>}
            tortoiseRaceTrack={<RaceTrack player={tortoise} progress={state.tortoiseProgress} progressBarRef={tortoiseProgressBarRef}/>}
            onForward={onForward}
        />
    );
};

const getOffset = (ref: React.RefObject<HTMLDivElement>, progress: number): number => {
    let offset = 0;
    if (ref.current) {
        const width = ref.current.offsetWidth;
        offset = width * (progress / 10);
    }
    return offset;
};
