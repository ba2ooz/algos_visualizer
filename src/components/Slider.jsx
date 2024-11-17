import { useState } from "react";

export function Slider({value, min, max, handleChange}) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    return (
        <>
            <div className="slider">
                <input
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    onMouseDown={() => setIsInfoVisible(true)}
                    onMouseUp={() => setIsInfoVisible(false)}
                    onChange={handleChange}
                />

            </div>
            {isInfoVisible && <div className="info">{value}</div>}
        </>
    )
}