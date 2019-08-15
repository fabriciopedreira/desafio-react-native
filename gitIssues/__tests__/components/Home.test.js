import 'react-native';
import React from 'react';

import Home from '../../src/screens/Home';

import { render, fireEvent } from '@testing-library/react-native';

describe('Home', () => {
  it('should be able to add new tech', () => {
    const { } = render(<Home />);
  });
});
