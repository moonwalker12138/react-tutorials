import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PlayerEntity, PlayerType } from "../../Model/Player";
import { ProgressBar } from "../../Shared/ProgressBar";
import { Player } from "../useMemo/Player";
import React from "react";

interface IRaceTrackProps {
    progress: number;
    player: PlayerEntity;
    onSwitchPlayer: () => void;
}

export const RaceTrack: React.FC<IRaceTrackProps> = React.memo(({progress, player, onSwitchPlayer}) => {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLImageElement>(null);

    const memoriedPlayer = useMemo(() => (
		<div className="" style={{border: "solid red"}}>
			<Player {...player} />
		</div>
	), [player]);

    useLayoutEffect(() => {
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

    return (
        <div className="p-2" style={{border: "solid yellow"}}>
            <div className="d-flex mb-1 align-items-center">
                <div className="d-flex align-items-center me-5">
                    <i className="bi bi-arrow-right-square me-2" style={{fontSize: "1.5rem"}} onClick={onSwitchPlayer}></i>
                    <span style={{fontFamily: "Comic Sans MS"}}>{"Switch player"}</span>
                </div>
            </div>
            <div className="d-flex" style={{ position: "relative" }}>
                <div ref={progressBarRef} style={{ flex: 1 }}>
                    <ProgressBar
                        label={progress.toString()}
                        progress={progress / 10}
                    />
                </div>
                <img src={player.character} alt="" style={{opacity: 0.7, height: "6rem", visibility: "hidden"}}/>
                <div style={{ position: "absolute", transition: "left .6s"}} ref={playerRef}>
                    {memoriedPlayer}
                </div>
            </div>
        </div>
    );
});
