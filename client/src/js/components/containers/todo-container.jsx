import React from 'react';
import { connect } from 'react-redux';

import { addTodo, formError } from '../../actions/todo-actions';
import TodoList from '../views/todo-list';

const TodoContainer = props => (
    <TodoList {...props} />
);

const mapStateToProps = state => ({
    todos: state.todos.todos,
    hasError: state.todos.hasError
});

const mapDispatchToProps = dispatch => ({
    addTodo: (title, text) => dispatch(addTodo(title, text)),
    formError: () => dispatch(formError())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
export const undecorated = TodoContainer;
