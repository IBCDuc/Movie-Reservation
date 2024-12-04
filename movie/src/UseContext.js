import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext()
export default function Url( {children} ) {
    const [url, seturl] = useState('');
    return (
        <ThemeContext.Provider value={{url, seturl}}>
            {children}
        </ThemeContext.Provider>
    )
}       