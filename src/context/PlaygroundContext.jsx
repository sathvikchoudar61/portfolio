import { createContext, useContext, useState } from "react";

const PlaygroundContext = createContext();

export function PlaygroundProvider({ children }) {
    const [isZeroGravity, setIsZeroGravity] = useState(false);
    const [isGraffitiMode, setIsGraffitiMode] = useState(false);

    return (
        <PlaygroundContext.Provider value={{
            isZeroGravity,
            setIsZeroGravity,
            isGraffitiMode,
            setIsGraffitiMode
        }}>
            {children}
        </PlaygroundContext.Provider>
    );
}

export function usePlayground() {
    return useContext(PlaygroundContext);
}
