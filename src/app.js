import { useState } from 'react';
import './app.css';

const COLOUR_COMPARISON = 'purple';
const COLOUR_SORTED = 'green';
const COLOUR_DEFAULT = 'gold';

const DATASIZE_MIN = 10;
const DATASIZE_MAX = 250;

function App() {
  const [data, setData] = useState([...Array(DATASIZE_MIN*DATASIZE_MIN)].map(() => randomize(10, 400)));
  const [isSizeVisible, setIsSizeVisible] = useState(false);
  const barsCount = data.length;


  // calculate gap, width and margin for even spacing of the array bars'
  const gap = 2;                          // the gap between bars in pixels
  const containerWidth = 2000;            // the width of the array bars container in pixels
  const totalGap = gap * (barsCount - 1);
  const dynamicWidth = Math.round((containerWidth - totalGap) / barsCount);
  const dynamicMargin = gap / 2;          // half the gap as margin on each side of the bar

  function swap(arr, i, j) {
    let aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
  };

  function bubbleSortStep(arrayBars, arr, i, j) {
    // stop, arr is sorted
    if (i >= arr.length - 1) {
      arrayBars[j].style.backgroundColor = COLOUR_SORTED;
      return;
    }

    // move to next iteration
    if (j >= arr.length - i - 1) {
      bubbleSortStep(arrayBars, arr, i + 1, 0);
      return;
    }

    // change the color of the currently evaluated array bars 
    arrayBars[j].style.backgroundColor = COLOUR_COMPARISON
    arrayBars[j + 1].style.backgroundColor = COLOUR_COMPARISON

    if (arr[j] > arr[j + 1]) {
      swap(arr, j, j + 1);
      arrayBars[j].style.backgroundColor = COLOUR_SORTED;
      arrayBars[j + 1].style.backgroundColor = COLOUR_SORTED;

      setData([...arr]);
    }

    // set timeout to slow down the sort animation
    setTimeout(() => {
      // one bubble arrived at the top so color it accordingly
      arrayBars[j].style.backgroundColor = COLOUR_DEFAULT;
      arrayBars[j + 1].style.backgroundColor = COLOUR_SORTED;
      // move to the next iteration
      bubbleSortStep(arrayBars, arr, i, j + 1);
    }, 100);
  }

  function doSomeMagic() {
    const sortedData = [...data];
    const arrayBars = document.getElementsByClassName('bar');
    bubbleSortStep(arrayBars, sortedData, 0, 0);
  }

  function handleDataSizeChange(event) {
    const nextSize = parseFloat(event.target.value);

    // generate new array everytime dataSize is changed
    setData([...Array(nextSize)].map(() => randomize(10, 400)));

    // recolor the bars as array is being resized
    const arrayBars = document.getElementsByClassName('bar');
    Array.from(arrayBars).forEach(element => {
      element.style.backgroundColor = COLOUR_DEFAULT
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
        {dataComponent}
        {isSizeVisible && <div className="info visible">{barsCount}</div>}
      </div>
      <div>
        <input
          type="range"
          id="datasize"
          value={barsCount}
          min={DATASIZE_MIN}
          max={DATASIZE_MAX}
          onMouseDown={() => setIsSizeVisible(true)}
          onMouseUp={() => setIsSizeVisible(false)}
          onChange={handleDataSizeChange}
        />
        <label htmlFor="datasize">Bar number</label>
      </div>
      <button onClick={doSomeMagic}>sort</button>
    </>
  );
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
