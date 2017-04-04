import React from 'react';

/**
 * Component for displaying error modal dialog.
 *
 * @param props - default React param
 * @returns React Component
 */
const Error = props => (
    <div id="error">
        <div className="modal-backdrop in" />
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-hidden="true" onClick={props.onCloseFunc}>&times;</button>
                        <h4 className="modal-title">{props.title}</h4>
                    </div>
                    <div className="modal-body">
                        <p>{props.text}</p>
                        <pre>
                            {props.serverResponse}
                        </pre>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={props.onCloseFunc}>{props.closeButtonText}</button>
                        {props.reloadButtonEnabled && <button type="button" className="btn btn-primary" onClick={props.onReloadFunc}>{props.reloadButtonText}</button>}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

Error.propTypes = {
    // Data to display in modal window
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    serverResponse: React.PropTypes.string.isRequired,
    reloadButtonEnabled: React.PropTypes.bool.isRequired,

    // Handle functions for buttons
    onCloseFunc: React.PropTypes.func.isRequired,
    onReloadFunc: React.PropTypes.func.isRequired,

    closeButtonText: React.PropTypes.string.isRequired,
    reloadButtonText: React.PropTypes.string.isRequired
};

export default Error;
