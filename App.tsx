/**
 * Created by Ka Yan Candy Chan 
 * Feb 7th, 2023 
 * 
 *  */ 

import React from 'react';
import { View, StyleSheet } from 'react-native';
import TicTacToe from './components/TicTacToe';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <TicTacToe />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;