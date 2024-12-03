import { useRef, useReducer } from 'react';
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
  const barsCount = sortState.data.length;

  const animateSort = async () => {
    const dataCopy = sortState.data.slice();
    const animations = availableAlgorithms[sortState.algorithm].execute(dataCopy);

    for (const [_, animation] of Object.entries(animations)) {
      for (const [animationId, animationValue] of Object.entries(animation)) {
        if (!isAnimationRunningRef.current)
          return;

        // if animation object contains the data_change property 
        // that means the array data has changed at that particular animation step
        // so we update the state of the data to trigger a re-render and display the change. 
        if (animationId === 'data_change') {
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

      await delay(sortSpeedRef.current); // ms
    }
  }

  const dataSizeControlProps = {
    value: barsCount,
    min: DATASIZE_MIN,
    max: DATASIZE_MAX,
  }

  const speedControlProps = {
    speedRef: sortSpeedRef,
    value: SPEED_MAX - sortState.speed,
    min: SPEED_MIN,
    max: SPEED_MAX,
    info: sortState.speed + 1,
  }

  const animationControlProps = {
    startAnimation: animateSort,
    isAnimationRunningRef: isAnimationRunningRef
  }

  return (
    <>
      <div className={styles.appContainer}>
        <ArrayBars
          payload={sortState.data}
          backbgroundColors={sortState.animations}
        />
        <Controls
          selectControlOptions={availableAlgorithms.map((algorithm) => { return algorithm.name })}
          animationControl={animationControlProps}
          dataSizeControl={dataSizeControlProps}
          speedControl={speedControlProps}
          dispatch={dispatch}
        />
      </div>
    </>
  );
}

export default App;
