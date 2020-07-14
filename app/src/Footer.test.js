import React from 'react';
import ReactDOM from 'react-dom';
import './lib/Bulma';
import Footer from './Footer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
