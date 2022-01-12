import { useLayoutEffect, useRef } from "react";
import { ProgressBar } from "../../Shared/ProgressBar";

interface IRaceTrackProps {
    progress: number;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({progress, children }) => {
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


    return (
        <div className="d-flex" style={{ position: "relative" }}>
            <div ref={progressBarRef} style={{ flex: 1 }}>
                <ProgressBar
                    label={progress.toString()}
                    progress={progress / 10}
                />
            </div>
            <div style={{visibility: "hidden"}}>{children}</div>
            <div style={{ position: "absolute", transition: "left .6s"}} ref={playerRef}>
                {children}
            </div>
        </div>
    );
};
