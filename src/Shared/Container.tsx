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
    onReset
}) => {
    return (
        <div className="container">
            <div className="row row-cols-1 gy-5">
                <div className="col">{hareRaceTrack}</div>
                <div className="col">{tortoiseRaceTrack}</div>
            </div>
            <div className="d-flex justify-content-between">
                <i
                    className="bi bi-arrow-clockwise"
                    style={{ fontSize: "5rem" }}
                    onClick={onReset}
                ></i>
                <i
                    className="bi bi-forward"
                    style={{ fontSize: "5rem"}}
                    onClick={onForward}
                ></i>
            </div>
        </div>
    );
};
