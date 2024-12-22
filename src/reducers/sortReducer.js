import { COLORS, randomize } from "../shared/utils";

const MIN_DATA_VALUE=10;
const MAX_DATA_VALUE=350;
const INIT_DATA_SIZE=70;

export const initialState = {
    speed: 15,
    algorithm: 0, // represents an index
    pauseResume: { animationIndex: -1, stepIndex: -1},
    data: [...Array(INIT_DATA_SIZE)].map(() => randomize(MIN_DATA_VALUE, MAX_DATA_VALUE)),
    arrayAnimationState: [...Array(INIT_DATA_SIZE)].map(() => COLORS.DEFAULT),
    history: []
};

export function sortReducer(state, action) {
    switch (action.type) {
        case 'changed_algorithm': {
            return {
                ...state,
                pauseResume: { animationIndex: -1, stepIndex: -1},
                algorithm: action.selectedAlgorithm,
                history: []
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
                arrayAnimationState: [...Array(action.dataSize)].map(() => COLORS.DEFAULT),
                history: []
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
        case 'exited_animation': {
            let newHistory = [...state.history]; 
            if (action.animationIndex === -1)
                newHistory = [];

            return {
                ...state,
                pauseResume: { animationIndex: action.animationIndex, stepIndex: action.stepIndex },
                history: action.animationIndex === -1 ? [] : [...state.history]           // clear history when index is set to default
            }
        }
        case 'changed_speed': {
            return {
                ...state,
                speed: action.sortSpeed
            };
        }
        case 'snapshot_history': {
            return {
                ...state,
                pauseResume: { animationIndex: action.animationIndex, stepIndex: action.stepIndex },        // next resume indexes
                history: [
                    ...state.history,
                    {
                        data: state.data,                                                                    // add current state data array
                        arrayAnimationState: state.arrayAnimationState,                                      // add current state animations state
                        pauseResume: state.pauseResume,                                                      // add current resume indexes
                    },
                ],
            }
        }
        case 'rollbacked_history': {
            if (state.history.length === 0) {
                return state;           // no history to rollback to
            }

            const previousState = state.history[state.history.length - 1];  // get previous state
            const newHistory = state.history.slice(0, -1);                  // remove last state from history

            return {
                ...state,            // add unchaged data to the new state
                ...previousState,    // restore state to previous version
                history: newHistory, // update history to exclude the rolledback state
            };
        }

        default: {
            throw Error('Uknown action: ' + action.type);
        }
    }

}