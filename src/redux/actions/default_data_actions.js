
// animals
export const getDefaultAnimals = (animals, type) => ({
    type: type || 'GET_DEFAULT_ANIMALS',
    payload: animals,
});

export const setErrorDefaultAnimalLoading = (message) => ({
    type: 'ERROR_DEFAULT_ANIMALS_LOADING',
    payload: message,
});


// animals coordinats
export const getDefaultAnimalsCoordinats = (coordinats, type) => ({
    type: type || 'GET_DEFAULT_ANIMALS_COORDINATS',
    payload: coordinats,
});

export const setErrorDefaultAnimalCoordinatsLoading = (message) => ({
    type: 'ERROR_DEFAULT_ANIMALS_COORDINATS_LOADING',
    payload: message,
});

// huntings
export const getDefaultHuntings = (huntings, type) => ({
    type: type || 'GET_DEFAULT_HUNTINGS',
    payload: huntings,
});

export const setErrorDefaultHuntingsLoading = (message) => ({
    type: 'ERROR_DEFAULT_HUNTINGS',
    payload: message,
});

// violations
export const getDefaultViolations = (violations, type) => {
    return {
        type: type || 'GET_DEFAULT_VIOLATIONS',
        payload: violations,
    };
}

export const setErrorDefaultViolations = (message) => ({
    type: 'ERROR_DEFAULT_VIOLATIONS',
    payload: message,
});

// hunting farms

export const getDefaultHuntingFarm = (farm, type) => ({
    type: type || 'GET_DEFAULT_HUNTING_FARM',
    payload: farm
});

export const setErrorDefaultHuntingFarm = (message) => ({
    type: 'ERROR_DEFAULT_HUNTING_FARM',
    payload: message,
});

// hunting farm location
export const getDefaultHuntingFarmLocation = (location, type) => ({
    type: type || 'GET_DEFAULT_HUNTING_FARM_LOCATION',
    payload: location,
});

export const setErrorDefaultHuntingFarmLocation = (message) => ({
    type: 'ERROR_DEFAULT_HUNTING_FARM_LOCATION',
    payload: message,
});

// reset

export const resetLoadingStage = () => ({
    type: 'RESET_LOADING',
});