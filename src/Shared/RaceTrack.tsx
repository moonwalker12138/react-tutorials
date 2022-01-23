import { useContext, useRef } from "react";
import { IPlayerEntity } from "..//Model/Player";
import { ProgressBar } from "./ProgressBar";
import React from "react";
import {
    useLogLayout,
    useMemoriedValue,
    useRaceTrackRedundantRenderWarning,
    useUpdatePosition,
} from "../CustomHooks";
import { ConfigContext } from "../PageWrapper/Config";
import { Player } from "./Player";

interface IRaceTrackProps {
    progress: number;
    player: IPlayerEntity;
    onSwitchPlayer?: () => void;
    toggleUseCallback?: () => void;
}

export const RaceTrack: React.FC<IRaceTrackProps> = React.memo(
    ({ progress, player, onSwitchPlayer, toggleUseCallback }) => {
        const { config } = useContext(ConfigContext);

        const progressBarRef = useRef<HTMLDivElement>(null);
        const playerRef = useRef<HTMLImageElement>(null);

        const [playerElement, toggleMemoriedPlayerElement] = useMemoriedValue<JSX.Element>(() => <Player {...player} />, [player]);
        useLogLayout(progressBarRef, progress, player);
        useUpdatePosition(progressBarRef, playerRef, progress);
        useRaceTrackRedundantRenderWarning(progress, player);

        return (
            <>
                <div className="d-flex mb-1 align-items-center">
                    <div
                        className="d-flex align-items-center me-5"
                        style={{
                            visibility: config.game.enableSwitchPlayer
                                ? "visible"
                                : "hidden",
                        }}
                    >
                        <i
                            className="bi bi-arrow-right-square me-2"
                            style={{ fontSize: "1.5rem" }}
                            onClick={onSwitchPlayer}
                        ></i>
                        <span style={{ fontFamily: "Comic Sans MS" }}>
                            {"Switch player"}
                        </span>
                    </div>
                    <div
                        className="form-check form-switch me-5"
                        style={{
                            visibility: config.raceTrack.isUseMemoButtonVisible
                                ? "visible"
                                : "hidden",
                        }}
                    >
                        <input
                            type="checkbox"
                            role="switch"
                            className="form-check-input"
                            onClick={toggleMemoriedPlayerElement}
                        />
                        <label
                            htmlFor=""
                            className="form-check-label"
                            style={{ fontFamily: "Comic Sans MS" }}
                        >
                            {"Enable useMemo"}
                        </label>
                    </div>
                    <div
                        className="form-check form-switch me-5"
                        style={{
                            visibility: config.raceTrack
                                .isUseCallbackButtonVisible
                                ? "visible"
                                : "hidden",
                        }}
                    >
                        <input
                            type="checkbox"
                            role="switch"
                            className="form-check-input"
                            onClick={toggleUseCallback}
                        />
                        <label
                            htmlFor=""
                            className="form-check-label"
                            style={{ fontFamily: "Comic Sans MS" }}
                        >
                            {"Enable useCallback"}
                        </label>
                    </div>
                </div>
                <div className="d-flex" style={{ position: "relative" }}>
                    <div ref={progressBarRef} style={{ flex: 1 }}>
                        <ProgressBar
                            label={progress.toString()}
                            progress={progress / 10}
                        />
                    </div>
                    <img
                        src={player.character}
                        alt=""
                        style={{
                            opacity: 0.7,
                            height: "6rem",
                            visibility: config.raceTrack.isStatic
                                ? "visible"
                                : "hidden",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            transition: "left .6s",
                            visibility: config.raceTrack.isStatic
                                ? "hidden"
                                : "visible",
                        }}
                        ref={playerRef}
                    >
                        {playerElement}
                    </div>
                </div>
            </>
        );
    }
);
