import { useContext, useEffect, useRef } from "react";
import { RefContext } from "../../PageWrapper/PageWrapper";
import { ProgressBar } from "../../Shared/ProgressBar";
import SystemImg from "../../Images/System.png";
import { IPlayerEntity, PlayerType } from "../../Model/Player";
import { useLog } from "../../Utils";
import { RecordRegion } from "../../PageWrapper/Billboard";

interface IRaceTrackProps {
    player: IPlayerEntity;
    progress: number;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({ player, progress }) => {
    const log = useLog();
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getLayoutInfo = () => {
            if (progressBarRef.current) {
                const progressBarWidth = progressBarRef.current.offsetWidth;
                const offset = progressBarWidth * (progress / 10);
                const region = player.type === PlayerType.Hare ? RecordRegion.HareRaceTrack : RecordRegion.TortoiseRaceTrack;
                log({
                    sender: player.character,
                    message: `Offset: ${offset.toFixed(0)}px`,
                    region: region,
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
