export function loginReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload,
                error:''
            };
        }
        case 'login': {
            return {
                ...state,
                error: '',
                isLoading: true,
            };
        }
        case 'success': {
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            };
        }
        case 'error': {
            return {
                ...state,
                error: 'Incorrect username or password!',
                isLoggedIn: false,
                isLoading: false,
            };
        }
        case 'toggleotp': {
            return {
                ...state,
                showOtp: true
            };
        }
        // case 'logOut': {
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //     };
        // }
        default:
            return state;
    }
}
