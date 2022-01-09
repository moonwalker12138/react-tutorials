import React, { useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import { RaceTrack } from "./RaceTrack";
import { Hare, Tortoise } from "../../Model/Player";
import { Container } from "../../Shared/Container";

/* Place players into the racing track */
export const UseLayoutEffectDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const hare = Hare;
    const tortoise = Tortoise;

    const [hareProgress, setHareProgress] = useState(0);
    const [tortoiseProgress, setTortoiseProgress] = useState(0);

    const onForward = () => {
        if (hareProgress !== 10) {
            setHareProgress(hareProgress + hare.getStep());
        }

        if (tortoiseProgress !== 10) {
            setTortoiseProgress(tortoiseProgress + tortoise.getStep());
        }
    }

    return (
        <Container 
            hareRaceTrack={<RaceTrack character={hare.character} progress={hareProgress}/>}
            tortoiseRaceTrack={<RaceTrack character={tortoise.character} progress={tortoiseProgress}/>}
            onForward={onForward}
        />
    );
};
