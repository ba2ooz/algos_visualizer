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

    const handleDataSizeChange = (value) => {
        // generates new array everytime dataSize is changed
        const nextDataSize = parseFloat(value);
        dispatch({
            type: 'changed_dataSize',
            dataSize: nextDataSize
        });
    }

    const handleSortSpeedChange = (value) => {
        const nextSpeed = speedControl.max - parseFloat(value);
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
        setIsControlDisabled(true);
        animationControl.isAnimationRunningRef.current = true;
        await animationControl.startAnimation(animationControl.animationResumeIndex, animationControl.stepResumeIndex);

        setIsControlDisabled(false);
    }

    const handleStop = () => {
        setIsControlDisabled(false);
        animationControl.isAnimationRunningRef.current = false;
    }

    const handleNext = () => {
        const animations = animationControl.animations;
        let nextAnimation = animationControl.animationResumeIndex;
        let nextStep = animationControl.stepResumeIndex;

        // check whether there still are animations left
        if (nextStep + 1 === animations[nextAnimation].length) {
            if (nextAnimation + 1 === animations.length) {
                // no more animations, reset state and disable/enable controls
                dispatch({
                    type: 'exited_animation',
                    animationIndex: -1,
                    stepIndex: -1
                })

                handleStop();

                return;
            }

            // no more steps in current animations, move to the next one
            nextAnimation++;
            nextStep = 0;
        } 
        else nextStep++;

        // if nextStep object is empty then we are on an edge case regarding the animations structure design 
        // which is not going to produce any changes, so advance to the next step.
        if (Object.keys(animations[nextAnimation][nextStep]).length === 0)
            nextStep++;

        // make a snapshot of the current state
        dispatch({
            type: 'snapshot_history',
            animationIndex: nextAnimation,
            stepIndex: nextStep
        })

        const animationValue = animations[nextAnimation][nextStep];
        if (nextStep === 1) {
            dispatch({
                type: 'changed_data',
                data: animationValue,
            });
        }
        else {
            dispatch({
                type: 'changed_animation',
                colors: animationValue
            })
        }
    }

    const handlePrevious = () => {
        dispatch({ type: 'rollbacked_history' });
    }

    return (
        <>
            <div className={styles.controls}>
                <div className={`${styles.row} ${styles.row1}`}>
                    {
                        animationControl.animationResumeIndex !== -1 && !isControlDisabled &&
                        <button
                            className={styles.playStopButton}
                            onClick={handlePrevious}>
                            prev
                        </button>
                    }
                    <button
                        className={styles.playStopButton}
                        onClick={!isControlDisabled ? handleStart : handleStop}>
                        {!isControlDisabled ? (<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="white" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} fill="white" viewBox="0 0 16 16"><path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5" /></svg>)}
                    </button>
                    {
                        animationControl.animationResumeIndex !== -1 && !isControlDisabled &&
                        <button
                            className={styles.playStopButton}
                            onClick={handleNext}>
                            next
                        </button>
                    }
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