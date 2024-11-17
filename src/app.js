import { useState } from 'react';
import { animations, bubbleSort } from './algorithms/bubbleSort';
import { COLORS } from './utils/colors';
import { delay } from './utils/delay';
import './app.css';
import { Slider } from './components/Slider';

const DATASIZE_MIN = 10;
const DATASIZE_MAX = 250;

function App() {
  const [data, setData] = useState([...Array(DATASIZE_MIN * DATASIZE_MIN)].map(() => randomize(10, 400)));
  const barsCount = data.length;

  // calculate gap, width and margin for even spacing of the array bars'
  const gap = 2;                                                            // the gap between bars in pixels
  const containerWidth = 2000;                                              // the width of the array bars container in pixels
  const totalGap = gap * (barsCount - 1);
  const dynamicWidth = Math.round((containerWidth - totalGap) / barsCount);
  const dynamicMargin = gap / 2;                                            // half the gap as margin on each side of the bar

  async function animateSort() {
    bubbleSort(data.slice());
    const arrayBars = document.getElementsByClassName('bar');

    for (const [_, animation] of Object.entries(animations)) {
      for (const [animationId, animationValue] of Object.entries(animation)) {
        if (animationId === 'data_change'){
          setData(animationValue);
          continue;
        }

        arrayBars[animationId].style.backgroundColor = animationValue;
      }

      await delay(500); // ms
    }
  }

  function handleDataSizeChange(event) {
    const dataSize = parseFloat(event.target.value);

    // generate new array everytime dataSize is changed
    setData([...Array(dataSize)].map(() => randomize(10, 400)));

    // recolor the bars as array is being resized
    const arrayBars = document.getElementsByClassName('bar');
    Array.from(arrayBars)
         .forEach(bar => {
            bar.style.backgroundColor = COLORS.DEFAULT
         });
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
          value={barsCount}
          min={DATASIZE_MIN}
          max={DATASIZE_MAX}
          handleChange={handleDataSizeChange} />
      </div>
      <button onClick={animateSort}>sort</button>
    </>
  );
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
