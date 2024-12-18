import { COLORS } from "../shared/utils";
import { Animator } from "./utils";

const animator = new Animator();

export function mergeSort(arr) {
    // reset animations array
    animator.clear();

    divideMerge(arr, 0, arr.length - 1);

    // return animations;
    return animator.getAnimations();
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
    // initialize Left and Right subarrays
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

    // mark the whole array as inactive
    animator.setInactive_AllAtOnce(arr.length);

    // use step object to build the active partition animation
    let step = {};
    for (let i = 0; i < N1; i++) {
        // copy the left subarray data to temp collection L
        L[i] = arr[left + i];

        // note from which index in the original array the data is being copied over.
        // this will be used to create the comparison animation between L[i] and R[i] 
        auxArr.L[i] = left + i;

        // mark the current left subarray location as active 
        step[left + i] = COLORS.DEFAULT;
    }

    for (let i = 0; i < N2; i++) {
        // copy the right subarray data to temp collection R
        R[i] = arr[pivot + i];

        // note from which index in the original array the data is being copied over.
        // this will be used to create the comparison animation between L[i] and R[i] 
        auxArr.R[i] = pivot + i;

        // mark the current right subarray location as active
        step[pivot + i] = COLORS.DEFAULT;
    }

    animator.setPivot(pivot, step);
    animator.add(step);

    let i = 0;      // index for left subarray
    let j = 0;      // index for right subarray
    let k = left;   // index for original array
    let auxId = 0;  // index for helper array

    // compare left and right subarrays
    while (i < N1 && j < N2) {
        // locations compared in the original array
        animator.setCompared(auxArr.L[i], auxArr.R[j]);

        if (L[i] > R[j]) {
            // reset default animation for the compared indexes and pivot
            animator.setDefault(auxArr.R[j] === pivot, auxArr.R[j], auxArr.L[i]);

            // move R[j] to its correct location in the original array
            arr[k] = R[j];

            // copy of og array data and index will be used to build the merge animation
            auxArr.K[auxId] = { [k]: R[j] };
            auxId++;
            j++;
        } else {
            // reset default animation for the compared indexes and pivot
            animator.setDefault(auxArr.R[j] === pivot, auxArr.R[j], auxArr.L[i]);

            // move L[i] to its correct location in the original array
            arr[k] = L[i];

            // copy of og array data and index will be used to build the merge animation
            auxArr.K[auxId] = { [k]: L[i] };
            auxId++;
            i++;
        }

        k++;
    }

    // move the remaining item in left subarray collection, L.
    while (i < N1) {
        // highlight last item then reset, pivot check is false because it can only match R[0].
        animator.setCompared(auxArr.L[i]);
        animator.setDefault(false, auxArr.L[i]);

        arr[k] = L[i];
        auxArr.K[auxId] = { [k]: L[i] };

        auxId++;
        k++;
        i++;
    }

    // move the reamaining item in right subarray collection, R.
    while (j < N2) {
        // highlight last item then reset. if j == 0 then auxArr.R[j] == pivot.
        animator.setCompared(auxArr.R[j]);
        animator.setDefault(j === 0, auxArr.R[j]);

        arr[k] = R[j];
        auxArr.K[auxId] = { [k]: R[j] };

        auxId++;
        k++;
        j++;
    }

    // push the merge animations 
    for (auxId = 0; auxId < auxArr.K.length; auxId++) {
        // Object.keys(auxArr.K[auxId])[0] contains the original array index that we want to mark as sorted
        // auxArr.K[auxId] contains the id-value pair that has to be overriden(swapped) in the og array
        step = { [Object.keys(auxArr.K[auxId])[0]]: COLORS.SORTED };
        animator.addDataChange(auxArr.K[auxId], step);
    }
}