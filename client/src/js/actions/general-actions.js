import * as types from './action-types';

export function closeErrorDialog() {
    return {
        type: types.GENERAL_CLOSE_ERROR_DIALOG
    };
}

export function refreshComponents() {
    return {
        type: types.GENERAL_REFRESH
    };
}

export function startLoading() {
    return {
        type: types.GENERAL_START_LOADING
    };
}

export function finishLoading() {
    return {
        type: types.GENERAL_FINISH_LOADING
    };
}

export function showError(errorCode, errorMsg, reloadButtonEnabled = true) {
    return {
        type: types.GENERAL_SHOW_ERROR,
        errorCode,
        errorMsg,
        reloadButtonEnabled
    };
}
