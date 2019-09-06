const initialState = {
    user: null,
    formLoading: true,
    location: null,
    locationLoading: false,
}


export default (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOADING_FORM':
            return {
                ...state,
                formLoading: false,
            }
        case 'GET_LOCATION':
            return {
                ...state,
                locationLoading: true,
            }
        case 'SET_LOCATION':
            return {
                ...state,
                locationLoading: false,
                location: action.payload
            }
        default: return state;
    }
}