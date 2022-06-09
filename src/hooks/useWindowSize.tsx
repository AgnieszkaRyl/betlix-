import {useEffect, useState} from "react";

interface WinowSize {
    width: number;
    height:number
}
export const useWindowSize=():WinowSize=> {
    const [windowSize, setWindowSize] = useState({
        width:  window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}