
import * as React from "react"


export function useDarkMode() {
    const [isDarkMode, setDarkMode] = React.useState(true);
    return {
        isDarkMode, setDarkMode
    }
}