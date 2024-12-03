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

    let animation_step = {};

    // mark the whole array as inactive with the appropriate color
    for (let i = 0; i < arr.length; i++)
        animation_step = { ...animation_step, [i]: COLORS.INACTIVE };
    animations.push({ animation_step });

    // prepare the animation_step object for the next animation
    animation_step = {};

    for (let i = 0; i < N1; i++) {
        // copy the left subarray data to temp collection L
        L[i] = arr[left + i];

        // note from which index in the original array the data is being copied over.
        // this will be used to create the comparison animation between L[i] and R[i] 
        auxArr.L[i] = left + i;

        // mark the left subarray as active with the appropriate color  
        animation_step = { ...animation_step, [left + i]: COLORS.DEFAULT };
    }

    for (let i = 0; i < N2; i++) {
        // copy the right subarray data to temp collection R
        R[i] = arr[pivot + i];

        // note from which index in the original array the data is being copied over.
        // this will be used to create the comparison animation between L[i] and R[i] 
        auxArr.R[i] = pivot + i;

        // mark the right subarray as active with the appropriate color
        animation_step = { ...animation_step, [pivot + i]: COLORS.DEFAULT };
    }

    // set the active subarray animation
    animations.push({ animation_step });

    // set active subarray mid point
    const activeSubArrayPivot = {
        [pivot]: COLORS.PIVOT
    };
    animations.push({ activeSubArrayPivot });


    let i = 0;      // index for left subarray
    let j = 0;      // index for right subarray
    let auxId = 0;  // index for helper array
    let k = left;   // index for original array

    // start comparing the left and right subarrays
    while (i < N1 && j < N2) {
        // push compare animation for the corresponding indexes of the original array
        animation_step = color('compared', auxArr.L[i], auxArr.R[j]);
        animations.push({ animation_step });

        // the value in the right subarray is smaller than the one in the left
        if (L[i] > R[j]) {
            // reset default animation for the compared indexes
            // making sure the pivot keeps its color 
            animation_step = (auxArr.R[j] === pivot)
                ? color('reset_pivot', auxArr.R[j], auxArr.L[i])
                : color('reset', auxArr.L[i], auxArr.R[j])
            animations.push({ animation_step });

            // the smaller value in the right subarray 
            // goes to the left in the original array
            arr[k] = R[j];

            // keep a copy of the changed original array data and indexes
            // to build the sort animations array after merge is done
            auxArr.K[auxId] = { [k]: R[j] };
            auxId++;
            j++;
        } else {
            // reset default animation for the compared indexes
            // making sure the pivot keeps its color 
            animation_step = (auxArr.R[j] === pivot)
                ? color('reset_pivot', auxArr.R[j], auxArr.L[i])
                : color('reset', auxArr.L[i], auxArr.R[j])
            animations.push({ animation_step });

            // the smaller value in the left subarray 
            // goes to the left in the original array
            arr[k] = L[i];

            // keep a copy of the changed original array data and indexes
            // to build the sort animations array after merge is done
            auxArr.K[auxId] = { [k]: L[i] };
            auxId++;
            i++;
        }

        k++;
    }

    // move the reamaining data in left subarray collection, L.
    while (i < N1) {
        // only highlight the auxArr.L[i], at this point all L[i] data is sorted and simply copied over to arr[k]
        animation_step = color('compared', auxArr.L[i], null);
        animations.push({ animation_step });

        // reset highlighted to default
        // no pivot reset needed, pivot can only match R[0]
        animation_step = color('reset', auxArr.L[i], null);
        animations.push({ animation_step });

        arr[k] = L[i];
        auxArr.K[auxId] = { [k]: L[i] };

        auxId++;
        k++;
        i++;
    }

    // move the reamaining data in right subarray collection, R.
    while (j < N2) {

        // no need to compare auxArr.R[j] to k, at this point they always point to same location
        animation_step = color('compared', auxArr.R[j], null);
        animations.push({ animation_step });

        // if j == 0 is true then auxArr.R[j] == pivot is also true regardless of pivot value
        animation_step = (j === 0)
            ? color('reset_pivot', auxArr.R[j], null)
            : color('reset', auxArr.R[j], null);
        animations.push({ animation_step });

        arr[k] = R[j];
        auxArr.K[auxId] = { [k]: R[j] };

        auxId++;
        k++;
        j++;
    }

    // set pivot to default color
    animation_step = color('reset', pivot, null);
    animations.push({ animation_step });

    // start pushing the merge animations 
    for (auxId = 0; auxId < auxArr.K.length; auxId++) {
        // Object.keys(auxArr.K[auxId])[0] contains the original array index that we want to mark as sorted
        // auxArr.K[auxId] contains the id-value pair that has to be overriden in the og array
        animation_step = color('sorted', Object.keys(auxArr.K[auxId])[0]);
        animations.push({ data_change: auxArr.K[auxId], animation_step });
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
            return {
                [pos1]: COLORS.SORTED,
            };
        };
    }
}