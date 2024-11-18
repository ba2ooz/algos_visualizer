import { useState, useRef } from 'react';
import { bubbleSort } from './algorithms/bubbleSort';
import { COLORS } from './utils/colors';
import { delay } from './utils/delay';
import { Slider } from './components/Slider/Slider';
import './app.css';

const DATASIZE_MIN = 10;
const DATASIZE_MAX = 250;
const SPEED_MIN = 1;
const SPEED_MAX = 300;

function App() {
  // state var animationSpeed is needed to update the slider ui as it changes
  // ref var animationSpeedRef is needed to update the real time value in the animations loop
  const [animationSpeed, setAnimationSpeed] = useState(15);
  const animationSpeedRef = useRef(animationSpeed);

  // set the data array behind the bars displayed on the screen   
  const [data, setData] = useState([...Array(DATASIZE_MIN * DATASIZE_MIN)].map(() => randomize(10, 400)));
  const barsCount = data.length;

  // calculate gap between bars in pixels,
  // width of the array bars container in pixels 
  // and margin as half the gap on each side of the bar for even spacing of the array bars'
  const gap = 2;
  const containerWidth = 2000;
  const totalGap = gap * (barsCount - 1);
  const dynamicWidth = Math.round((containerWidth - totalGap) / barsCount);
  const dynamicMargin = gap / 2;

  async function animateSort() {
    const animations = bubbleSort(data.slice());
    const arrayBars = document.getElementsByClassName('bar');

    for (const [_, animation] of Object.entries(animations)) {
      for (const [animationId, animationValue] of Object.entries(animation)) {
        if (animationId === 'data_change') {
          setData(animationValue);
          continue;
        }

        arrayBars[animationId].style.backgroundColor = animationValue;
      }

      await delay(animationSpeedRef.current); // ms
    }
  }

  function handleDataSizeChange(event) {
    // generate new array everytime dataSize is changed
    const dataSize = parseFloat(event.target.value);
    setData([...Array(dataSize)].map(() => randomize(10, 400)));

    // recolor the bars as array is being resized
    const arrayBars = document.getElementsByClassName('bar');
    Array.from(arrayBars)
      .forEach(bar => {
        bar.style.backgroundColor = COLORS.DEFAULT
      });
  }

  function handleAnimationSpeedChange(event) {
    const nextSpeed = SPEED_MAX - parseFloat(event.target.value);
    setAnimationSpeed(nextSpeed);
    animationSpeedRef.current = nextSpeed;
  }

  const dataComponent = data.map((value, id) => {
    return (
      <div key={id}
        className='bar'
        style={{
          height: value,
          width: dynamicWidth,
          marginLeft: (id === 0) ? 0 : dynamicMargin,
          marginRight: (id === barsCount - 1) ? 0 : dynamicMargin
        }}>
      </div>
    )
  });

  return (
    <>
      <div className="app">
        <div className='array'>
          {dataComponent}
        </div>
        <Slider
          slider={{ value: barsCount, min: DATASIZE_MIN, max: DATASIZE_MAX, handleChange: handleDataSizeChange }}
          label={{ id: "size", description: "Array Size" }}
          info={barsCount}
        />
        <Slider
          slider={{ value: SPEED_MAX - animationSpeed, min: SPEED_MIN, max: SPEED_MAX, handleChange: handleAnimationSpeedChange }}
          label={{ id: "speed", description: "Animation Speed" }}
          info={animationSpeed + 1 + ' ms'}
        />
      </div>
      <button onClick={animateSort}>sort</button>
    </>
  );
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
