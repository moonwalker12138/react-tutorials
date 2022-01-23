import { usePlayerEntity, useGameState, useReferee } from "../CustomHooks";
import { PlayerType } from "../Model/Player";
import { Container } from "./Container";
import { RaceTrack } from "./RaceTrack";

export const Game = () => {
    const [hare, switchHare, toggleMemoriedSwitchHare] = usePlayerEntity(PlayerType.Hare);
    const [tortoise, switchTortoise, toggleMemoriedSwitchTortoise] = usePlayerEntity(PlayerType.Tortoise);

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
                    toggleUseCallback={toggleMemoriedSwitchHare}
                />
            }
            tortoiseRaceTrack={
                <RaceTrack
                    player={tortoise}
                    progress={state.tortoiseProgress}
                    onSwitchPlayer={switchTortoise}
                    toggleUseCallback={toggleMemoriedSwitchTortoise}
                />
            }
            onForward={onForward}
            onReset={onReset}
        />
    );
};
