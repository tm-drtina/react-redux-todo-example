import React from 'react';
import { connect } from 'react-redux';

import NoMatch from '../views/no-match';

const NoMatchContainer = props => (
    <NoMatch {...props} />
);

export default connect()(NoMatchContainer);
export const undecorated = NoMatchContainer;
