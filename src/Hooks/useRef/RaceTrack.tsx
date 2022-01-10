import { useContext, useEffect, useRef } from "react";
import { RefContext } from "../../Shared/PageWrapper";
import { ProgressBar } from "../../Shared/ProgressBar";
import SystemImg from "../../Images/System.png";
import { Player } from "../../Model/Player";

interface IRaceTrackProps {
    player: Player;
    progress: number;
	progressBarRef: React.RefObject<HTMLDivElement>;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({player, progress, progressBarRef}) => {
	const {loggerRef} = useContext(RefContext);


    return (
		<div className="d-flex" style={{position: "relative"}}>
			<div style={{flex: 1}} ref={progressBarRef}>
				<ProgressBar label={progress.toString()} progress={progress / 10} />
			</div>
			<img src={player.character} alt="" style={{opacity: 0.7, height: "6rem"}}/>
		</div>
    );
};