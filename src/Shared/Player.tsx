import { ProgressBar } from "./ProgressBar";

interface IPlayerProps {
    character: string;
    progress: number;
    onForward: () => void;
}

export const Player: React.FC<IPlayerProps> = ({
    character,
    progress,
    onForward,
}) => {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">
                    <img
                        src={character}
                        alt=""
                        style={{ opacity: 0.7, width: "100%" }}
                    />
                </div>
                <div className="col">
                    <div className="container">
                        <div className="row row-cols-1 align-items-center justify-content-center">
                            <div className="col">
                                <ProgressBar
                                    label={progress.toString()}
                                    progress={progress / 10}
                                />
                            </div>
                            <div className="col">
                                <i
                                    className="bi bi-forward"
                                    style={{ fontSize: "5rem" }}
                                    onClick={onForward}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
