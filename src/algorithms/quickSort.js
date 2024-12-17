import { COLORS } from "../shared/utils";

let animation_step = {};
let animations = [];

export function quickSort(arr) {
    animations = [];
    quickSortRecurse(arr, 0, arr.length - 1);

    // sort finished, mark the array as sorted 
    animation_step = {};
    for (let i = 0; i < arr.length; i++) {
        animation_step = { ...animation_step, [i]: color('sorted', i) }
    }
    animations.push(animation_step);

    return animations;
}

function quickSortRecurse(arr, left, right) {
    if (left >= right)
        return;
    let pivot = hoarePartition(arr, left, right);
    quickSortRecurse(arr, left, pivot);
    quickSortRecurse(arr, pivot + 1, right);
}

function hoarePartition(arr, left, right) {
    // let pivot be the middle of the current array partition
    let pivotIndex = Math.floor(left + (right - left) / 2);
    let pivotValue = arr[pivotIndex];

    // mark the whole array as inactive with the appropriate color
    animation_step = {};
    for (let i = 0; i < arr.length; i++)
        animation_step = { ...animation_step, [i]: COLORS.INACTIVE };
    animations.push({ animation_step });

    // set the active subarray
    animation_step = {};
    for (let i = left; i < right + 1; i++) {
        animation_step = { ...animation_step, [i]: COLORS.DEFAULT };
    }

    // set active pivot
    animation_step = {
        ...animation_step,
        [pivotIndex]: COLORS.PIVOT
    };
    animations.push({ animation_step });

    // set the bounderies of the current partition
    let i = left - 1;
    let j = right + 1;

    while (true) {
        // find next element bigger than the pivot on its left
        do {
            // if current index is the boundery index then skip
            // otherwise set the needed animation color
            if (i !== left - 1) {
                animation_step = (i === pivotIndex)
                    ? color('reset_pivot', i)
                    : color('reset', i);
                animations.push({ animation_step });
            }

            // move to next position
            i++;

            // set the compare animation color
            animation_step = color('compared', i);
            animations.push({ animation_step });
        } while (arr[i] < pivotValue);

        // find next element smaller than pivot on its right
        do {
            // if current index is the boundery index then skip
            // otherwise set the needed animation color
            if (j !== right + 1) {
                animation_step = (j === pivotIndex)
                    ? color('reset_pivot', j)
                    : color('reset', j);
                animations.push({ animation_step });
            }

            // move to next position
            j--;

            // set the compare animation color
            animation_step = color('compared', j);
            animations.push({ animation_step });
        } while (arr[j] > pivotValue);

        // left index has crossed right index, stop.
        if (i >= j) return j;

        // swap found bigger left with found smaller right 
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;

        // update the pivot index
        if (i === pivotIndex) {
            pivotIndex = j;
        }
        else if (j === pivotIndex) {
            pivotIndex = i;
        }

        // push new copy of the modifed array index-value pairs to ilustrate the swap 
        animations.push({ data_change: { [j]: arr[j], [i]: arr[i] } });
    }
}


function color(action, pos1, pos2 = null) {
    switch (action) {
        case 'compared':
            return (pos2 === null)
                ? { [pos1]: COLORS.COMPARED }
                : { [pos1]: COLORS.COMPARED, [pos2]: COLORS.COMPARED };
        case 'reset':
            return (pos2 === null)
                ? { [pos1]: COLORS.DEFAULT }
                : { [pos1]: COLORS.DEFAULT, [pos2]: COLORS.DEFAULT };
        case 'reset_pivot':
            return (pos2 === null)
                ? { [pos1]: COLORS.PIVOT }
                : { [pos1]: COLORS.PIVOT, [pos2]: COLORS.DEFAULT }
        case 'sorted': {
            return (pos2 === null)
                ? { [pos1]: COLORS.SORTED }
                : { [pos1]: COLORS.SORTED, [pos2]: COLORS.SORTED };
        };
    }
}