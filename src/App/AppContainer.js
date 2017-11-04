import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { newGame } from '../redux/actions/app';

import App from './App';

export default connect((state) => ({}),
    (dispatch) => ({
        actions: bindActionCreators(Object.assign({}, { newGame }), dispatch)
    })
)(App);