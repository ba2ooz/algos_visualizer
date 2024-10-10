import './app.css';

function App() {
  const dataSize = 210;
  const data = [...Array(dataSize)].map(() => randomize(10, 400));
 
  const dynamicWidth = Math.round(1000 / data.length);
  const dynamicMargin = (dataSize > 200) ? (dynamicWidth / 10) : 0.5;
  
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
    <div className="app">
      {dataComponent}
    </div>
  );
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default App;
