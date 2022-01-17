import React from 'react'
import { IPlayerEntity } from '../Model/Player';
import { Player } from './Player';
import { ProgressBar } from './ProgressBar';

interface IRaceTrackProps {
    progress: number;
    player: IPlayerEntity;
	isStatic?: boolean;
	playerRef?: React.RefObject<HTMLDivElement>;
	progressBarRef?: React.RefObject<HTMLDivElement>;
    switchPlayer?: () => void;
	toggleUseMemo?: () => void;
	toggleUseCallback?: () => void;
}

export const RaceTrack: React.FC<IRaceTrackProps> = ({progress, player, switchPlayer, toggleUseMemo, toggleUseCallback, playerRef, progressBarRef, isStatic=false}) => {
    return (
        <>
            <div className="d-flex mb-1 align-items-center">
                <div className="d-flex align-items-center me-5" style={{visibility: switchPlayer ? "visible" : "hidden"}}>;
                    <i className="bi bi-arrow-right-square me-2" style={{fontSize: "1.5rem"}} onClick={switchPlayer}></i>
                    <span style={{fontFamily: "Comic Sans MS"}}>{"Switch player"}</span>
                </div>
                <div className="form-check form-switch me-5" style={{visibility: toggleUseMemo ? "visible" : "hidden"}}>
                    <input type="checkbox" role="switch" className="form-check-input" onClick={toggleUseMemo} />
                    <label htmlFor="" className="form-check-label" style={{fontFamily: "Comic Sans MS"}}>{"Enable useMemo"}</label>
                </div>
                <div className="form-check form-switch me-5" style={{visibility: toggleUseCallback ? "visible" : "hidden"}}>
                    <input type="checkbox" role="switch" className="form-check-input" onClick={toggleUseCallback} />
                    <label htmlFor="" className="form-check-label" style={{fontFamily: "Comic Sans MS"}}>{"Enable useCallback"}</label>
                </div>
            </div>
            <div className="d-flex" style={{ position: "relative" }}>
                <div ref={progressBarRef} style={{ flex: 1 }}>
                    <ProgressBar
                        label={progress.toString()}
                        progress={progress / 10}
                    />
                </div>
                <img src={player.character} alt="" style={{opacity: 0.7, height: "6rem", visibility: isStatic ? "visible" : "hidden"}}/>
                <div style={{ position: "absolute", transition: "left .6s", visibility: isStatic ? "hidden" : "visible"}} ref={playerRef} >
					<Player {...player} />
                </div>
            </div>
        </>
    );
}
