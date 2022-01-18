import { DefaultConfig, IConfigContext, PageWrapper  } from "../../PageWrapper/PageWrapper";
import { PlayerType} from "../../Model/Player";
import { Container } from "../../Shared/Container";
import { RaceTrack } from "./RaceTrack";
import { useGameState, useReferee, usePlayerEntity  } from "../../CustomHooks";

/* Prevent re-rendering child unnecessarily when parent re-renders */
export const UseCallbackDemo = () => {
    const config: IConfigContext = {
        ...DefaultConfig, 
        raceTrack: {
            ...DefaultConfig.raceTrack, 
            isStatic: false, 
            enableRedundantRenderWarning: true,
            enableUseMemo: true,
        }, 
        game: {
            ...DefaultConfig.game, 
            enableReferee: true,
            enableSwitchPlayer: true,
            enableUseCallback: false,
        }, 
        player: {
            ...DefaultConfig.player, 
            enableRedundantRenderWarning: true,
        }
    };

    return (
        <PageWrapper config={config}>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
	// const [enableHareUseCallback, setEnableHareUseCallback] = useState(false);
	// const toggleHareUseCallback = useCallback(() => setEnableHareUseCallback(!enableHareUseCallback), [enableHareUseCallback]);

	// const [enableTortoiseUseCallback, setEnableTortoiseUseCallback] = useState(false);
	// const toggleTortoiseCallback = useCallback(() => setEnableTortoiseUseCallback(!enableTortoiseUseCallback), [enableTortoiseUseCallback]);

    const [hare, switchHare] = usePlayerEntity(PlayerType.Hare);
    const [tortoise, switchTortoise] = usePlayerEntity(PlayerType.Tortoise);
    
    const [state, onForward, onReset] = useGameState(hare.getStep, tortoise.getStep);

    useReferee(state.winner, hare.name, tortoise.name);

    return (
        <Container
            hareRaceTrack={
                <RaceTrack player={hare} progress={state.hareProgress} onSwitchPlayer={switchHare}  />
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