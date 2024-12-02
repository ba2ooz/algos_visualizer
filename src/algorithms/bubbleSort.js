import { COLORS } from "../shared/utils";

export function bubbleSort(arr) {
    if (arr.length < 1)
        return;

    let animation_step = {};
    let animations = [];
    let n = arr.length;
    let i, j, swapped;

    for (i = 0; i < n - 1; i++) {
        swapped = false;
        let nextSortedBubblePos = n - i - 1;

        for (j = 0; j < nextSortedBubblePos; j++) {
            // currently evaluated positions 
            animation_step = color('compared', j, j + 1);
            animations.push(animation_step);

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;

                // swap accured, push new copy of the modifed array to ilustrate the swap 
                animation_step = { data_change: { [j]: arr[j], [j + 1]: arr[j + 1] } };
                animations.push(animation_step);
            }

            // reset default colour on either compared or swapped items
            animation_step = color('reset', j, j + 1);
            animations.push(animation_step);
        }

        if (!swapped) {
            // no swap accured during last comparison iteration
            // array is already sorted, push only sorted animations.
            do {
                animation_step = color('sorted', nextSortedBubblePos - 1, nextSortedBubblePos);
                animations.push(animation_step);
            } while ((nextSortedBubblePos--) > 0)

            break;
        }

        // one bubble arrived at the top so color it accordingly
        animation_step = color('sorted', nextSortedBubblePos - 1, nextSortedBubblePos);
        animations.push(animation_step);
    }

    // whole arr is sorted, color the last position.
    animation_step = color('sorted', 0, null);
    animations.push(animation_step);

    return animations;
}

function swap(arr, i, j) {
    let aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
};

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
        case 'sorted': {
            if (pos2 !== null && pos2 > pos1)
                return {
                    [pos1]: COLORS.DEFAULT,
                    [pos2]: COLORS.SORTED,
                };

            return { [pos1]: COLORS.SORTED };
        };
    }
}