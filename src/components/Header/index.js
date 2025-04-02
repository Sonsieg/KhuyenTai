import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Bling Vision</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.GREEN,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.WHITE,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif', // Hoặc có thể dùng font Google Fonts nếu tích hợp
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
