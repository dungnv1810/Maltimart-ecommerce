import React, {useState, useEffect, useRef} from "react";
import "./Clock.css"
const Clock = () => {
    // clock
    const [timeDays, setTimeDays] = useState()
    const [timeHours, setTimeHours] = useState()
    const [timeMinutes, setTimeMinutes] = useState()
    const [timeSeconds, setTimeSeconds] = useState()
    let interval = useRef
    const startTime = () => {
        const countDownDate = new Date('Feb 21, 2023 00:00:00').getTime();
        interval = setInterval(()=>{
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(distance % (1000 * 60) / (1000));

            if(distance < 0){
                clearInterval(interval.current);
            }else{
                setTimeDays(days);
                setTimeHours(hours);
                setTimeMinutes(minutes)
                setTimeSeconds(seconds)
            }
        },1000)
    }

    useEffect(()=>{
        startTime();
        return clearInterval(interval.current);
    })


    return(
        <>
            <div className="clock__wrapper">
                <div className="clock__data">
                    <div className="text-center">
                        <h1 className="text-white fs-3 mb-2">{timeDays}</h1>
                        <h5 className="text-white fs-6">Days</h5>
                    </div>
                    <span className="text-white fs-3">:</span>
                </div>
                <div className="clock__data">
                    <div className="text-center">
                        <h1 className="text-white fs-3 mb-2">{timeHours}</h1>
                        <h5 className="text-white fs-6">Hours</h5>
                    </div>
                    <span className="text-white fs-3">:</span>
                </div>
                <div className="clock__data">
                    <div className="text-center">
                        <h1 className="text-white fs-3 mb-2">{timeMinutes}</h1>
                        <h5 className="text-white fs-6">Minutes</h5>
                    </div>
                    <span className="text-white fs-3">:</span>
                </div>
                <div className="clock__data">
                    <div className="text-center">
                        <h1 className="text-white fs-3 mb-2">{timeSeconds}</h1>
                        <h5 className="text-white fs-6">Seconds</h5>
                    </div>
                    <span className="text-white fs-3">:</span>
                </div>
            </div>
        </>
    )
}
export default Clock