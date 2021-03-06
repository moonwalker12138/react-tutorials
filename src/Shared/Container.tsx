import { useContext } from "react";
import { ConfigContext } from "../PageWrapper/Config";

interface IContainer {
    hareRaceTrack: JSX.Element;
    tortoiseRaceTrack: JSX.Element;
    onForward: () => void;
    onReset?: () => void;
}

export const Container: React.FC<IContainer> = ({
    hareRaceTrack,
    tortoiseRaceTrack,
    onForward,
    onReset,
}) => {
    const {config} = useContext(ConfigContext);

    return (
        <div className="container" style={{visibility: config.pageWrapper.enableUseImperativeHandleMode? "hidden" : "visible"}}>
            <div className="row row-cols-1 gy-5 mb-3">
                <div className="col">{hareRaceTrack}</div>
                <div className="col">{tortoiseRaceTrack}</div>
            </div>
            <div className="d-flex justify-content-between">
                <i
                    className="bi bi-arrow-clockwise"
                    style={{ fontSize: "4rem" }}
                    onClick={onReset}
                ></i>
                <i
                    className="bi bi-forward"
                    style={{ fontSize: "4rem" }}
                    onClick={onForward}
                ></i>
            </div>
        </div>
    );
};
