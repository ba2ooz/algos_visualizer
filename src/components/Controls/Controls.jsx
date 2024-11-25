import { Slider } from '../../components/Slider/Slider';
import styles from './Controls.module.css';

export function Controls({ disabled, dispatch, selectControlOptions, dataSizeControl, speedControl, buttons }) {
    const selectLabel = 'Algorithms';

    function handleDataSizeChange(event) {
        // generates new array everytime dataSize is changed
        const nextDataSize = parseFloat(event.target.value);
        dispatch({
            type: 'changed_dataSize',
            dataSize: nextDataSize
        });
    }

    function handleSortSpeedChange(event) {
        const nextSpeed = speedControl.max - parseFloat(event.target.value);
        speedControl.speedRef.current = nextSpeed;
        dispatch({
            type: 'changed_speed',
            sortSpeed: nextSpeed
        });
    }

    function handleAlgoSelectChange(event) {
        const nextAlgorithm = event.target.value;
        dispatch({
            type: 'changed_algorithm',
            selectedAlgorithm: nextAlgorithm
        });
    }

    return (
        <>
            <div className={styles.controls}>
                <button
                    disabled={disabled}
                    onClick={buttons.handleSortPlay}
                >Sort</button>

                <select
                    disabled={disabled}
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
                        disabled: disabled,
                        value: dataSizeControl.value,
                        min: dataSizeControl.min,
                        max: dataSizeControl.max,
                        handleChange: handleDataSizeChange,
                    }}
                    info={dataSizeControl.value}
                    label={{ id: "size", description: "Array Size" }}
                />
                <Slider
                    slider={{
                        value: speedControl.value,
                        min: speedControl.min,
                        max: speedControl.max,
                        handleChange: handleSortSpeedChange,
                    }}
                    info={`${speedControl.info} ms`}
                    label={{ id: "speed", description: "Animation Speed" }}
                />
            </div>
        </>
    )
}