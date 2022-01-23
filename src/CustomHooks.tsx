import React, {
    DependencyList,
    useCallback,
    useContext,
    useDebugValue,
    useEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { IRecord, RecordRegion } from "./PageWrapper/Billboard";
import { ActionType, getReducer } from "./Utils";
import RefereeImg from "./Images/Referee.png";
import {
    Hare,
    Hare2,
    IPlayerEntity,
    PlayerType,
    Tortoise,
    Tortoise2,
} from "./Model/Player";
import {RefContext } from "./PageWrapper/PageWrapper";
import {ConfigContext} from "./PageWrapper/Config";

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

export function useForceUpdate() {
    const [value, setValue] = useState(0);
    useDebugValue(value);
    return () => setValue(value + 1);
}

// export function useMountEffect(effect: EffectCallback) {
//     useEffect(() => {
//         effect();
//     }, []);
// }

// export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
//     const isInitialMount = useRef(true);

//     useEffect(() => {
//         if (isInitialMount.current) {
//             isInitialMount.current = false;
//         } else {
//             effect();
//         }
//     }, deps);
// }

// export function useUnmountEffect(effect: () => void) {
//     useEffect(() => {
//         return () => effect();
//     }, []);
// }

export function useSyncState<T>(
    initValue: T
): [React.RefObject<T>, (newValue: T) => void] {
    const forceUpdate = useForceUpdate();

    const ref = useRef<T>(initValue);
    const setValue = (newValue: T) => {
        ref.current = newValue;
        forceUpdate();
    };

    useDebugValue(ref.current);

    return [ref, setValue];
}

export function useLog() {
    const { loggerRef } = useContext(RefContext);
    return (record: IRecord) => {
        loggerRef?.current?.append(record);
    };
}

export function useReferee(
    winner: Winner | undefined,
    hareName: string,
    tortoiseName: string
) {
    const log = useLog();
    const { config } = useContext(ConfigContext);
    useDebugValue(
        `config.raceTrack.enableReferee: ${config.game.enableReferee}`
    );

    useEffect(() => {
        if (!config.game.enableReferee) return;
        if (winner) {
            const result =
                winner === Winner.None
                    ? "Tie!"
                    : winner === Winner.Hare
                    ? `Winner: Hare-${hareName}!`
                    : `Winner: Tortoise-${tortoiseName}!`;
            log({
                sender: RefereeImg,
                message: result,
                region: RecordRegion.Chat,
            });
        }
    }, [winner, hareName, tortoiseName]);
}

export function useLogLayout(
    progressBarRef: React.RefObject<HTMLDivElement>,
    progress: number,
    player: IPlayerEntity
) {
    const log = useLog();
    const { config } = useContext(ConfigContext);
    useDebugValue(
        `config.raceTrack.enableReferee: ${config.game.enableReferee}`
    );

    useEffect(() => {
        if (!config.raceTrack.enableLogLayout) return;

        const getLayoutInfo = () => {
            if (progressBarRef.current) {
                const progressBarWidth = progressBarRef.current.offsetWidth;
                const offset = progressBarWidth * (progress / 10);
                const region =
                    player.type === PlayerType.Hare
                        ? RecordRegion.HareRaceTrack
                        : RecordRegion.TortoiseRaceTrack;
                log({
                    sender: player.character,
                    message: `Offset: ${offset.toFixed(0)}px`,
                    region: region,
                });
            }
        };

        window.addEventListener("resize", getLayoutInfo);
        getLayoutInfo();
        return () => window.removeEventListener("resize", getLayoutInfo);
    }, [progress, player]);
}

export function useUpdatePosition(
    progressBarRef: React.RefObject<HTMLDivElement>,
    playerRef: React.RefObject<HTMLDivElement>,
    progress: number
) {
    const { config } = useContext(ConfigContext);
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

export function useRaceTrackRedundantRenderWarning(
    progress: number,
    player: IPlayerEntity
) {
    const log = useLog();
    const { config } = useContext(ConfigContext);
    useDebugValue(
        `config.raceTrack.enableRedundantRenderWarning: ${config.raceTrack.enableRedundantRenderWarning}`
    );

    const prevProgressRef = useRef<number>();
    const prevPlayerRef = useRef<IPlayerEntity>();
    const prevEnableUseCallback = useRef<boolean>();

    useEffect(() => {
        if (!config.raceTrack.enableRedundantRenderWarning) return;
        if (
            progress === prevProgressRef.current &&
            player === prevPlayerRef.current &&
            config.game.enableUseCallback[player.type] === prevEnableUseCallback.current
        ) {
            const message = "Redundant rendering";
            const region =
                player.type === PlayerType.Hare
                    ? RecordRegion.HareRaceTrack
                    : RecordRegion.TortoiseRaceTrack;
            log({ sender: player.character, message: message, region: region });
        }
        prevProgressRef.current = progress;
        prevPlayerRef.current = player;
        prevEnableUseCallback.current = config.game.enableUseCallback[player.type];
    });
}

export function useGreeting(character: string, greeting: string, name: string) {
    const log = useLog();
    const { config } = useContext(ConfigContext);
    useDebugValue(
        `config.player.enableGreeting: ${config.player.enableGreeting}`
    );

    useEffect(() => {
        if (!config.player.enableGreeting) return;
        log({
            sender: character,
            message: greeting,
            region: RecordRegion.Chat,
        });
    }, [name, character, greeting]);
}

export function usePlayerRedundantRenderWarning(
    name: string,
    type: PlayerType,
    character: string
) {
    const log = useLog();
    const { config } = useContext(ConfigContext);
    useDebugValue(
        `config.player.enableRedundantRenderWarning: ${config.player.enableRedundantRenderWarning}`
    );

    const prevNameRef = useRef<string>();
    useEffect(() => {
        if (!config.player.enableRedundantRenderWarning) return;
        if (name === prevNameRef.current) {
            const message = "Redundant rendering";
            const region =
                type === PlayerType.Hare
                    ? RecordRegion.HarePlayer
                    : RecordRegion.TortoisePlayer;
            log({ sender: character, message: message, region: region });
        }
        prevNameRef.current = name;
    });
}

function useGameState1(
    hareStep: () => number,
    tortoiseStep: () => number
): [IGameState, () => void, () => void] {
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
    };

    return [state, onForward, onReset];
}

function useGameState2(
    hareStep: () => number,
    tortoiseStep: () => number
): [IGameState, () => void, () => void] {
    const [hareProgress, setHareProgress] = useState(0);
    const [tortoiseProgress, setTortoiseProgress] = useState(0);

    const onForward = () => {
        if (hareProgress !== 10) {
            setHareProgress(Math.min(hareProgress + hareStep(), 10));
        }

        if (tortoiseProgress !== 10) {
            setTortoiseProgress(
                Math.min(tortoiseProgress + tortoiseStep(), 10)
            );
        }
    };

    const onReset = () => {
        setHareProgress(0);
        setTortoiseProgress(0);
    };

    return [
        { hareProgress: hareProgress, tortoiseProgress: tortoiseProgress },
        onForward,
        onReset,
    ];
}

export function useGameState(
    hareStep: () => number,
    tortoiseStep: () => number
): [IGameState, () => void, () => void] {
    const { config } = useContext(ConfigContext);
    useDebugValue(`config.game.enableReducer: ${config.game.enableReducer}`);

    const gameReducer = useGameState1(hareStep, tortoiseStep);
    const gameState = useGameState2(hareStep, tortoiseStep);

    return config.game.enableReducer ? gameReducer : gameState;
}

export function usePlayerEntity(
    type: PlayerType
): [IPlayerEntity, (() => void) | undefined, any] {
    const { config } = useContext(ConfigContext);
    useDebugValue(
        `config.game.enableSwitchPlayer: ${config.game.enableSwitchPlayer}`
    );

    const initPlayer = type === PlayerType.Hare ? Hare : Tortoise;
    const [player, setPlayer] = useState<IPlayerEntity>(initPlayer);
    const nextPlayer =
        type === PlayerType.Hare
            ? player === Hare
                ? Hare2
                : Hare
            : player === Tortoise
            ? Tortoise2
            : Tortoise;
    
    // const switchPlayer = () => setPlayer(nextPlayer);
    // const memoriedSwitchPlayer = useCallback(switchPlayer, [nextPlayer]);
    const [switchPlayer, toggleMemoriedSwitchPlayer] = useMemoriedCallback(() => setPlayer(nextPlayer), [nextPlayer]);
    const memoriedToggle = useCallback(toggleMemoriedSwitchPlayer, []);

    const onSwitchPlayer = config.game.enableSwitchPlayer ?  switchPlayer : undefined;

    return [player, onSwitchPlayer, memoriedToggle];
}

export function useToggle(init: boolean): [boolean, () => void] {
    const [value, setValue] = useState(init);
    const toggleValue = () => setValue(!value);
    return [value, toggleValue];
}

export function useMemoriedCallback(cb: any, deps: DependencyList) {
    const [isUseCallbackEnabled, toggleUseCallback] = useToggle(false);
    const memoriedCallback = useCallback(cb, deps);
    const callback = isUseCallbackEnabled ? memoriedCallback : cb;

    return [callback, toggleUseCallback];
}

export function useMemoriedValue<T>(factory: () => T, deps: DependencyList): [T, () => void] {
    const [isUseMemoEnabled, toggleUseMemo] = useToggle(false);
    const memoriedValue = useMemo(factory, deps);
    const value = isUseMemoEnabled ? memoriedValue : factory();

    return [value, toggleUseMemo];
}

export function useRecord(
    state: IGameState,
    hare: IPlayerEntity,
    tortoise: IPlayerEntity
) {
    //TODO
    const log = useLog();

    const prevProgress = useRef({ hare: 0, tortoise: 0 });
    useEffect(() => {
        if (state.tortoiseProgress > prevProgress.current.tortoise) {
            const hareStep = state.hareProgress - prevProgress.current.hare;
            const tortoiseStep =
                state.tortoiseProgress - prevProgress.current.tortoise;
            log({
                sender: hare.character,
                message:
                    hareStep === 0 ? "Sleep" : `Forward ${hareStep} step(s)`,
                region: RecordRegion.HarePlayer,
            });
            log({
                sender: tortoise.character,
                message: `Forward ${tortoiseStep} step(s)`,
                region: RecordRegion.TortoisePlayer,
            });
        }
        prevProgress.current = {
            hare: state.hareProgress,
            tortoise: state.tortoiseProgress,
        };
    });
}
