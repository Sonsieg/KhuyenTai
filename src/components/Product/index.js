import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const Product = ({item}) => {
  return (
    <View style={styles.sidebarItem}>
      <View style={styles.sidebarItemHeader}>
        <Text style={styles.sidebarItemTitle}>Products Management</Text>
      </View>
      <Text style={styles.sidebarItemSubtitle}>{item?.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  sidebarItem: {
    backgroundColor: '#fbd0c8', // Light salmon color
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e07a5f',
  },
  sidebarItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sidebarItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    color: '#e07a5f',
  },
  sidebarItemSubtitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 26,
  },
});

export default Product;
