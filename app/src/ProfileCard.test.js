import React from 'react';
import ReactDOM from 'react-dom';
import './lib/Bulma';
import ProfileCard from './ProfileCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
