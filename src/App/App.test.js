import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureStore from '../redux/configureStore';
import AppContainer from './AppContainer';

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, div);
});

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}><AppContainer /></Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
