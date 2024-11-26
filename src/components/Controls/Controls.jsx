import { useState } from 'react';
import { Slider } from '../../components/Slider/Slider';
import styles from './Controls.module.css';

export function Controls({
    selectControlOptions,
    animationControl,
    dataSizeControl,
    speedControl,
    dispatch }) {

    const [isControlDisabled, setIsControlDisabled] = useState(false);
    const selectLabel = 'Algorithms';

    const handleDataSizeChange = (event) => {
        // generates new array everytime dataSize is changed
        const nextDataSize = parseFloat(event.target.value);
        dispatch({
            type: 'changed_dataSize',
            dataSize: nextDataSize
        });
    }

    const handleSortSpeedChange = (event) => {
        const nextSpeed = speedControl.max - parseFloat(event.target.value);
        speedControl.speedRef.current = nextSpeed;
        dispatch({
            type: 'changed_speed',
            sortSpeed: nextSpeed
        });
    }

    const handleAlgoSelectChange = (event) => {
        const nextAlgorithm = event.target.value;
        dispatch({
            type: 'changed_algorithm',
            selectedAlgorithm: nextAlgorithm
        });
    }

    const handleStart = async () => {
        dispatch({
            type: 'changed_animation_reset'
        });

        setIsControlDisabled(true);
        animationControl.isAnimationRunningRef.current = true;
        await animationControl.startAnimation();

        setIsControlDisabled(false);
    }

    const handleStop = () => {
        setIsControlDisabled(false);
        animationControl.isAnimationRunningRef.current = false;
    }

    return (
        <>
            <div className={styles.controls}>
                <button onClick={isControlDisabled ? handleStop : handleStart}
                >{isControlDisabled ? 'Stop' : 'Start'}</button>

                <select
                    disabled={isControlDisabled}
                    name={selectLabel}
                    id={selectLabel}
                    onChange={handleAlgoSelectChange}
                >
                    {selectControlOptions.map((option, id) => {
                        return (
                            <option
                                key={id}
                                value={id}
                            >
                                {option.name}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor={selectLabel}>{selectLabel}</label>

                <Slider
                    slider={{
                        ...dataSizeControl,
                        disabled: isControlDisabled,
                        infoTooltip: dataSizeControl.value,
                        label: { id: "size", description: "Array Size" },
                        handleChange: handleDataSizeChange,
                    }}
                />
                <Slider
                    slider={{
                        value: speedControl.value,
                        min: speedControl.min,
                        max: speedControl.max,
                        infoTooltip: `${speedControl.info} ms`,
                        label: { id: "speed", description: "Animation Speed" },
                        handleChange: handleSortSpeedChange,
                    }}
                />
            </div>
        </>
    )
}