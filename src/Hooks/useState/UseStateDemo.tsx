import React, { useState } from "react";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { Container } from "../../Shared/Container";
// import { RaceTrack } from "./RaceTrack";
import { RaceTrack } from "../../Shared/RaceTrack";
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
            setTortoiseProgress(
                Math.min(tortoiseProgress + tortoise.getStep(), 10)
            );
        }
    };

    const onReset = () => {
        setHareProgress(0);
        setTortoiseProgress(0);
    }

    return (
        <Container
            hareRaceTrack={<RaceTrack player={hare} progress={hareProgress} isStatic/>}
            tortoiseRaceTrack={
                <RaceTrack player={tortoise} progress={tortoiseProgress} isStatic />
            }
            onForward={onForward}
            onReset={onReset}
        />
    );
};
