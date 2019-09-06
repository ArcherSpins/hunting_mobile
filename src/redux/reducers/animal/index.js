const initialState = {
    animals: [],
    loadingAnimals: true,
    activeAnimal: {
        image: '',
        description: '',
        name: '',
        loading: true,
    },
};


export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ANIMALS':
            return {
                ...state,
                animals: action.payload,
                loadingAnimals: false,
            };
        case 'SET_ACTIVE_ANIMAL':
            return {
                ...state,
                activeAnimal: {
                    ...action.payload,
                    loading: false,
                },
            };
        case 'LOADING_STOP_ANIMALS':
            return {
                ...state,
                loadingAnimals: true,
            };
        case 'NOT_ACTIVE_ANIMAL_LOADING':
            return {
                ...state,
                activeAnimal: {
                    ...state.activeAnimal,
                    loading: true,
                },
            };
        default: return state;
    };
};

