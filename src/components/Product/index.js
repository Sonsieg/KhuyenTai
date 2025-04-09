import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Product = ({item}) => {
  return (
    <View style={styles.sidebarItem}>
      <View style={styles.imageContainer}>
        <Image source={item?.image} style={styles.productImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.sidebarItemHeader}>
          <Text style={styles.sidebarItemTitle}>Products Management</Text>
        </View>
        <Text style={styles.sidebarItemSubtitle}>{item?.name}</Text>
      </View>
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
    flexDirection: 'row', // Add this to arrange items horizontally
    alignItems: 'center', // Center items vertically
  },
  imageContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
  },
  sidebarItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sidebarItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e07a5f',
  },
  sidebarItemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});

export default Product;
