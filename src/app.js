import { useRef, useReducer, useState } from 'react';
import { delay } from './shared/utils';
import { availableAlgorithms } from './algorithms/algorithmsCollection';

import { ArrayBars } from './components/ArrayBars/ArrayBars';
import { Controls } from './components/Controls/Controls';
import { initialState, sortReducer } from './reducers/sortReducer';

import styles from './app.css';

const DATASIZE_MIN = 10;
const DATASIZE_MAX = 250;
const SPEED_MIN = 1;
const SPEED_MAX = 300;


function App() {
  // state var speed(from sortReducer) is needed to update the slider ui as it changes
  // ref var sortSpeedRef is needed to update the real time value in the animations loop
  const [sortState, dispatch] = useReducer(sortReducer, initialState);
  const sortSpeedRef = useRef(sortState.sortSpeed);
  const isAnimationRunningRef = useRef(false);
  const [isControlDisabled, setIsControlDisabled] = useState(false);
  const barsCount = sortState.data.length;

  const animateSort = async (animations) => {
    for (const [_, animation] of Object.entries(animations)) {
      for (const [animationId, animationValue] of Object.entries(animation)) {
        if (!isAnimationRunningRef.current)
          return;

        // if animation object contains the data_change property 
        // that means the array data has changed at that particular animation step
        // so we update the state of the data to trigger a re-render and display the change. 
        if (animation.data_change) {
          dispatch({
            type: 'changed_data',
            data: animationValue,
          });
        }
        else {
          dispatch({
            type: 'changed_animation',
            barId: animationId,
            color: animationValue
          })
        }
      }

      await delay(sortSpeedRef.current); // ms
    }
  }

  const startSort = async () => {
    dispatch({
      type: 'changed_animation_reset'
    });
    setIsControlDisabled(true);
    isAnimationRunningRef.current = true;
    const dataCopy = sortState.data.slice();
    const animations = availableAlgorithms[sortState.algorithm].execute(dataCopy);
    await animateSort(animations);
    setIsControlDisabled(false);
  }

  const stopSort = () => {
    setIsControlDisabled(false);
    isAnimationRunningRef.current = false;
  }

  return (
    <>
      <div className={styles.appContainer}>
        <ArrayBars
          payload={sortState.data}
          backbgroundColors={sortState.animations}
        />
        <Controls
          disabled={isControlDisabled}
          dispatch={dispatch}
          selectControlOptions={availableAlgorithms}
          dataSizeControl={{
            value: barsCount,
            min: DATASIZE_MIN,
            max: DATASIZE_MAX,
          }}
          speedControl={{
            speedRef: sortSpeedRef,
            value: SPEED_MAX - sortState.speed,
            min: SPEED_MIN,
            max: SPEED_MAX,
            info: sortState.speed + 1,
          }}
          buttons={{
            handleSortPlay: startSort
          }} />
        <button disabled={!isControlDisabled} onClick={stopSort}>stop</button>
      </div>
    </>
  );
}

export default App;
