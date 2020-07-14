import React from 'react';
import ReactDOM from 'react-dom';
import './lib/Bulma';
import Me from './Me';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Me />, div);
  ReactDOM.unmountComponentAtNode(div);
});
