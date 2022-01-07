import chroma from "chroma-js";

export const ORIGINAL_APPLE_RAINBOW_COLORS = [
    "#5ebd3e", // Green
    "#ffb900", // Yellow
    "#f78200", // Orange
    "#e23838", // Red
    "#973999", // Purple
    "#009cdf", // Blue
];

const DESATURATION = 1;
export const APPLE_RAINBOW_COLORS = [
    chroma(ORIGINAL_APPLE_RAINBOW_COLORS[0]).desaturate(DESATURATION).hex(),
    chroma(ORIGINAL_APPLE_RAINBOW_COLORS[1]).desaturate(DESATURATION).hex(),
    chroma(ORIGINAL_APPLE_RAINBOW_COLORS[2]).desaturate(DESATURATION).hex(),
    chroma(ORIGINAL_APPLE_RAINBOW_COLORS[3]).desaturate(DESATURATION).hex(),
    chroma(ORIGINAL_APPLE_RAINBOW_COLORS[4]).desaturate(DESATURATION).hex(),
    chroma(ORIGINAL_APPLE_RAINBOW_COLORS[5]).desaturate(DESATURATION).hex(),
];

export enum MORANDI_COLORS {
    Purple = "#eee5f8",
    Purple2 = "#c9c0d3",
    Green = "#b5c4b1",
    Green2 = "#96a48b",
    Blue = "#c1cbd7",
    Blue2 = "#9ca8b8",
    Grey = "#bfbfbf",
    Grey2 = "#a6a6a8",
    Yellow = "#d8caaf",
    Yellow2 = "#c5b8a5",
    Orange = "#ebc0af",
}

export const REACT_BACKGROUND_COLOR = "#20232a";

export const REACT_TEXT_COLOR = "#61dafb";
