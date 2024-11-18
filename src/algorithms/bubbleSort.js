import { COLORS } from "../utils/colors";

export function bubbleSort(arr) {
    let animations = [];
    bubbleSortStep(animations, arr, 0, 0);
    return animations;
}

function bubbleSortStep(animations, arr, i, j) {
    const pos1 = j;
    const pos2 = j + 1;
    let animation_step = {};

    // stop, arr is sorted
    if (i >= arr.length - 1) {
        animation_step = { [pos1]: COLORS.SORTED };
        animations.push(animation_step);

        return;
    }

    // move to next iteration
    if (pos1 >= arr.length - i - 1) {
        // one bubble arrived at the top so color it accordingly
        animation_step = {
            [arr.length - i - 2]: COLORS.DEFAULT,
            [arr.length - i - 1]: COLORS.SORTED,
        };
        animations.push(animation_step);

        bubbleSortStep(animations, arr, i + 1, 0);

        return;
    }

    // currently evaluated positions 
    animation_step = {
        [pos1]: COLORS.COMPARED,
        [pos2]: COLORS.COMPARED,
    };
    animations.push(animation_step);

    if (arr[pos1] > arr[pos2]) {
        swap(arr, pos1, pos2);

        animation_step = {
            //[pos1]: COLORS.SORTED,
            //[pos2]: COLORS.SORTED,
            data_change: arr.slice()
        };
        animations.push(animation_step);
    }

    // reset default colour on either compared or swapped items
    animation_step = {
        [pos1]: COLORS.DEFAULT,
        [pos2]: COLORS.DEFAULT,
    };
    animations.push(animation_step);

    // move to the next iteration
    bubbleSortStep(animations, arr, i, pos2);
}

function swap(arr, i, j) {
    let aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
};