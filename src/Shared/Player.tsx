import React from "react";
import { IPlayerEntity } from "../Model/Player";
import { isTimeConsuming, sleep } from "../Utils";
import { useGreeting, usePlayerRedundantRenderWarning } from "../CustomHooks";

interface IPlayerProps extends IPlayerEntity {}

export const Player: React.FC<IPlayerProps> = ({
    name,
    character,
    greeting,
    type,
}) => {
    useGreeting(character, greeting, name);
    usePlayerRedundantRenderWarning(name, type, character);

    if (isTimeConsuming(name)) {
        sleep(500);
    }

    return (
        <img src={character} alt="" style={{ opacity: 0.7, height: "6rem" }} />
    );
};
