export function updateTeacherReducer(state, action) {

    // debugger;
    console.log(state, action, "statesss")

    switch (action.type) {
        case "open_popup": {
            return {
                ...state,
                open: true,
                openData: action.openData,
            }
        }
        case "drawer": {
            console.log(action.payload, "Payload")
            const _data = action.payload;
            return {
                ...state,
                [action.key]: _data,
            }
        }
        case "close_popup": {
            return {
                ...state,
                open: false,
            }
        }

        default:
            return state;
    }
}