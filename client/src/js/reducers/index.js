import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Reducers
import general from './general-reducer';
import todos from './todos-reducer';

// Combine Reducers
const reducers = combineReducers({
    general,
    todos,
    routing
});

export default reducers;
