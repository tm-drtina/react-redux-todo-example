import * as types from './action-types';

export function addTodo(title, text) {
    return {
        type: types.TODOS_ADD,
        title,
        text
    };
}

export function loadTodos(todos) {
    return {
        type: types.TODOS_LOAD,
        todos
    };
}

export function formError(hasError = true) {
    return {
        type: types.TODOS_FORM_ERROR,
        hasError
    };
}
