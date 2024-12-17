import { bubbleSort } from "./bubbleSort"
import { mergeSort } from "./mergeSort"
import { quickSort } from "./quickSort"

export const availableAlgorithms = [
    { name: 'Bubble Sort', execute: bubbleSort },
    { name: 'Merge Sort', execute: mergeSort },
    { name: 'Quick Sort', execute: quickSort },
]