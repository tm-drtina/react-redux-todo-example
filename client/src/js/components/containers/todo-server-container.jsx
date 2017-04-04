import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchData, dataLoadFailedCallback } from '../../utils';
import { formError, loadTodos } from '../../actions/todo-actions';
import { startLoading, finishLoading, showError } from '../../actions/general-actions';
import TodoList from '../views/todo-list';

class TodoServerContainer extends Component {

    componentDidMount() {
        this.loadTodos();
    }

    addTodo(title, text) {
        this.props.startLoading();
        fetchData('POST', 'http://localhost:3000/todo/add', {
            title, text
        })
            .then(data => this.props.loadTodos(data))
            .catch(error => dataLoadFailedCallback(
                (errCode, errMsg) => this.props.showError(errCode, errMsg)
            )(error))
            .then(() => this.props.finishLoading());
    }

    loadTodos() {
        this.props.startLoading();
        fetchData('GET', 'http://localhost:3000/todo/list')
            .then(data => this.props.loadTodos(data))
            .catch(error => dataLoadFailedCallback(
                (errCode, errMsg) => this.props.showError(errCode, errMsg)
            )(error))
            .then(() => this.props.finishLoading());
    }

    render() {
        return (
            <TodoList
                {...this.props}
                addTodo={(title, text) => {
                    this.addTodo(title, text);
                    this.props.formError(false);
                }}
            />
        );
    }
}

TodoServerContainer.propTypes = {
    formError: PropTypes.func.isRequired,
    loadTodos: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    finishLoading: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    todos: state.todos.todos,
    hasError: state.todos.hasError
});

const mapDispatchToProps = dispatch => ({
    formError: hasError => dispatch(formError(hasError)),
    loadTodos: todos => dispatch(loadTodos(todos)),
    startLoading: () => dispatch(startLoading()),
    finishLoading: () => dispatch(finishLoading()),
    showError: (...args) => dispatch(showError(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoServerContainer);
export const undecorated = TodoServerContainer;
