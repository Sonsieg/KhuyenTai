import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ImageCarousel from '../../components/ImageCarousel';
import Product from '../../components/Product';
import CameraScreen from '../CameraScreen';

const categories = ['Đồ trang sức', 'Đồ bạc', 'May mắn', 'Bông tai', 'Khuyên'];
const items = [
  {id: 1, name: 'Nhẫn bạc', category: 'Đồ bạc'},
  {id: 2, name: 'Vòng tay vàng', category: 'Đồ trang sức'},
  {id: 3, name: 'Mặt dây chuyền may mắn', category: 'May mắn'},
  {id: 4, name: 'Khuyên tai vàng', category: 'Bông tai'},
  {id: 5, name: 'Khuyên bạc', category: 'Khuyên'},
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContent}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            selectedCategory === category && styles.tabSelected,
          ]}
          onPress={() =>
            setSelectedCategory(category === selectedCategory ? null : category)
          }>
          <Text
            style={[
              styles.tabText,
              selectedCategory === category && styles.tabTextSelected,
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ImageCarousel />
          <View style={styles.container}>{renderCategoryTabs()}</View>
          <CameraScreen />
        </>
      }
      data={filteredItems}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <Product item={item} />}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={<View style={{height: 30}} />} // Add space at the bottom
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  tabContent: {
    flexDirection: 'row',
    paddingRight: 10, // Avoid cutting off content
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F6F1ED',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#30453C',
    marginRight: 10,
  },
  tabSelected: {
    backgroundColor: '#30453C',
  },
  tabText: {
    color: '#30453C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tabTextSelected: {
    color: '#F6F1ED',
  },
  listContainer: {
    paddingBottom: 200,
  },
});
