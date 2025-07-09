import { Animator, swap } from "./utils";

export function bubbleSort(arr) {
    if (arr.length < 1)
        return;

    const animator = new Animator();

    let n = arr.length;
    let i, j, swapped;

    for (i = 0; i < n - 1; i++) {
        swapped = false;
        let nextSortedBubblePos = n - i - 1;

        for (j = 0; j < nextSortedBubblePos; j++) {
            // currently evaluated positions 
            animator.setCompared(j, j + 1);

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;

                // swap occured, push new copy of the modifed array index-value pairs to ilustrate the swap 
                animator.addDataChange({ [j]: arr[j], [j + 1]: arr[j + 1] });
            }

            // reset default colour on either compared or swapped items
            animator.setDefault(false, j, j + 1);
        }

        if (!swapped) {
            // no swap occured during last comparison iteration
            // array is already sorted, push only sorted animations.
            animator.setSorted_OneByOne(nextSortedBubblePos, 0);

            break;
        }

        // one bubble arrived at the top so color it accordingly
        animator.setSorted(nextSortedBubblePos);
    }

    // set the last element as sorted
    // it is already sorted by the previous iterations 
    animator.setSorted(0);

    return animator.getAnimations();
}