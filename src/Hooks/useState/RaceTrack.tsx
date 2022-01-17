import { IPlayerEntity } from "../../Model/Player";
import { ProgressBar } from "../../Shared/ProgressBar";

interface IRaceTrackProps {
    player: IPlayerEntity;
    progress: number;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({ player, progress }) => {
    return (
        <div className="d-flex" style={{ position: "relative" }}>
            <div style={{ flex: 1 }}>
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
