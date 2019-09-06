const initialState = {
    permission: [],
    permissionLoading: true,
}


export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_PERMISSION':
            return {
                ...state,
                permission: action.payload,
                permissionLoading: false,
            };
        default: return state;
    }
}