const initialState = {
    violations: [],
    loadingViolations: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_VIOLATIONS':
            return {
                ...state,
                violations: action.payload,
                loadingViolations: false,
            };
        default: return state;
    }
}