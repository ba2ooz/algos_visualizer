import { useState } from "react";
import styles from './Slider.module.css';

export function Slider({slider, label, info}) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const {value, min, max, handleChange} = slider;
    const {id, description} = label;

    return (
        <>
            <div className={styles.sliderContainer}>
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
            {isInfoVisible && <div className="info">{info}</div>}
        </>
    )
}