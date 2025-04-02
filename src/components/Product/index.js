import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Images from '../../assets/Images';

const Product = ({item}) => {
  return (
    <View style={styles.card}>
      <Image source={Images.BLOCK} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{'sản phẩm'}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>$100</Text>
          <Text style={styles.originalPrice}>$97</Text>
          <Text style={styles.discount}>
            (\${item?.originalPrice - item?.currentPrice} Off)
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity>
            <Text style={styles.icon}>♡</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    flex: 1,
    maxWidth: '48%', // Chia đôi màn hình với khoảng cách nhỏ
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  infoContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginHorizontal: 8,
  },
  discount: {
    fontSize: 14,
    color: 'red',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  icon: {
    fontSize: 20,
  },
});

export default Product;
