import { COLORS } from "../shared/utils";

let animations = [];

export function mergeSort(arr) {
    // reset animations array
    animations = [];

    divideMerge(arr, 0, arr.length - 1);

    return animations;
}

function divideMerge(arr, left, right) {
    if (left >= right)
        return;

    let mid = Math.floor(left + (right - left) / 2);
    divideMerge(arr, left, mid);
    divideMerge(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
    // initialize merging subarrays
    const N1 = mid - left + 1;
    const N2 = right - mid;
    const L = new Array(N1);
    const R = new Array(N2);
    const pivot = mid + 1;

    // intialize animation helper arrays
    let auxArr = {};
    auxArr.L = [];
    auxArr.R = [];
    auxArr.K = [];
    auxArr.MergedData = [];

    let animation_step = {};

    // mark the whole array as inactive with the appropriate color
    for (let i = 0; i < arr.length; i++)
        animation_step = { ...animation_step, [i]: COLORS.INACTIVE };
    animations.push(animation_step);

    // prepare the animation_step object for the next animation
    animation_step = {};

    for (let i = 0; i < N1; i++) {
        // copy the left subarray data to collection L
        L[i] = arr[left + i];
        // note the left subarray data index
        auxArr.L[i] = left + i;
        // mark the left subarray as active with the appropriate color  
        animation_step = { ...animation_step, [left + i]: COLORS.DEFAULT };
    }

    for (let i = 0; i < N2; i++) {
        // copy the right subarray data to collection R
        R[i] = arr[pivot + i];
        // note the right subarray data index 
        auxArr.R[i] = pivot + i;
        // mark the right subarray as active with the appropriate color
        animation_step = { ...animation_step, [pivot + i]: COLORS.DEFAULT };
    }

    // set the active subarray animation
    animations.push(animation_step);

    // set active subarray mid point
    const activeSubArrayPivot = {
        [pivot]: COLORS.PIVOT
    };
    animations.push(activeSubArrayPivot);


    let i = 0;      // index for left subarray
    let j = 0;      // index for right subarray
    let auxId = 0;  // index for helper array
    let k = left;   // index for original array

    // start comparing the left and right subarrays
    while (i < N1 && j < N2) {
        // push compare animation for the corresponding indexes of the original array
        animation_step = color('compared', auxArr.L[i], auxArr.R[j]);
        animations.push(animation_step);

        // the value in the right subarray is smaller than the one in the left
        if (L[i] > R[j]) {
            // reset default animation for the compared indexes
            // making sure the pivot keeps its color 
            animation_step = (auxArr.R[j] === pivot)
                ? color('reset_pivot', auxArr.R[j], auxArr.L[i])
                : color('reset', auxArr.L[i], auxArr.R[j])
            animations.push(animation_step);

            // the smaller value in the right subarray 
            // goes to the left in the original array
            arr[k] = R[j];

            // keep a copy of the changed original array data and indexes
            // to build the sort animations array after merge is done
            auxArr.MergedData[auxId] = arr.slice();
            auxArr.K[auxId++] = k;
            j++;
        } else {
            // reset default animation for the compared indexes
            // making sure the pivot keeps its color 
            animation_step = (auxArr.R[j] === pivot)
                ? color('reset_pivot', auxArr.R[j], auxArr.L[i])
                : color('reset', auxArr.L[i], auxArr.R[j])
            animations.push(animation_step);

            // the smaller value in the left subarray 
            // goes to the left in the original array
            arr[k] = L[i];

            // keep a copy of the changed original array data and indexes
            // to build the sort animations array after merge is done
            auxArr.MergedData[auxId] = arr.slice();
            auxArr.K[auxId++] = k;
            i++;
        }

        k++;
    }

    // move the reamaining data in left subarray collection, L.
    while (i < N1) {
        animation_step = color('compared', auxArr.L[i], k);
        animations.push(animation_step);

        // check for k == pivot instead of L[i] == pivot, because L[i] goes till pivot exclusively
        animation_step = (k === pivot)
            ? color('reset_pivot', pivot, auxArr.L[i])
            : color('reset', auxArr.L[i], k);
        animations.push(animation_step);

        arr[k] = L[i];
        auxArr.MergedData[auxId] = arr.slice();
        auxArr.K[auxId++] = k;

        k++;
        i++;
    }

    // move the reamaining data in right subarray collection, R.
    while (j < N2) {
        animation_step = color('compared', auxArr.R[j], k);
        animations.push(animation_step);

        if (auxArr.R[j] === k && k === pivot)
            animation_step = color('reset_pivot', k, null);
        else if (k === pivot)
            animation_step = color('reset_pivot', k, auxArr.R[j]);
        else if (auxArr.R[j] === pivot)
            animation_step = color('reset_pivot', auxArr.R[j], k);
        else
            animation_step = color('reset', auxArr.R[j], k);
        animations.push(animation_step);

        arr[k] = R[j];
        auxArr.MergedData[auxId] = arr.slice();
        auxArr.K[auxId++] = k;

        k++;
        j++;
    }

    // set pivot to default color
    animation_step = color('reset', pivot, null);
    animations.push(animation_step);

    // start pushing the merge animations 
    for (let k = 0; k < auxArr.MergedData.length; k++) {
        animations.push(color('sorted', auxArr.K[k], null));
        animations.push({ data_change: auxArr.MergedData[k] });
    }
}

function color(action, pos1, pos2) {
    switch (action) {
        case 'compared':
            return {
                [pos1]: COLORS.COMPARED,
                [pos2]: COLORS.COMPARED,
            };
        case 'reset':
            return {
                [pos1]: COLORS.DEFAULT,
                [pos2]: COLORS.DEFAULT,
            };
        case 'reset_pivot':
            return {
                [pos1]: COLORS.PIVOT,
                [pos2]: COLORS.DEFAULT,
            }
        case 'sorted': {
            return {
                [pos1]: COLORS.SORTED,
            };
        };
    }
}