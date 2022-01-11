import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Player } from "../../Model/Player";
import { RefContext } from "../../Shared/PageWrapper";
import { ProgressBar } from "../../Shared/ProgressBar";
import { useUpdateEffect } from "../../Utils";

interface IRaceTrackProps {
    player: Player;
    progress: number;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({ player, progress }) => {
    const {loggerRef} = useContext(RefContext);

    const progressBarRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLImageElement>(null);

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

    useEffect(() => {
        loggerRef?.current?.append({sender: player.character, message: player.greeting});
    }, [player]);

    useUpdateEffect(() => {
        // useRef stores previous state
        loggerRef?.current?.append({sender: player.character, message: `I was rendered again -_-`});
    });

    return (
        <div className="d-flex" style={{ position: "relative" }}>
            <div ref={progressBarRef} style={{ flex: 1 }}>
                <ProgressBar
                    label={progress.toString()}
                    progress={progress / 10}
                />
            </div>
            <img
                ref={playerRef}
                src={player.character}
                alt=""
                style={{ opacity: 0.7, height: "6rem", visibility: "hidden" }}
            />
            <img
                ref={playerRef}
                src={player.character}
                alt=""
                style={{
                    opacity: 0.7,
                    height: "6rem",
                    position: "absolute",
                    transition: "left .6s",
                }}
            />
        </div>
    );
};