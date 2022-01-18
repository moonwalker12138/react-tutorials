import React, { DependencyList, useCallback, useContext, useDebugValue, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { RecordRegion } from "./PageWrapper/Billboard";
import { ActionType, getReducer, useLog } from "./Utils";
import RefereeImg from "./Images/Referee.png";
import { Hare, Hare2, IPlayerEntity, PlayerType, Tortoise, Tortoise2 } from "./Model/Player";
import { ConfigContext } from "./PageWrapper/PageWrapper";
import { Player } from "./Shared/Player";

export enum Winner {
    Hare = "Hare",
    Tortoise = "Tortoise",
    None = "None", // Tie
}

export interface IGameState {
    hareProgress: number;
    tortoiseProgress: number;
    winner?: Winner;
}

export function useReferee(winner: Winner | undefined, hareName: string, tortoiseName: string) {
	const log = useLog();
	const config = useContext(ConfigContext);
    useDebugValue(`config.raceTrack.enableReferee: ${config.game.enableReferee}`);

    useEffect(() => {
        if (!config.game.enableReferee) return;
        if (winner) {
            const result =
                winner === Winner.None
                    ? "Tie!"
                    : winner === Winner.Hare
                    ? `Winner: Hare-${hareName}!`
                    : `Winner: Tortoise-${tortoiseName}!`;
            log({ sender: RefereeImg, message: result, region: RecordRegion.Chat });
        }
    }, [winner, hareName, tortoiseName]);
}

export function useUpdatePosition(progressBarRef: React.RefObject<HTMLDivElement>, playerRef: React.RefObject<HTMLDivElement>, progress: number) {
	const config = useContext(ConfigContext);
    useDebugValue(`config.raceTrack.isStatic: ${config.raceTrack.isStatic}`);

    useLayoutEffect(() => {
		if (config.raceTrack.isStatic) return;

        const updatePlayerPosition = () => {
            if (progressBarRef.current && playerRef.current) {
                const progressBarWidth = progressBarRef.current.offsetWidth;
                const offset = progressBarWidth * (progress / 10);
                playerRef.current.style.left = `${offset}px`;
            }
        };

        window.addEventListener("resize", updatePlayerPosition);
        updatePlayerPosition();
        return () => window.removeEventListener("resize", updatePlayerPosition);
    }, [progress]);
}

export function useRaceTrackRedundantRenderWarning(progress: number, player: IPlayerEntity) {
	const log = useLog();
	const config = useContext(ConfigContext);
    useDebugValue(`config.raceTrack.enableRedundantRenderWarning: ${config.raceTrack.enableRedundantRenderWarning}`);

    const prevProgressRef = useRef<number>();
    const prevPlayerRef = useRef<IPlayerEntity>();

	useEffect(() => {
        if (!config.raceTrack.enableRedundantRenderWarning) return;
        if (progress === prevProgressRef.current && player === prevPlayerRef.current) {
            const message = "Redundant rendering";
            const region = player.type === PlayerType.Hare ? RecordRegion.HareRaceTrack : RecordRegion.TortoiseRaceTrack;
            log({sender: player.character, message: message, region: region});
        }
        prevProgressRef.current = progress;
        prevPlayerRef.current = player;
	});
}

export function useGreeting(character: string, greeting: string, name: string) {
	const log = useLog();
	const config = useContext(ConfigContext);
    useDebugValue(`config.player.enableGreeting: ${config.player.enableGreeting}`);

	useEffect(() => {
        if (!config.player.enableGreeting) return;
		log({sender: character, message: greeting, region: RecordRegion.Chat});
	}, [name]);
}

export function usePlayerRedundantRenderWarning(name: string, type: PlayerType, character: string) {
	const log = useLog();
	const config = useContext(ConfigContext);
    useDebugValue(`config.player.enableRedundantRenderWarning: ${config.player.enableRedundantRenderWarning}`);

	const prevNameRef = useRef<string>();
	useEffect(() => {
        if (!config.player.enableRedundantRenderWarning) return;
		if (name === prevNameRef.current) {
			const message = "Redundant rendering";
			const region = type === PlayerType.Hare ? RecordRegion.HarePlayer : RecordRegion.TortoisePlayer;
			log({sender: character, message: message, region: region});
		}
		prevNameRef.current = name;
	});
}

export function useGameState(hareStep: () => number, tortoiseStep: () => number): [IGameState, () => void, () => void] {
    const reducer = getReducer(hareStep, tortoiseStep);
    const [state, dispatch] = useReducer(reducer, {
        hareProgress: 0,
        tortoiseProgress: 0,
        winner: undefined,
    });

    const onForward = () => {
        dispatch({ type: ActionType.Forward });
    };

    const onReset = () => {
        dispatch({ type: ActionType.Reset });
    }

    return [state, onForward, onReset];
}

export function usePlayerEntity(type: PlayerType): [IPlayerEntity, (() => void) | undefined] {
	const config = useContext(ConfigContext);
    useDebugValue(`config.game.enableSwitchPlayer: ${config.game.enableSwitchPlayer}\nconfig.game.enableUseCallback: ${config.game.enableUseCallback}`);

    const initPlayer = type === PlayerType.Hare ? Hare : Tortoise;
    const [player, setPlayer] = useState<IPlayerEntity>(initPlayer);
    const nextPlayer = type === PlayerType.Hare ? (player === Hare ? Hare2 : Hare) : (player === Tortoise ? Tortoise2 : Tortoise);

    const switchPlayer = () => setPlayer(nextPlayer);
    const memoriedSwitchPlayer = useCallback(switchPlayer, [nextPlayer]);
    const onSwitchPlayer = config.game.enableSwitchPlayer ? (
        config.game.enableUseCallback ? memoriedSwitchPlayer : switchPlayer
    ) : undefined;

    return [player, onSwitchPlayer];
}

export function usePlayerElement(player: IPlayerEntity) {
	const config = useContext(ConfigContext);
    useDebugValue(`config.raceTrack.enableUseMemo: ${config.raceTrack.enableUseMemo}`);

    const memoriedPlayerElement = useMemo(() => <Player {...player} />, [player]);
    const playerElement = config.raceTrack.enableUseMemo ? memoriedPlayerElement : <Player {...player} />;

    return playerElement;
}

