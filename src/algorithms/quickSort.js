import { Animator, swap } from "./utils";

const animator = new Animator();

export function quickSort(arr) {
    animator.clear();

    quickSortRecurse(arr, 0, arr.length - 1);

    // sort finished, mark the array as sorted 
    animator.setSorted_AllAtOnce(arr.length);

    return animator.getAnimations();
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

    // mark the active/inactive array parts
    animator.setInactive_AllAtOnce(arr.length);
    animator.setActivePartition(left, right + 1, pivotIndex);

    let i = left - 1;
    let j = right + 1;

    while (true) {
        // find next element bigger than the pivot on its left
        do {
            // reset current position color when it's not the boundery
            if (i !== left - 1) animator.setDefault(i === pivotIndex, i);
            
            // advance to next position and mark it as active comparison
            i++;
            animator.setCompared(i);
        } while (arr[i] < pivotValue);

        // find next element smaller than pivot on its right
        do {
            // reset current position color when it's not the boundery
            if (j !== right + 1) animator.setDefault(j === pivotIndex, j);

            // advance to next position and mark it as active comparison
            j--;
            animator.setCompared(j);
        } while (arr[j] > pivotValue);

        // left index has crossed right index, stop.
        if (i >= j) return j;

        // arr[i] > pivot, arr[j] < pivot, swap arr[i] and arr[j] 
        swap(arr, i, j);

        // update the pivot index
        if (i === pivotIndex) {
            pivotIndex = j;
        }
        else if (j === pivotIndex) {
            pivotIndex = i;
        }

        // animate swap 
        animator.addDataChange({ [j]: arr[j], [i]: arr[i] });
    }
}