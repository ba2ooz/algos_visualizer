import { COLORS, randomize } from "../shared/utils";

export const initialState = {
    speed: 15,
    data: [...Array(100)].map(() => randomize(10, 400)),
    animations: [...Array(100)].map(() => COLORS.DEFAULT)
};

export function sortReducer(state, action) {
    switch (action.type) {
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
