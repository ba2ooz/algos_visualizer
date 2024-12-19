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
  const animationsCacheRef = useRef([]);
  const isAnimationRunningRef = useRef(false);
  const barsCount = sortState.data.length;

  const animateSort = async (animationResumeIndex, stepResumeIndex) => {

    // negative resume indexes mean new sort is requested (either data and size or algorithm has been changed)
    if (animationResumeIndex === -1 && stepResumeIndex === -1) {
      // run selected sort algorithm and get the animations
      const dataCopy = sortState.data.slice();
      const animations = availableAlgorithms[sortState.algorithm].execute(dataCopy);
      animationsCacheRef.current = animations;
      
      // prepare the indexes to start iterate through animations
      animationResumeIndex = stepResumeIndex = 0;
    }

    // this is to not use .current everywhere animationsCacheRef object will be accesed
    const animationsCache = animationsCacheRef.current;

    // run the animations
    for (let animationId = animationResumeIndex; animationId < animationsCache.length; animationId++) {
      for (let animationStepId = stepResumeIndex; animationStepId < animationsCache[animationId].length; animationStepId++) {

        // animation is paused, record the animation and step indexes to know where to resume if requested.
        if (!isAnimationRunningRef.current) {
          dispatch({
            type: 'changed_animation_pause',
            animationIndex: animationId,
            stepIndex: animationStepId
          });

          return;
        }

        // if animation object is on index 1
        // that means the array data change/swap has been requested at this animation step
        // so we update the state of the data to trigger a re-render and display the change. 
        const animationValue = animationsCache[animationId][animationStepId];
        if (animationStepId === 1) {
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

    // after all animations have been played, reset resume indexes to their default values
    dispatch({
      type: 'changed_animation_pause',
      animationIndex: -1,
      stepIndex: -1
    });
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
    animationResumeIndex: sortState.pauseResume.animationIndex,
    stepResumeIndex: sortState.pauseResume.stepIndex,
    isAnimationRunningRef: isAnimationRunningRef
  }

  return (
    <>
      <div className={styles.appContainer}>
        <ArrayBars
          payload={sortState.data}
          backbgroundColors={sortState.arrayAnimationState}
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
