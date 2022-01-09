import HareImg from "../Images/Hare.png";
import TortoiseImg from "../Images/Tortoise.png";
import { getRandomBoolean } from "../Utils";

export interface Player {
	name: string;
	character: string;
	getStep: () => number;
}

export const Hare: Player = {
	name: "Judy",
	character: HareImg,
	getStep: () => {
		return getRandomBoolean() ? 2 : 0;
	},
}

export const Tortoise: Player = {
	name: "Flash",
	character: TortoiseImg,
	getStep: () => {
		return 1;
	},
}