import React, { useContext, useEffect, useLayoutEffect } from "react";
import { RecordRegion } from "./PageWrapper/Billboard";
import { useLog } from "./Utils";
import RefereeImg from "./Images/Referee.png";
import { IPlayerEntity } from "./Model/Player";
import { ConfigContext } from "./PageWrapper/PageWrapper";

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

export function useReferee(state: IGameState, hare: IPlayerEntity, tortoise: IPlayerEntity) {
	const log = useLog();
	const config = useContext(ConfigContext);

    useEffect(() => {
        if (state.winner && config.game.enableReferee) {
            const result =
                state.winner === Winner.None
                    ? "Tie!"
                    : state.winner === Winner.Hare
                    ? `Winner: Hare-${hare.name}!`
                    : `Winner: Tortoise-${tortoise.name}!`;
            log({ sender: RefereeImg, message: result, region: RecordRegion.Chat });
        }
    }, [state.winner, hare.name, tortoise.name]);
}

export function useUpdatePosition(progressBarRef: React.RefObject<HTMLDivElement>, playerRef: React.RefObject<HTMLDivElement>, progress: number) {
	const config = useContext(ConfigContext);

    useLayoutEffect(() => {
		if (!config.raceTrack.enableRedundantRenderWarning) return;

        const updatePlayerPosition = () => {
            if (progressBarRef.current && playerRef.current) {
                const progressBarWidth = progressBarRef.current.offsetWidth;
                const offset = progressBarWidth * (progress / 10);
                playerRef.current.style.left = `${offset}px`;
            }
        };

        window.addEventListener("resize", updatePlayerPosition);
        updatePlayerPosition();
        return () => window.removeEventListener("resize", updatePlayerPosition);
    }, [progress]);
}