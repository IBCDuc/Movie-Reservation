import { createContext, useContext, useState } from "react";
import { showtimeApi } from "./pages/Showtime/Api/api";
export const ThemeContext = createContext()
export default function ShowtimeSelection( {children} ) {
    const [showtimeSelection, setShowtimeSelection] = useState(showtimeApi[0].showTimes[0]);
    const [initReservationDate, setInitReservationDate] = useState("")
    return (
        <ThemeContext.Provider value={{ value: [showtimeSelection, setShowtimeSelection], value2: [initReservationDate, setInitReservationDate] }}>
            {children}
        </ThemeContext.Provider>
    )
}       