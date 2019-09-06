const initialState = {
    default_animals: [],
    default_animals_coordinats: [],
    default_huntings: [],
    default_violations: [],
    hunting_farm: [],
    hunting_farm_location: [],

    loading_default_hunting_farm_location: true,
    loading_default_animals: true,
    loading_default_animals_coordinats: true,
    loading_default_huntings: true,
    loading_default_violations: true,
    loading_default_hunting_farm: true,

    errorAnimalsDefault: {
        errorLoaded: false,
        message: null
    },
    errorAnimalsDefaultCoordinats: {
        errorLoaded: false,
        message: null
    },
    errorHuntingsDefault: {
        errorLoaded: false,
        message: null
    },
    errorViolationsDefault: {
        errorLoaded: false,
        message: null
    },
    errorHuntingFarmDefault: {
        errorLoaded: false,
        message: null
    },
    errorHuntingFarmLocationDefault: {
        errorLoaded: false,
        message: null
    },

    stageLoading: 0,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_DEFAULT_ANIMALS':
            return {
                ...state,
                default_animals: action.payload,
                loading_default_animals: false,
                errorAnimalsDefault: {
                    errorLoaded: false,
                    message: null,
                },
                stageLoading: state.stageLoading + 1,
            };
        case 'SET_DEFAULT_ANIMALS':
            return {
                ...state,
                default_animals: action.payload,
                loading_default_animals: false,
                errorAnimalsDefault: {
                    errorLoaded: false,
                    message: null,
                },
            };
        case 'GET_DEFAULT_ANIMALS_COORDINATS':
            return {
                ...state,
                default_animals_coordinats: action.payload,
                stageLoading: state.stageLoading + 1,
                loading_default_animals_coordinats: false,
                errorAnimalsDefaultCoordinats: {
                    errorLoaded: false,
                    message: null
                },
            }
        case 'SET_DEFAULT_ANIMALS_COORDINATS':
            return {
                ...state,
                default_animals_coordinats: action.payload,
                loading_default_animals_coordinats: false,
                errorAnimalsDefaultCoordinats: {
                    errorLoaded: false,
                    message: null
                },
            }
        case 'GET_DEFAULT_HUNTINGS':
            return {
                ...state,
                loading_default_huntings: false,
                default_huntings: action.payload,
                stageLoading: state.stageLoading + 1,
                errorAnimalsDefaultCoordinats: {
                    errorLoaded: false,
                    message: null
                },
            }
        case 'SET_DEFAULT_HUNTINGS':
            return {
                ...state,
                loading_default_huntings: false,
                default_huntings: action.payload,
                errorAnimalsDefaultCoordinats: {
                    errorLoaded: false,
                    message: null
                },
            }
        case 'ERROR_DEFAULT_ANIMALS_LOADING':
            return {
                ...state,
                default_animals: [],
                loading_default_animals: false,
                errorAnimalsDefault: {
                    errorLoaded: true,
                    message: action.payload,
                }
            }
        case 'ERROR_DEFAULT_ANIMALS_COORDINATS_LOADING':
            return {
                ...state,
                default_animals_coordinats: [],
                loading_default_animals_coordinats: false,
                errorAnimalsDefaultCoordinats: {
                    errorLoaded: true,
                    message: action.payload,
                },
            }
        case 'ERROR_DEFAULT_HUNTINGS':
            return {
                ...state,
                loading_default_huntings: false,
                default_huntings: [],
                errorHuntingsDefault: {
                    errorLoaded: true,
                    message: action.payload,
                },
            }
        // violations    
        case 'ERROR_DEFAULT_VIOLATIONS':
            return {
                ...state,
                loading_default_violations: false,
                default_violations: [],
                errorViolationsDefault: {
                    errorLoaded: true,
                    message: action.payload,
                },
            }
        case 'GET_DEFAULT_VIOLATIONS':
            return {
                ...state,
                default_violations: action.payload,
                stageLoading: state.stageLoading + 1,
                errorViolationsDefault: {
                    errorLoaded: false,
                    message: null
                },
                loading_default_violations: false,
            }
        case 'SET_DEFAULT_VIOLATIONS':
            return {
                ...state,
                default_violations: action.payload,
                errorViolationsDefault: {
                    errorLoaded: false,
                    message: null
                },
                loading_default_violations: false,
            }
        // get hunting farm    
        case 'GET_DEFAULT_HUNTING_FARM':
                return {
                    ...state,
                    stageLoading: state.stageLoading + 1,
                    hunting_farm: action.payload,
                    errorHuntingFarmDefault: {
                        errorLoaded: false,
                        message: null
                    },
                    loading_default_hunting_farm: false,
                }
        case 'SET_DEFAULT_HUNTING_FARM':
            return {
                ...state,
                hunting_farm: action.payload,
                errorHuntingFarmDefault: {
                    errorLoaded: false,
                    message: null
                },
                loading_default_hunting_farm: false,
            }
        case 'ERROR_DEFAULT_HUNTING_FARM':
            return {
                ...state,
                loading_default_hunting_farm: false,
                hunting_farm: [],
                errorHuntingFarmDefault: {
                    errorLoaded: true,
                    message: action.payload,
                },
            }

        // hunting farm location    
        case 'GET_DEFAULT_HUNTING_FARM_LOCATION':
            return {
                ...state,
                stageLoading: state.stageLoading + 1,
                hunting_farm_location: action.payload,
                errorHuntingFarmLocationDefault: {
                    errorLoaded: false,
                    message: null
                },
                loading_default_hunting_farm_location: false,
            }
        case 'SET_DEFAULT_HUNTING_FARM_LOCATION':
            console.log(action.payload)
            return {
                ...state,
                hunting_farm_location: action.payload,
                errorHuntingFarmLocationDefault: {
                    errorLoaded: false,
                    message: null
                },
                loading_default_hunting_farm_location: false,
            }
        case 'ERROR_DEFAULT_HUNTING_FARM_LOCATION':
            return {
                ...state,
                loading_default_hunting_farm_location: false,
                hunting_farm_location: [],
                errorHuntingFarmLocationDefault: {
                    errorLoaded: true,
                    message: action.payload,
                },
            }
            
        case 'RESET_LOADING':
            return {
                ...state,
                stageLoading: 0,
            }
        default: return state;
    }
}