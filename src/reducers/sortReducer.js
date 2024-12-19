import { COLORS, randomize } from "../shared/utils";

const MIN_DATA_VALUE=10;
const MAX_DATA_VALUE=350;
const INIT_DATA_SIZE=70;

export const initialState = {
    speed: 15,
    algorithm: 0, // represents an index
    pauseResume: { animationIndex: -1, stepIndex: -1},
    data: [...Array(INIT_DATA_SIZE)].map(() => randomize(MIN_DATA_VALUE, MAX_DATA_VALUE)),
    arrayAnimationState: [...Array(INIT_DATA_SIZE)].map(() => COLORS.DEFAULT)
};

export function sortReducer(state, action) {
    switch (action.type) {
        case 'changed_algorithm': {
            return {
                ...state,
                pauseResume: { animationIndex: -1, stepIndex: -1},
                algorithm: action.selectedAlgorithm
            }
        }
        case 'changed_data': {
            const newData = [...state.data];
            for (const [id, value] of Object.entries(action.data))
                newData[id] = value;
                
            return {
                ...state,
                data: newData
            };
        }
        case 'changed_dataSize': {
            return {
                ...state,
                pauseResume: { animationIndex: -1, stepIndex: -1},
                data: [...Array(action.dataSize)].map(() => randomize(MIN_DATA_VALUE, MAX_DATA_VALUE)),
                arrayAnimationState: [...Array(action.dataSize)].map(() => COLORS.DEFAULT)
            };
        }
        case 'changed_animation': {
            const newArrayAnimationState = [...state.arrayAnimationState];
            for (const [id, value] of Object.entries(action.colors))
                newArrayAnimationState[id] = value;

            return {
                ...state,
                arrayAnimationState: newArrayAnimationState
            };
        }
        case 'changed_animation_pause': {
            return {
                ...state,
                pauseResume: { animationIndex: action.animationIndex, stepIndex: action.stepIndex },
            }
        }
        case 'changed_speed': {
            return {
                ...state,
                speed: action.sortSpeed
            };
        }
        default: {
            throw Error('Uknown action: ' + action.type);
        }
    }
}
