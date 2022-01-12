import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { PlayerEntity } from "../../Model/Player";
import { ProgressBar } from "../../Shared/ProgressBar";
import { Player } from "./Player";

interface IRaceTrackProps {
    progress: number;
    player: PlayerEntity;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({progress, player}) => {
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
            <div className="d-flex mb-1">
                <div className="d-flex me-5">
                    <i className="bi bi-arrow-right-square me-2" style={{fontSize: "1rem"}}></i>
                    <label htmlFor="" className="form-check-label" style={{fontFamily: "Comic Sans MS"}}>{"Switch player"}</label>
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
                <div style={{visibility: "hidden"}}>{playerElement}</div>
                <div style={{ position: "absolute", transition: "left .6s"}} ref={playerRef}>
                    {playerElement}
                </div>
            </div>
        </>
    );
};
