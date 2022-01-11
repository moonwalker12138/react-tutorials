import HareImg from "../Images/Hare.png";
import TortoiseImg from "../Images/Tortoise.png";
import { getRandomBoolean } from "../Utils";

enum PlayerType {
    Hare = "Hare",
    Tortoise = "Tortoise",
}

export interface Player {
    name: string;
    character: string;
    greeting: string;
    type: PlayerType;
    getStep: () => number;
}

export const Hare: Player = {
    name: "Judy",
    character: HareImg,
    greeting: `Hello, I'm Judy!`,
    type: PlayerType.Hare,
    getStep: () => {
        return getRandomBoolean() ? 2 : 0;
    },
};

export const Hare2: Player = {
    name: "Jason",
    character: HareImg,
    greeting: `Hello, I'm Jason!`,
    type: PlayerType.Hare,
    getStep: () => {
        return getRandomBoolean() ? 3 : 0;
    },
};

export const Tortoise: Player = {
    name: "Flash",
    character: TortoiseImg,
    greeting: `H~e~l~l~o, I~~a~m~~F~l~a~s~h!`,
    type: PlayerType.Tortoise,
    getStep: () => {
        return 1;
    },
};

export const Tortoise2: Player = {
    name: "Bunny",
    character: TortoiseImg,
    greeting: `Hey, Bunny`,
    type: PlayerType.Tortoise,
    getStep: () => {
        return 1;
    },
};
