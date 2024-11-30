import { bubbleSort } from "./bubbleSort"
import { mergeSort } from "./mergeSort"

export const availableAlgorithms = [
    { name: 'Bubble Sort', execute: bubbleSort },
    { name: 'Merge Sort', execute: mergeSort },
]