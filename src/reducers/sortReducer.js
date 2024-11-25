import { COLORS, randomize } from "../shared/utils";

export const initialState = {
    speed: 15,
    algorithm: 0, // represents an index
    data: [...Array(100)].map(() => randomize(10, 400)),
    animations: [...Array(100)].map(() => COLORS.DEFAULT)
};

export function sortReducer(state, action) {
    switch (action.type) {
        case 'changed_algorithm': {
            return {
                ...state,
                algorithm: action.selectedAlgorithm
            }
        }
        case 'changed_data': {
            return {
                ...state,
                data: action.data
            };
        }
        case 'changed_dataSize': {
            return {
                ...state,
                data: [...Array(action.dataSize)].map(() => randomize(10, 400)),
                animations: [...Array(action.dataSize)].map(() => COLORS.DEFAULT)
            };
        }
        case 'changed_animation': {
            const newAnimations = [...state.animations];
            newAnimations[action.barId] = action.color;

            return {
                ...state,
                animations: newAnimations
            };
        }
        case 'changed_animation_reset': {
            return {
                ...state,
                animations: [...Array(state.animations.length)].map(() => COLORS.DEFAULT)
            };
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
