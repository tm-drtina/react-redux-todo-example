import React, { PropTypes } from 'react';

let titleInput;
let textInput;

/**
 * Component that will be shown, when Router can't match any other route.
 *
 * @returns React Component
 */
const TodoList = ({ todos, addTodo, hasError, formError }) => (
    <div>
        <div className="row">
            <div className="col-lg-12">
                <div className="page-header">
                    <h1>Todo list:</h1>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="form-horizontal col-md-8">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!textInput.value.trim()) {
                            formError();
                        } else {
                            addTodo(titleInput.value.trim(), textInput.value.trim());
                            titleInput.value = textInput.value = '';
                        }
                    }}
                >
                    <fieldset className="well">
                        <div className="form-group">
                            <label htmlFor="title" className="col-md-3 control-label">
                                Title: (optional)
                            </label>
                            <div className="col-md-9">
                                <input
                                    id="title"
                                    type="text"
                                    ref={(input) => { titleInput = input; }}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className={`form-group${hasError ? ' has-error' : ''}`}>
                            <label htmlFor="text" className="col-md-3 control-label">
                                Text:
                            </label>
                            <div className="col-md-9">
                                <input
                                    id="text"
                                    type="text"
                                    ref={(input) => { textInput = input; }}
                                    className="form-control"
                                />
                                {hasError && <span className="help-block">Text cannot be empty.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-3 col-md-9">
                                <button type="submit" className="btn btn-primary col-md-3">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                {todos.length === 0 ?
                    <div className="panel panel-default">
                        <div className="panel-body">
                            No todos yet.
                        </div>
                    </div>
                    :
                    todos.map((todo, index) =>
                        <div className="panel panel-default" key={index}>
                            {todo.title &&
                                <div className="panel-heading">
                                    {todo.title}
                                </div>
                            }
                            <div className="panel-body">
                                {todo.text}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string.isRequired
    })).isRequired,
    addTodo: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    formError: PropTypes.func.isRequired
};

export default TodoList;
