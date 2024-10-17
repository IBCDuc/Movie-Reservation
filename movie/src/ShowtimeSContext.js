import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext()
export default function ShowtimeSelection( {children} ) {
    const [showtimeSelection, setShowtimeSelection] = useState('');
    return (
        <ThemeContext.Provider value={{showtimeSelection, setShowtimeSelection}}>
            {children}
        </ThemeContext.Provider>
    )
}       