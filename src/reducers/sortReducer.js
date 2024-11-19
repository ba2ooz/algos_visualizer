import { randomize } from "../shared/utils";

export const initialState = {
    sortSpeed: 15,
    data: [...Array(100)].map(() => randomize(10, 400))
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
                data: [...Array(action.dataSize)].map(() => randomize(10, 400))
            };
        }
        case 'changed_speed': {
            return {
                ...state,
                sortSpeed: action.sortSpeed
            };
        }
        default: {
            throw Error('Uknown action: ' + action.type);
        }
    }
}
