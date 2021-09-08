import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  unmountComponentAtNode(div);
});
