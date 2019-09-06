const initialState = {
    listAnimals: [],
    loading: true,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_PERMISSION_DETAIL_ANIMALS':
            return {
                ...state,
                listAnimals: action.payload,
                loading: false,
            };
        default: return state;
    }
}
