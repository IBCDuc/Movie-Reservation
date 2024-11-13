import { createContext, useContext, useState } from "react";
import { showtimeApi } from "./pages/Showtime/Api/api";
export const ThemeContext = createContext()
export default function ShowtimeSelection( {children} ) {
    const [showtimeSelection, setShowtimeSelection] = useState(showtimeApi[0].showTimes[0]);
    return (
        <ThemeContext.Provider value={{showtimeSelection, setShowtimeSelection}}>
            {children}
        </ThemeContext.Provider>
    )
}       