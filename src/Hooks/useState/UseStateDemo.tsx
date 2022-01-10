import React, { useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import { Container } from "../../Shared/Container";
import { RaceTrack } from "./RaceTrack";
import { Hare, Tortoise } from "../../Model/Player";

/* Create players and race tracks */
export const UseStateDemo = () => {
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
            setHareProgress(Math.min(hareProgress + hare.getStep(), 10));
        }

        if (tortoiseProgress !== 10) {
            setTortoiseProgress(Math.min(tortoiseProgress + tortoise.getStep(), 10));
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
