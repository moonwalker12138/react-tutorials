import React, { createContext, useContext } from "react";

interface ITheme {
    foreground: string;
    background: string;
}

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

const ThemeContext = createContext<ITheme>(themes.light);

export const Demo = () => {
    return (
        <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
        </ThemeContext.Provider>
    );
};

const Toolbar = () => {
    return (
        <div>
            <ThemedButton />
        </div>
    );
};

const ThemedButton = () => {
    const theme = useContext(ThemeContext);
    return (
        <button
            style={{ background: theme.background, color: theme.foreground }}
        >
            I am styled by theme context!
        </button>
    );
};
