import { useRef, useReducer } from 'react';
import { delay } from './shared/utils';
import { availableAlgorithms } from './algorithms/algorithmsCollection';

import { ArrayBars } from './components/ArrayBars/ArrayBars';
import { Slider } from './components/Slider/Slider';
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
  const barsCount = sortState.data.length;

  async function animateSort() {
    const dataCopy = sortState.data.slice();
    const animations = availableAlgorithms[sortState.algorithm].execute(dataCopy);

    for (const [_, animation] of Object.entries(animations)) {
      for (const [animationId, animationValue] of Object.entries(animation)) {
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

  function handleDataSizeChange(event) {
    // generates new array everytime dataSize is changed
    const nextDataSize = parseFloat(event.target.value);
    dispatch({
      type: 'changed_dataSize',
      dataSize: nextDataSize
    });
  }

  function handleSortSpeedChange(event) {
    const nextSpeed = SPEED_MAX - parseFloat(event.target.value);
    sortSpeedRef.current = nextSpeed;
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
      <div className={styles.appContainer}>
        <ArrayBars
          payload={sortState.data}
          backbgroundColors={sortState.animations}
        />
        <Controls
          select={{
            options: availableAlgorithms,
            label: 'Algorithms',
            onChange: handleAlgoSelectChange
          }}
          buttons={{
            handleSortPlay: animateSort
          }} />

        <Slider
          slider={{
            value: barsCount,
            min: DATASIZE_MIN,
            max: DATASIZE_MAX,
            handleChange: handleDataSizeChange
          }}
          label={{ id: "size", description: "Array Size" }}
          info={barsCount}
        />
        <Slider
          slider={{
            value: SPEED_MAX - sortState.speed,
            min: SPEED_MIN,
            max: SPEED_MAX,
            handleChange: handleSortSpeedChange
          }}
          label={{ id: "speed", description: "Animation Speed" }}
          info={`${sortState.speed + 1} ms`}
        />
      </div>
    </>
  );
}

export default App;
