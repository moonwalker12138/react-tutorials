import { useContext, useMemo, useRef, useState } from "react";
import { IPlayerEntity, PlayerType } from "..//Model/Player";
import { ProgressBar } from "./ProgressBar";
import React from "react";
import {
    useLogLayout,
    usePlayerElement,
    useRaceTrackRedundantRenderWarning,
    useUpdatePosition,
} from "../CustomHooks";
import { ConfigContext, DefaultConfig } from "../PageWrapper/PageWrapper";

interface IRaceTrackProps {
    progress: number;
    player: IPlayerEntity;
    onSwitchPlayer?: () => void;
}

export const RaceTrack: React.FC<IRaceTrackProps> = React.memo(
    ({ progress, player, onSwitchPlayer }) => {
        const { config, setConfig } = useContext(ConfigContext);
        const progressBarRef = useRef<HTMLDivElement>(null);
        const playerRef = useRef<HTMLImageElement>(null);

        const playerElement = usePlayerElement(player);
        useLogLayout(progressBarRef, playerRef, progress, player);
        useUpdatePosition(progressBarRef, playerRef, progress);
        useRaceTrackRedundantRenderWarning(progress, player);

        const toggleUseMemo = () =>
            setConfig({
                ...config,
                raceTrack: {
                    ...config.raceTrack,
                    enableUseMemo: {
                        ...config.raceTrack.enableUseMemo,
                        [player.type]:
                            !config.raceTrack.enableUseMemo[player.type],
                    },
                },
            });

        const toggleUseCallback = () =>
            setConfig({
                ...config,
                game: {
                    ...config.game,
                    enableUseCallback: {
                        ...config.game.enableUseCallback,
                        [player.type]:
                            !config.game.enableUseCallback[player.type],
                    },
                },
            });

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
                            onClick={toggleUseMemo}
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
