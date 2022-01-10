interface IProgressBarProps {
    progress: number;
    label?: string;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({
    progress,
    label = "",
}) => {
    const progressStr = (progress * 100).toFixed(2) + "%";

    return (
        <div className="progress" style={{ height: "6rem" }}>
            <div
                className="progress-bar"
                role="progressbar"
                style={{ width: progressStr }}
                aria-valuenow={progress * 100}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <h3>{label}</h3>
            </div>
        </div>
    );
};
