import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { closeErrorDialog, refreshComponents } from '../../actions/general-actions';

import NoMatchContainer from './no-match-container';
import TodoContainer from './todo-container';
import TodoServerContainer from './todo-server-container';

import Loading from '../views/loading';
import Error from '../views/error';

class MainContainer extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                {this.props.loadingCounter > 0 && <Loading />}
                {this.props.showErrorDialog &&
                    <Error
                        title="Error while processing your request"
                        text="An error occurred while processing your request. Server output below:"
                        serverResponse={this.props.errorMsg}
                        closeButtonText="Close"
                        onCloseFunc={() => this.props.closeErrorDialog()}
                        reloadButtonEnabled={this.props.reloadButtonEnabled}
                        reloadButtonText="Reload"
                        onReloadFunc={() => {
                            this.props.refreshComponents();
                            this.props.closeErrorDialog();
                        }}
                    />
                }
                <Switch>
                    <Route path="/todos" component={TodoContainer} />
                    <Route path="/todos-server" component={TodoServerContainer} />
                    <Route component={NoMatchContainer} />
                </Switch>
            </div>
        );
    }
}

MainContainer.propTypes = {
    errorCode: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired,
    reloadButtonEnabled: PropTypes.bool.isRequired,

    // Num of components, that are loading data
    loadingCounter: PropTypes.number.isRequired,
    showErrorDialog: PropTypes.bool.isRequired,

    refreshComponents: PropTypes.func.isRequired,
    closeErrorDialog: PropTypes.func.isRequired,

    // React defined prop containing child element
    children: PropTypes.element
};

const mapStateToProps = state => ({
    loadingCounter: state.general.loadingCounter,
    showErrorDialog: state.general.showErrorDialog,
    errorCode: state.general.errorCode,
    errorMsg: state.general.errorMsg,
    reloadButtonEnabled: state.general.reloadButtonEnabled
});

const mapDispatchToProps = dispatch => ({
    refreshComponents: () => dispatch(refreshComponents),
    closeErrorDialog: () => dispatch(closeErrorDialog)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
export const undecorated = MainContainer;
