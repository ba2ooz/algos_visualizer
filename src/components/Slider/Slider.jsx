import { useState, useRef } from "react";

import styles from './Slider.module.css';

export function Slider({ slider }) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const scrollTimeoutRef = useRef(null);

    const handleWheelScroll = (event) => {
        event.preventDefault();

        // clear previous timeout when new scroll occurs
        if (scrollTimeoutRef.current) 
            clearTimeout(scrollTimeoutRef.current);

        // show info box on scroll
        setIsInfoVisible(true);
        const step = 3;
        const delta = event.deltaY < 0 ? step : -step;
        const newValue = Math.min(slider.max, Math.max(slider.min, slider.value + delta));
        slider.handleChange(newValue);

        // set new timeout to hide the info after a delay
        scrollTimeoutRef.current = setTimeout(() => {
            setIsInfoVisible(false);
        }, 500);
    };

    return (
        <>
            <div
                className={styles.sliderContainer}
                onWheel={!slider.disabled ? handleWheelScroll : null} >
                <input
                    disabled={slider.disabled}
                    type="range"
                    id={slider.label.id}
                    value={slider.value}
                    min={slider.min}
                    max={slider.max}
                    onMouseDown={() => setIsInfoVisible(true)}
                    onMouseUp={() => setIsInfoVisible(false)}
                    onChange={(e) => slider.handleChange(e.target.value)}
                />
                <output>{slider.infoTooltip}</output>
                <label htmlFor={slider.label.id}>{slider.label.description}</label>
            </div>
            {isInfoVisible && <div className={styles.info}>{slider.infoTooltip}</div>}
        </>
    )
}