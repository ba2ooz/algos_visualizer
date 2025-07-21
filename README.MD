# Algos Visualizer

A React app for visualizing sorting algorithms with interactive controls and animations.

## Demo
Try it here: [https://ba2ooz.github.io/algos_visualizer/](https://ba2ooz.github.io/algos_visualizer/)

## Features

- Visualize different algorithms
- Adjust array size and animation speed
- Play/pause and step through sorting animations history manually 
- Choose initial array order (random, ascending, descending)
- Responsive and modern UI

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

```sh
git clone https://github.com/ba2ooz/algos_visualizer.git
cd algos_visualizer
npm install
npm start
```

> _Open [http://localhost:3000](http://localhost:3000) to view the app._

## Project Structure

- `src/algorithms/` - Sorting algorithm implementations and animation utilities
- `src/components/` - UI components (controls, sliders, array bars, icons)
- `src/reducers/` - State management reducer
- `src/shared/` - Shared utilities and constants

## Adding New Algorithms

To add a new sorting algorithm:
1. Implement the algorithm in `src/algorithms/`.
2. Export it in [`algorithmsCollection.js`](src/algorithms/algorithmsCollection.js).
3. The new algorithm will appear in the algorithm selection dropdown.
