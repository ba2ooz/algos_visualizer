import { useState, useEffect } from 'react';
import { STATE_ARR_ORDER } from '../../shared/utils';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Slider } from '../../components/Slider/Slider';
import * as Icons from '../../components/Icons';

import styles from './Controls.module.css';

export function Controls({
    selectControlOptions,
    animationControl,
    dataSizeControl,
    speedControl,
    dispatch }) {

    const [isControlDisabled, setIsControlDisabled] = useState(false);
    const [selectedArrayOrder, setSelectedArrayOrder] = useState(null);

    // make sure the random order button is selected by default and after the animation has completed
    useEffect(() => {
        if (animationControl.animationResumeIndex === -1) {
            setSelectedArrayOrder(STATE_ARR_ORDER.RAND);
        }
    }, [animationControl.animationResumeIndex]);

    const arrayOrderOptions = [
      { id: STATE_ARR_ORDER.DESC, label: <Icons.DescendingBarsIcon isActive={!isControlDisabled}/> },
      { id: STATE_ARR_ORDER.RAND, label: <Icons.RandomBarsIcon isActive={!isControlDisabled} /> },
      { id: STATE_ARR_ORDER.ASC, label: <Icons.AscendingBarsIcon isActive={!isControlDisabled} /> }
    ];

    const handleSelectArrayOrder = (id) => {
        setSelectedArrayOrder(id);

        dispatch({
            type: 'changed_stateArray',
            dataSize: -1,
            order: id
        });
    };

    const handleDataSizeChange = (value) => {
        // generates new array everytime dataSize is changed
        const nextDataSize = parseFloat(value);
        dispatch({
            type: 'changed_stateArray',
            dataSize: nextDataSize,
            order: selectedArrayOrder || STATE_ARR_ORDER.RAND // default to random if no order is selected
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
                    <div className={styles.buttonGroup}>
                        {
                            animationControl.animationResumeIndex !== -1 && !isControlDisabled &&
                            <button
                                className={styles.button}
                                onClick={handlePrevious}>
                                <Icons.BackIcon isActive={!isControlDisabled} />
                            </button>
                        }
                        <button
                            className={styles.button}
                            onClick={!isControlDisabled ? handleStart : handleStop}>
                            {!isControlDisabled ? (<Icons.PlayIcon/>) : (<Icons.PauseIcon/>)}
                        </button>
                        {
                            animationControl.animationResumeIndex !== -1 && !isControlDisabled &&
                            <button
                                className={styles.button}
                                onClick={handleNext}>
                                <Icons.ForwardIcon isActive={!isControlDisabled} />
                            </button>
                        }
                    </div>

                    <CustomSelect
                        disabled={isControlDisabled}
                        options={selectControlOptions}
                        onChange={handleAlgoSelectChange}
                    />
                </div>

                <div className={`${styles.buttonGroup} ${styles.margin}`}>
                    {arrayOrderOptions.map((button) => (
                        <button
                          key={button.id}
                          disabled={isControlDisabled}
                          className={`${styles.button} ${selectedArrayOrder === button.id ? styles.selected : ''}`}
                          onClick={() => handleSelectArrayOrder(button.id)}
                        >
                          {button.label}
                        </button>
                    ))}
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