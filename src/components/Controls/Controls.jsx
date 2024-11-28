import { useState } from 'react';
import { Slider } from '../../components/Slider/Slider';
import styles from './Controls.module.css';
import { CustomSelect } from '../CustomSelect/CustomSelect';

export function Controls({
    selectControlOptions,
    animationControl,
    dataSizeControl,
    speedControl,
    dispatch }) {

    const [isControlDisabled, setIsControlDisabled] = useState(false);
    const svgSize = 28;

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

    const handleAlgoSelectChange = (value) => {
        dispatch({
            type: 'changed_algorithm',
            selectedAlgorithm: value
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
                <div className={`${styles.row} ${styles.row1}`}>
                    <button
                        className={styles.playStopButton}
                        onClick={!isControlDisabled ? handleStart : handleStop}>
                        {!isControlDisabled ? (<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="white" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="white" viewBox="0 0 16 16"><path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5" /></svg>)}
                    </button>
                    <CustomSelect
                        disabled={isControlDisabled}
                        options={selectControlOptions}
                        onChange={handleAlgoSelectChange}
                    />
                </div>

                <div className={styles.row}>
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
                    <Slider
                        slider={{
                            ...dataSizeControl,
                            disabled: isControlDisabled,
                            infoTooltip: dataSizeControl.value,
                            label: { id: "size", description: "Array Size" },
                            handleChange: handleDataSizeChange,
                        }}
                    />
                </div>

            </div>
        </>
    )
}