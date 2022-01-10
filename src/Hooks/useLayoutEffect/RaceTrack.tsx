import { useLayoutEffect, useRef } from "react";
import { ProgressBar } from "../../Shared/ProgressBar";

interface IPlayerProps {
    character: string;
    progress: number;
}

export const RaceTrack: React.FC<IPlayerProps> = ({character, progress}) => {
	const progressBarRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<HTMLImageElement>(null);

	useLayoutEffect(() => {
		const updatePlayerPosition = () => {
			if (progressBarRef.current && playerRef.current) {
				const progressBarWidth = progressBarRef.current.offsetWidth;
				const imgLeftOffset = progressBarWidth * (progress / 10);
				playerRef.current.style.left = `${imgLeftOffset}px`;
			}
		};

		window.addEventListener("resize", updatePlayerPosition);
		updatePlayerPosition();
		return () => window.removeEventListener("resize", updatePlayerPosition);
	}, [progress]);

    return (
		<div className="d-flex" style={{position: "relative"}}>
			<div ref={progressBarRef} style={{flex: 1}}>
				<ProgressBar label={progress.toString()} progress={progress / 10} />
			</div>
			<img ref={playerRef} src={character} alt="" style={{opacity: 0.7, height: "6rem", visibility: "hidden"}}/>
			<img ref={playerRef} src={character} alt="" style={{opacity: 0.7, height: "6rem", position: "absolute", transition: "left .6s"}}/>
		</div>
    );
};