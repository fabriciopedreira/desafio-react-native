/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import './config/ReactotronConfig';
import Routes from './routes';

Icon.loadFont();

const App = () => {
  return (
    <Routes />
  );
};

export default App;
