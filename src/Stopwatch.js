import { useEffect, useState } from "react";

function Stopwatch() {

    const [time , setTime] = useState(0) ;
    const [isStart , setIsStart] = useState(true) ;
    const [isRunning , setIsRunning] = useState(false) ;
    
    const handleToggle = () => {
        if(isStart === true) {
            setIsStart(false) ;
            setIsRunning(true) ;
        } else {
            setIsStart(true) ;
            setIsRunning(false) ;
        }
    } ;

    const handleReset = () => {
        setTime(0) ;
        setIsStart(true) ;
        setIsRunning(false) ;
    }

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60) ; //ms to s and isolate sec then removing decimal point
        const minutes = Math.floor((time / (1000 * 60)) % 60) ; //ms to m and isolate min tehn removing decimal oint

        // Conditionally pad minutes only if greater than 0
        const minDis = minutes > 0 ? String(minutes) : "0";
        const secDis = String(seconds).padStart(2, "0"); //ensuring it is at least two character long and adding leading 0 if single digit  

        return `${minDis}:${secDis}`;
    } ;

    useEffect(() => {
        let timerId;

        if (isRunning) {
            timerId = setInterval(() => {
                setTime((prevTime) => prevTime + 10); // Increment time by 10ms
            }, 10);
        } else if (!isRunning && time !== 0) {
            // to pause
            clearInterval(timerId);
        }
        // IMP PART
        // cleanup function , runs everytime isRunning changes or when component unmounts
        // prevent memory leak and unwater behaviour
        return () => clearInterval(timerId);

    }, [isRunning]) ;

    return (
        <div>
            <h1>Stopwatch</h1>
            <p>Time: {formatTime(time)}</p>
            { isStart ? 
                ( <button onClick={handleToggle} >Start</button> ) 
                : ( <button onClick={handleToggle} >Stop</button> )
            }
            <button onClick={handleReset}>Reset</button>
        </div>
    )
} 

export default Stopwatch ;