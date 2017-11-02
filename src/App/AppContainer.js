import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from './App';

export default connect((state) => ({}),
    (dispatch) => ({
        actions: bindActionCreators(Object.assign({}, {}), dispatch)
    })
)(App);
