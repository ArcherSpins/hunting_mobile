import { combineReducers } from 'redux';
import huntingReducer from './hunting';
import animalReducer from './animal';
import userReducer from './user';
import permissionReducer from './permissionForRotation';
import violationReducer from './violation';
import connectReducer from './connected';
import permissionDetailReducer from './permission_detail';
import defaultDataReducer from './default_data';

export default combineReducers({
    hunting: huntingReducer,
    animal: animalReducer,
    user: userReducer,
    permission: permissionReducer,
    violation: violationReducer,
    connect: connectReducer,
    permissionDetail: permissionDetailReducer,
    defaultData: defaultDataReducer,
});