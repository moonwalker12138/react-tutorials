import { useContext, useEffect, useRef } from "react";
import { RefContext } from "../../Shared/PageWrapper";
import { ProgressBar } from "../../Shared/ProgressBar";
import SystemImg from "../../Images/System.png";
import { Player } from "../../Model/Player";

interface IRaceTrackProps {
    player: Player;
    progress: number;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({ player, progress }) => {
    const { loggerRef } = useContext(RefContext);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getLayoutInfo = () => {
            if (progressBarRef.current) {
                const progressBarWidth = progressBarRef.current.offsetWidth;
                const offset = progressBarWidth * (progress / 10);
                loggerRef?.current?.append({
                    sender: SystemImg,
                    message: `Latest offset of ${player.type}: ${offset.toFixed(
                        0
                    )}px`,
                });
            }
        };

        window.addEventListener("resize", getLayoutInfo);
        getLayoutInfo();
        return () => window.removeEventListener("resize", getLayoutInfo);
    }, [progress]);

    return (
        <div className="d-flex" style={{ position: "relative" }}>
            <div style={{ flex: 1 }} ref={progressBarRef}>
                <ProgressBar
                    label={progress.toString()}
                    progress={progress / 10}
                />
            </div>
            <img
                src={player.character}
                alt=""
                style={{ opacity: 0.7, height: "6rem" }}
            />
        </div>
    );
};
