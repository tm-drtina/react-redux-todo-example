import * as types from '../actions/action-types';

const initialState = {
    errorCode: '',
    errorMsg: '',
    showErrorDialog: false,
    reloadButtonEnabled: true,
    loadingCounter: 0,
    refreshed: 0
};

const generalReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.GENERAL_CLOSE_ERROR_DIALOG:
            return Object.assign({}, state, {
                showErrorDialog: false
            });
        case types.GENERAL_REFRESH:
            return Object.assign({}, state, {
                refreshed: state.refreshed + 1
            });
        case types.GENERAL_START_LOADING:
            return Object.assign({}, state, {
                loadingCounter: state.loadingCounter + 1
            });
        case types.GENERAL_FINISH_LOADING:
            return Object.assign({}, state, {
                loadingCounter: state.loadingCounter - 1
            });
        case types.GENERAL_SHOW_ERROR:
            return Object.assign({}, state, {
                errorCode: action.errorCode,
                errorMsg: action.errorMsg,
                reloadButtonEnabled: action.reloadButtonEnabled,
                showErrorDialog: true
            });
        default:
            return state;
    }
};

export default generalReducer;
