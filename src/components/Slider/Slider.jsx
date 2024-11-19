import { useState, useRef } from "react";

import styles from './Slider.module.css';

export function Slider({ slider, label, info }) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const { value, min, max, handleChange } = slider;
    const { id, description } = label;

    function handleWheelScroll(event) {
        // show info box on scroll
        setIsInfoVisible(true);

        event.preventDefault();
        const step = 3;
        const delta = event.deltaY < 0 ? step : -step;
        const newValue = Math.min(max, Math.max(min, value + delta));
        event.target.value = newValue;
        handleChange(event);

        // clear previous timeout when new scroll occurs
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // set new timeout to hide the info after a delay
        scrollTimeoutRef.current = setTimeout(() => {
            setIsInfoVisible(false);
        }, 500);
    };

    return (
        <>
            <div
                className={styles.sliderContainer}
                onWheel={handleWheelScroll} >
                <input
                    type="range"
                    id={id}
                    value={value}
                    min={min}
                    max={max}
                    onMouseDown={() => setIsInfoVisible(true)}
                    onMouseUp={() => setIsInfoVisible(false)}
                    onChange={handleChange}
                />
                <label htmlFor={id}>{description}</label>
            </div>
            {isInfoVisible && <div className={styles.info}>{info}</div>}
        </>
    )
}