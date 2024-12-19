import { COLORS } from "../shared/utils";

export class Animator {
    constructor() {
        this.animations = [];
    }

    clear() {
        this.animations = [];
    }

    add(animationStep) {
        this.animations.push([ animationStep ]);
    }

    addDataChange(dataObject, extraAnimationStep = new Object()) {
        this.animations.push([ extraAnimationStep, dataObject ]);
    }

    getAnimations() {
        return this.animations;
    }

    setDefault(pivot, pos1, pos2 = null) {
        let step = {};
        switch (pivot) {
            case true: {
                step = (pos2 === null)
                    ? { [pos1]: COLORS.PIVOT }
                    : { [pos1]: COLORS.PIVOT, [pos2]: COLORS.DEFAULT }
                break;
            }

            case false:
            default: {
                step = (pos2 === null)
                    ? { [pos1]: COLORS.DEFAULT }
                    : { [pos1]: COLORS.DEFAULT, [pos2]: COLORS.DEFAULT };
                break;
            }

        }

        this.add(step);
    }

    setCompared(pos1, pos2 = null) {
        const step = (pos2 === null)
            ? { [pos1]: COLORS.COMPARED }
            : { [pos1]: COLORS.COMPARED, [pos2]: COLORS.COMPARED };

        this.add(step);
    }

    setSorted(pos1, pos2 = null) {
        const step = (pos2 === null)
            ? { [pos1]: COLORS.SORTED }
            : { [pos1]: COLORS.SORTED, [pos2]: COLORS.SORTED };

        this.add(step);
    }

    setSorted_OneByOne(arrlength, asc = 1) {
        // asc = 1 => ascending
        // asc = 0 => descending 
        let step = {};
        switch (asc) {
            case 1: {
                for (let i = 0; i < arrlength; i++) {
                    step = { [i]: COLORS.SORTED };
                    this.add(step);
                }
                break;
            }

            case 0:
            default: {
                for (let i = arrlength; i >= 0; i--) {
                    step = { [i]: COLORS.SORTED };
                    this.add(step);
                }
                break;
            }
        }
    }

    setSorted_AllAtOnce(arrlength) {
        const step = {};
        for (let i = 0; i < arrlength; i++)
            step[i] = COLORS.SORTED;
        this.add(step);
    }

    setInactive_AllAtOnce(arrlength) {
        const step = {};
        for (let i = 0; i < arrlength; i++)
            step[i] = COLORS.INACTIVE;
        this.add(step);
    }

    setActivePartition(start, end, pivot = null) {
        const step = {};
        for (let i = start; i < end; i++)
            step[i] = COLORS.DEFAULT;

        if (pivot !== null)
            this.setPivot(pivot, step);

        this.add(step);
    }

    setPivot(pivot, animation_step = null) {
        // pivot can be set as part of a specifc animation step
        // add to animations array will be handled externally
        if (animation_step !== null) {
            animation_step[pivot] = COLORS.PIVOT

            return;
        }

        // pivot can be set as a separate animation step
        // add to animations array directly
        animation_step = { [pivot]: COLORS.PIVOT }
        this.add(animation_step);
    }
}

export function swap(arr, i, j) {
    let aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
};
