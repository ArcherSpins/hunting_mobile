
// hunting actions

export const getHuntings = (data) => {
    return {
        type: 'GET_HUNTINGS',
        payload: data,
    };
};

export const notLoadHunting = () => {
    return {
        type: 'NOT_LOAD_HUNTING',
    };
};

export const setDealHuntingDataAction = (data) => {
    return {
        type: 'SET_DETAIL_HUNTING_DATA',
        payload: data,
    };
};

export const setHuntingCoordinat = (coordinats) => {

    return {
        type: 'SET_HUNTING_COORDINAT',
        payload: coordinats,
    }
};

// animal actions

export const getAnimalsAction = (animals) => {
    return {
        type: 'GET_ANIMALS',
        payload: animals,
    };
};

export const setActiveAnimal = (animal) => {
    return {
        type: 'SET_ACTIVE_ANIMAL',
        payload: animal,
    };
};

export const notMapLoading = () => {
    return {
        type: 'NOT_MAP_LOADING',
    };
};

export const loadingAnimalsStop = () => {
    return {
        type: 'LOADING_STOP_ANIMALS'
    };
};

export const stopActiveAnimalLoading = () => ({
    type: 'NOT_ACTIVE_ANIMAL_LOADING',
});

// user actions

export const authUserAction = (obj) => {
    return {
        type: 'AUTH_USER',
        payload: obj,
    };
};

export const stopLoadingFormAction = () => ({
    type: 'LOADING_FORM',
});

export const getLocationUser = () => ({
    type: 'GET_LOCATION'
});

export const setLocationUser = (location) => ({
    type: 'SET_LOCATION',
    payload: location,
});

// permission actions

export const getPermissionAction = (permissions) => ({
    type: 'GET_PERMISSION',
    payload: permissions.map(item => ({...item, path: 'PERMISSION_DETAIL'})),
});


// violations actions

export const getViolationsAction = (violations) => ({
    type: 'GET_VIOLATIONS',
    payload: violations,
});

// permission detail action

export const setPermissionDetailAnimals = (animals) => ({
    type: 'SET_PERMISSION_DETAIL_ANIMALS',
    payload: animals,
});

export * from './connected';
export * from './default_data_actions';


export const fetchPermission = () => ({
    type: 'FETCH_PERMISSION'
})