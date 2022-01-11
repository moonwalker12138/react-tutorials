import HareImg from "../Images/Hare.png";
import BunnyImg from "../Images/Bunny.png";
import TortoiseImg from "../Images/Tortoise.png";
import DonatelloImg from "../Images/Donatello.png";
import { getRandomBoolean } from "../Utils";

export enum PlayerType {
    Hare = "Hare",
    Tortoise = "Tortoise",
}

export interface PlayerEntity {
    name: string;
    character: string;
    greeting: string;
    type: PlayerType;
    getStep: () => number;
}

export const Hare: PlayerEntity = {
    name: "Judy",
    character: HareImg,
    greeting: `Hello, I'm Judy!`,
    type: PlayerType.Hare,
    getStep: () => {
        return getRandomBoolean() ? 2 : 0;
    },
};

export const Hare2: PlayerEntity = {
    name: "Bunny",
    character: BunnyImg,
    greeting: `Hello, I'm Bunny!`,
    type: PlayerType.Hare,
    getStep: () => {
        return getRandomBoolean() ? 3 : 0;
    },
};

export const Tortoise: PlayerEntity = {
    name: "Flash",
    character: TortoiseImg,
    greeting: `H~e~l~l~o, I~~a~m~~F~l~a~s~h!`,
    type: PlayerType.Tortoise,
    getStep: () => {
        return 1;
    },
};

export const Tortoise2: PlayerEntity = {
    name: "Donatello",
    character: DonatelloImg,
    greeting: `It's Donatello. Give it all ya got`,
    type: PlayerType.Tortoise,
    getStep: () => {
        return 2;
    },
};

// TODO Add StellaLou and Olu
