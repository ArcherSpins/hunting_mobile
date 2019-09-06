const INITIAL_STATE = {
    huntings: [],
    loadingHunting: true,
    hunting_description: '',
    hunting_farm_area: 0,
    huntingMapCoordinats: [],
    loadingMapHunting: true,
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_HUNTINGS':
            return {
                ...state,
                huntings: action.payload,
                loadingHunting: false,
            };
        case 'NOT_LOAD_HUNTING':
            return {
                ...state,
                loadingHunting: true,
            };
        case 'SET_DETAIL_HUNTING_DATA':
            return {
                ...state,
                hunting_description: action.payload.hunting_farm_description,
                hunting_farm_area: action.payload.hunting_farm_area,
            }
        case 'SET_HUNTING_COORDINAT':
            return {
                ...state,
                huntingMapCoordinats: action.payload,
                loadingMapHunting: false,
            };
        case 'NOT_MAP_LOADING':
            return {
                ...state,
                loadingMapHunting: true,
            };
        default: return state;
    }
}