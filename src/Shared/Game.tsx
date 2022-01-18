import { usePlayerEntity, useGameState, useReferee } from "../CustomHooks";
import { PlayerType } from "../Model/Player";
import { Container } from "./Container";
import { RaceTrack } from "./RaceTrack";

export const Game = () => {
    // const [enableHareUseCallback, setEnableHareUseCallback] = useState(false);
    // const toggleHareUseCallback = useCallback(() => setEnableHareUseCallback(!enableHareUseCallback), [enableHareUseCallback]);

    // const [enableTortoiseUseCallback, setEnableTortoiseUseCallback] = useState(false);
    // const toggleTortoiseCallback = useCallback(() => setEnableTortoiseUseCallback(!enableTortoiseUseCallback), [enableTortoiseUseCallback]);

    const [hare, switchHare] = usePlayerEntity(PlayerType.Hare);
    const [tortoise, switchTortoise] = usePlayerEntity(PlayerType.Tortoise);

    const [state, onForward, onReset] = useGameState(
        hare.getStep,
        tortoise.getStep
    );

    useReferee(state.winner, hare.name, tortoise.name);

    return (
        <Container
            hareRaceTrack={
                <RaceTrack
                    player={hare}
                    progress={state.hareProgress}
                    onSwitchPlayer={switchHare}
                />
            }
            tortoiseRaceTrack={
                <RaceTrack
                    player={tortoise}
                    progress={state.tortoiseProgress}
                    onSwitchPlayer={switchTortoise}
                    // toggleUseCallback={toggleTortoiseCallback}
                />
            }
            onForward={onForward}
            onReset={onReset}
        />
    );
};
