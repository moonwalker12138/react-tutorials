import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { PlayerEntity } from "../../Model/Player";
import { ProgressBar } from "../../Shared/ProgressBar";
import { Player } from "../../Shared/Player";

interface IRaceTrackProps {
    progress: number;
    player: PlayerEntity;
    onSwitchPlayer: () => void;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({progress, player, onSwitchPlayer}) => {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLImageElement>(null);

    const [enableUseMemo, setEnableUseMemo] = useState(false);
    const memoriedPlayer = useMemo(() => <Player {...player} />, [player]);
    const playerElement: JSX.Element = enableUseMemo ? memoriedPlayer : <Player {...player} />;

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
        <>
            <div className="d-flex mb-1 align-items-center">
                <div className="d-flex align-items-center me-5">
                    <i className="bi bi-arrow-right-square me-2" style={{fontSize: "1.5rem"}} onClick={onSwitchPlayer}></i>
                    <span style={{fontFamily: "Comic Sans MS"}}>{"Switch player"}</span>
                </div>
                <div className="form-check form-switch me-5">
                    <input type="checkbox" role="switch" className="form-check-input" onClick={() => setEnableUseMemo(!enableUseMemo)} />
                    <label htmlFor="" className="form-check-label" style={{fontFamily: "Comic Sans MS"}}>{"Enable useMemo"}</label>
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
                    {playerElement}
                </div>
            </div>
        </>
    );
};
