import { useState } from 'react';
import './app.css';

const COLOUR_COMPARISON = 'purple';
const COLOUR_SORTED = 'green';
const COLOUR_DEFAULT = 'gold';

function App() {
  const dataSize = 20;
  const [data, setData] = useState([...Array(dataSize)].map(() => randomize(10, 400)));
  const dynamicWidth = Math.round(1000 / data.length);
  const dynamicMargin = (dataSize > 200) ? (dynamicWidth / 10) : 0.5;

  function swap(arr, i, j){
    let aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
  };

  function bubbleSortStep(arrayBars, arr, i, j) {
    // stop, arr is sorted
    if (i >= arr.length - 1){
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
    arrayBars[j+1].style.backgroundColor = COLOUR_COMPARISON
    
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
  
  const dataComponent = data.map((value, id) => {
    return (
      <div key={id}
        className='bar'
        style={{
          height: value,
          width: dynamicWidth,
          margin: dynamicMargin
        }}>
      </div>
    )
  });

  return (
    <>
    <div className="app">
      {dataComponent}
    </div>
    <button onClick={doSomeMagic}>sort</button>
    </>
  );
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
