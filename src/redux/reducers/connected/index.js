const initialState = {
    connected: true,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CONNECT':
            return {
                ...state,
                connected: action.payload,
            }
        default: return state;
    }
}

