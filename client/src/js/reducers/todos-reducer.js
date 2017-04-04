import * as types from '../actions/action-types';

const initialState = {
    todos: [],
    hasError: false
};

const generalReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.TODOS_ADD:
            return Object.assign({}, state, {
                todos: [...state.todos, {
                    title: action.title,
                    text: action.text
                }],
                hasError: false
            });
        case types.TODOS_LOAD:
            return Object.assign({}, state, {
                todos: action.todos
            });
        case types.TODOS_FORM_ERROR:
            return Object.assign({}, state, {
                hasError: action.hasError
            });
        default:
            return state;
    }
};

export default generalReducer;
